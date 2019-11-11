const hidden = require("./hidden.js");
/* Database */
const MongoDB = require("./MongoDB")//import database helpers

/* Express import*/
const express = require('express')
const app = express()
const https = require('https')
const fs = require('fs')
const cors = require('cors')
const expressSession = require('express-session');
const port = 3000

/**Import passport and login helpers */
const log = require("./login");
const passport = require('passport');
const locStrat = require('passport-local').Strategy;

//Passport setup
passport.use(new locStrat({ usernameField: 'email', passReqToCallback: true },
    function (req, user, pass, done) {
        let cust = MongoDB.fullFindOne(req.body.loginType, { "accountinfo.email": user }).then(cust => {
            if (!cust) {
                // username not found in database
                return done(null, false, { message: 'Incorrect username.' });
            }
            if (!log.passIsHash(pass, cust.accountinfo.password)) {
                // password does not match
                return done(null, false, { message: 'Incorrect password.' });
            }
            cust['collection'] = req.body.loginType;
            return done(null, cust);
        });
    }));

// authenticated user must be serialized to the session
passport.serializeUser(function (user, done) {
    done(null, { 'collection': user.collection, 'id': user._id });
});

// user must be deserialized when subsequent requests are made
passport.deserializeUser(function(user, done){ 
    MongoDB.findOne(user.collection,{_id:new MongoDB.ObjId(user.id)}).then(cust=>{
        cust.collection = user.collection;
        done(null,cust);
    });
});
const cookies = require('cookie-parser');
app.use(cors({ origin: 'http://localhost:3001', credentials:true}));
app.use(express.json());
app.use(express.urlencoded());
app.use(expressSession({ secret: hidden.login.sessionSecret, resave: false, saveUninitialized: false, maxAge:1800000 }));//so passport sessions work (eexpires after 30 minutes)
app.use(cookies());

// configure passport for use with an express-based app
app.use(passport.initialize());
// configure passport to support persistent login sessions
app.use(passport.session());

/** Account Routes*/
app.post('/register', function (req, res) { //TODO use this for restaurants and users
    let user = req.body;
    user.accountinfo.password = log.hashPass(user.accountinfo.password);
    MongoDB.add('Customers', user);
    res.send({ "message": 'New user ' + user.email + ' was added.' });
});

app.post('/login',passport.authenticate('local', { failureRedirect: 'http://localhost:3001/login/?failed=true' }), //FIXME: Why not use successRedirect: '/' here?
function(req, res) {
    res.cookie('userInfo',JSON.stringify({"collection": req.user.collection, "ID": req.user._id}), { maxAge: 1800000, httpOnly: false });
    if(req.user.collection=='Restaurants') res.redirect('http://localhost:3001/RestaurantView?id='+req.user._id);
    else res.redirect('http://localhost:3001/');
});

app.get('/logout', function (req, res) {
    req.logout();
    res.clearCookie('userInfo');
    res.redirect('http://localhost:3001');
});
/** End Account Routes*/

/** API ROUTES*/

/**RESTAURAUNT*/
//GET
app.get('/api/v1/rest', function (req, res) { //get a restaurant by name?
    if (req.query._id) req.query._id = new MongoDB.ObjId(req.query._id)
    for(let q in req.query){
        if(q!='_id'){
            req.query['restinfo.'+q] = { $regex: req.query[q], $options: 'i' };
            delete req.query[q];
        }
    }
    MongoDB.find('Restaurants',req.query).then(rests=>res.send({"results":rests}));//send back query results
});

//POST
app.post('/api/v1/rest', function (req, res) { //Add a new restaurant into database
    req.body.accountinfo.password = log.hashPass(req.body.accountinfo.password);
    MongoDB.add('Restaurants', req.body); //First parm is which namespace to use
    res.send({ "message": 'POST request to the homepage, restaurant ' + req.body.name + ' added to database' });
})

//PUT TODO test
app.put('/api/v1/rest', function (req, res) { //Update given property of a restaurant with given value
    if (MongoDB.update('Restaurants', req.body.query, req.body.newVals))
        res.send({ "message": 'A restaurant updated' });
    else res.send({ "message": 'Error' });
})

