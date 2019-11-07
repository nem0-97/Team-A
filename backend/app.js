const hidden=require("./hidden.js");
/* Database */
const MongoDB=require("./MongoDB")//import database helpers

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
passport.use(new locStrat({usernameField:'email',passReqToCallback:true},
function(req,user,pass,done){
    let cust = MongoDB.fullFindOne(req.body.loginType,{"accountinfo.email":user}).then(cust=>{
    if(!cust){
        // username not found in database
        return done(null, false, { message: 'Incorrect username.' });
    }
    if(!log.passIsHash(pass,cust.accountinfo.password)){
        // password does not match
        return done(null, false, { message: 'Incorrect password.' });
    }
    cust['collection'] = req.body.loginType;
    return done(null, cust);
    });
}));

// authenticated user must be serialized to the session
passport.serializeUser(function(user, done){
    done(null,{'collection':user.collection,'id':user._id});
});

// user must be deserialized when subsequent requests are made
passport.deserializeUser(function(user, done){ 
    MongoDB.findOne(user.collection,{_id:new MongoDB.ObjId(user.id)}).then(cust=>{
        done(null,cust);
    });
});
const cookies = require('cookie-parser');
app.use(cors());
app.use(express.json());
app.use(express.urlencoded());
app.use(expressSession({ secret: hidden.login.sessionSecret, resave: false, saveUninitialized: false, maxAge:1800000 }));//so passport sessions work (eexpires after 30 minutes)
app.use(cookies()); // TODO: Set a login cookie

// configure passport for use with an express-based app
app.use(passport.initialize());
// configure passport to support persistent login sessions
app.use(passport.session());

/** Account Routes*/
app.post('/register', function (req, res) { 
    let user = req.body;
    user.accountinfo.password = log.hashPass(user.accountinfo.password);
    MongoDB.add('Customers',user);
    res.send({"message":'New user '+user.email+' was added.'});
});

app.post('/login',passport.authenticate('local', { failureRedirect: 'http://localhost:3001/login/?failed=true' }), //FIXME: Why not use successRedirect: '/' here?
function(req, res) {
    console.log('login');
    console.log(req.user);
    res.cookie('userInfo', req.user.collection, { maxAge: 1800000, httpOnly: false });
    res.redirect('http://localhost:3001/');
});

app.get('/logout', function (req, res) {
    req.logout();
    res.redirect('http://localhost:3001');
});
/** End Account Routes*/

/** API ROUTES*/

/**RESTAURAUNT*/
//GET
app.get('/api/v1/rest', function (req, res) { //get a restaurant by name?
    console.log(req.user);
    MongoDB.find('Restaurants',req.query).then(rests=>res.send({"results":rests}));//send back query results
});

/** GET restaurant info by querying a name */
app.get('/api/v1/rest/:restName', function (req, res) {
    let restName = req.params.restName;
    console.log(restName);
    MongoDB.find('Restaurants',(
        {
            "restinfo.restName": {$regex:restName,$options:'i'}
        }
    )).then(rests => {console.log(rests.length);res.send({ "results": rests })});
});

//POST
app.post('/api/v1/rest', function (req, res) { //Add a new restaurant into database
    req.body.accountinfo.password = log.hashPass(req.body.accountinfo.password);
    MongoDB.add('Restaurants',req.body); //First parm is which namespace to use
    res.send({"message":'POST request to the homepage, restaurant ' + req.body.name+' added to database'});
})

//PUT TODO test
app.put('/api/v1/rest', function (req, res) { //Update given property of a restaurant with given value
    if(MongoDB.update('Restaurant',req.body.query,req.body.newVals))
        res.send({"message":'A restaurant updated'});
    else res.send({"message":'Error'});
})

//DELETE TODO test
app.delete('/api/v1/rest', function (req, res) { //remove a restaurant from database by name
    if(MongoDB.delete('Restaurant',req.body.query))
        res.send({"message":'A restaurant deleted'});
    else res.send({"message":'Error'});
})

/** Customer endpoints */
//POST
app.post('/api/v1/cust', function (req, res) { //Add a new customer into database
    req.body.accountinfo.password = log.hashPass(req.body.accountinfo.password);
    MongoDB.add('Customers',req.body); //First parm is which namespace to use
    res.send({"message":'POST request to the homepage, customer ' + req.body.accountinfo.firstName+' added to database'});
})

//PUT
app.put('/api/v1/cust', function (req, res) { //Update given property of a customer with given value
    res.send({"message":'PUT request to the homepage, customer fields updatd'});
})

//DELETE
app.delete('/api/v1/cust', function (req, res) { //remove a customer from database by name
    res.send({"message":'DELETE request to the homepage'});
})

/**ORDERS*/
//GET
app.get('/api/v1/order', function (req, res) { //get a restaurant by name?
    if(req.user) MongoDB.find('Orders',req.query).then(rests=>res.send({"results":rests}));//send back query results
    else res.send({"mess":"You need to be logged in to view orders."});

});

/** ENDPOINT FOR SPOT */
//POST
app.post('/api/v1/spot', function(req,res){
    console.log("ENDPOINT FOR SPOT POST");
    MongoDB.add('Spots',req.body); //First parm is which collection to use
});

//GET
app.get('/api/v1/spot', function(req,res){
    console.log("ENDPOINT FOR SPOT GET");
});
app.delete('api/v1/spot',function(req,res){
    console.log("ENDPOINT FOR SPOT DELETE");
})



https.createServer({
    key: fs.readFileSync('server.key'),
    cert: fs.readFileSync('server.cert')
}, app).listen(port, () => console.log(`Example app listening on port ${port}!`));