//DELETE TODO test
app.delete('/api/v1/rest', function (req, res) { //remove a restaurant from database by name
    if (MongoDB.delete('Restaurants', req.body.query))
        res.send({ "message": 'A restaurant deleted' });
    else res.send({ "message": 'Error' });
})

/** Customer endpoints */
//POST
app.post('/api/v1/cust', function (req, res) { //Add a new customer into database
    req.body.accountinfo.password = log.hashPass(req.body.accountinfo.password);
    req.body.name = req.body.accountinfo.firstName +req.body.accountinfo.lastName ;
    MongoDB.add('Customers', req.body); //First parm is which namespace to use
    res.send({ "message": 'POST request to the homepage, customer ' + req.body.accountinfo.firstName + ' added to database' });
})

//PUT
app.put('/api/v1/cust', function (req, res) { //Update given property of a customer with given value
    res.send({ "message": 'PUT request to the homepage, customer fields updatd' });
})

//DELETE
app.delete('/api/v1/cust', function (req, res) { //remove a customer from database by name
    res.send({ "message": 'DELETE request to the homepage' });
})

/**ORDERS*/
//GET
app.get('/api/v1/order', function (req, res) { //get a restaurant by name?
    if(req.user) MongoDB.find('Orders',req.query).then(rests=>res.send({"results":rests}));//send back query results
    else res.send({"mess":"You need to be logged in to view orders."});
});

//ORDER
app.post('/api/v1/order', function (req, res) {
    req.body.spotID = new MongoDB.ObjId(req.body.spotID);
    MongoDB.findOne('Spots',{_id:req.body.spotID}).then(
        spot =>{
            if(spot.taken >= spot.amount){
                res.send({"mess":"Spot is already full"});
            }else{
                MongoDB.update('Spots',{_id:req.body.spotID},{taken:spot.taken+1});//update Spot's taken value
                MongoDB.add('Orders', req.body);//create order
                res.status(200);
                res.redirect('http://localhost:3001');
            }
        }
    )
});

/** ENDPOINT FOR SPOT */
//GET
app.get('/api/v1/spot', function (req, res) {
    if (req.query.restID) req.query.restID = new MongoDB.ObjId(req.query.restID);
    if (req.query._id) req.query._id= new MongoDB.ObjId(req.query._id);
    MongoDB.find('Spots',req.query).then(rests=>res.send({"results":rests}));//send back query results
});

//POST
app.post('/api/v1/spot', function (req, res) {
    if(req.user && req.user.collection == "Restaurants"){
        req.body.restID = req.user._id;
        req.body.taken = 0;
        MongoDB.add('Spots', req.body);
        res.redirect('http://localhost:3001/RestaurantView');
    }else{
        res.send({"mess":"You need to be logged in as restaurant to add spots."});
    }
});

//DELETE
app.delete('/api/v1/spot', function (req, res) {
    req.body._id = new MongoDB.ObjId(req.body._id);
    MongoDB.findOne('Spots',req.body)
    .then(function(r){
        if(r.restID.equals(req.user._id)){
            MongoDB.delete('Spots',{_id:r._id});
        }else{
            res.send({"mess":"You need to be logged in as a restaurant to remove its spot."});
        }
    });
})
/** ENDPOINT FOR REVIEWS */
//GET
app.get('/api/v1/review', function (req, res) {
    if (req.query.restID) req.query.restID = new MongoDB.ObjId(req.query.restID);
    if (req.query.custID) req.query.custID = new MongoDB.ObjId(req.query.custID);
    if (req.query._id) req.query._id= new MongoDB.ObjId(req.query._id);
    MongoDB.find('Reviews',req.query).then(rests=>res.send({"results":rests}));//send back query results
});

//POST
app.post('/api/v1/review', function (req, res) {
    if(req.user && req.user.collection == "Customers"){
        req.body.custID = req.user._id;
        req.body.cust = req.user.name;
        if (req.body.restID) req.body.restID = new MongoDB.ObjId(req.query.restID);
        MongoDB.add('Reviews', req.body);
        res.redirect('http://localhost:3001/RestPage?ID='+req.body.restID);
    }else{
        res.send({"mess":"You need to be logged in as a customr to leave reviews."});
    }
});

https.createServer({
    key: fs.readFileSync('server.key'),
    cert: fs.readFileSync('server.cert')
}, app).listen(port, () => console.log(`Example app listening on port ${port}!`));