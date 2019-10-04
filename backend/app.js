//const mongo = require('mongodb');
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
passport.use(new locStrat({usernameField:'email'},
function(user,pass,done){
    let cust = MongoDB.findOne('Customers',{email:user}).then(cust=>{
    if(!cust){
        return done(null, false, { message: 'Incorrect username.' });
    }
    if(!log.passIsHash(pass,cust.password)){
        return done(null, false, { message: 'Incorrect password.' });
    }
    return done(null, cust);
    });
}));

passport.serializeUser(function(user, done){
    done(null,user._id);
});

passport.deserializeUser(function(user, done){
    MongoDB.find('Customers',{_id:new MongoDB.ObjId(user)}).then(cust=>{
        done(null,cust);
    });
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded());
app.use(expressSession({ secret: hidden.login.sessionSecret, resave: false, saveUninitialized: false }));//so passport sessions work
//require('connect-ensure-login').ensureLoggedIn() useful for routes ensure they are logged in? maybe or just check req.user?

app.use(passport.initialize());
app.use(passport.session());

/** Account Routes*/
app.post('/register', function (req, res) { 
    let user = req.body;
    user.password = log.hashPass(user.password);
    MongoDB.add('Customers',user);
    res.send({"message":'New user '+user.email+' was added.'});
});

app.get('/login',function(req, res) {
    res.send('<form action="/login" method="post"><div><label>Email:</label><input type="text" name="email"/>\
    </div><div><label>Password:</label><input type="password" name="password"/></div><div><input type="submit" value="Log In"/></div></form>');
});

app.post('/login',passport.authenticate('local', { failureRedirect: 'http://localhost:3001/Login/' }),
function(req, res) {
    //req.logIn();
    res.redirect('/api/v1/rest');
});

app.get('/logout', function (req, res) { //TODO test
    req.logout();
    res.redirect('/api/v1/rest');
});
/** End Account Routes*/

/** API ROUTES*/

/**RESTAURAUNT*/
//GET
app.get('/api/v1/rest', function (req, res) { //get a restaurant by name?
    console.log('Session est');console.log(req.user);// TODO include express-session
    MongoDB.find('Restaurants',req.query).then(rests=>res.send({"results":rests}));//send back query results
});

/** GET restaurant info by querying a name */
app.get('/api/v1/rest/:restName', function (req, res) {
    let restName = req.params.restName;
    MongoDB.find('Restaurants',(
        {
            "restinfo.restName": restName
        }
    )).then(rests => res.send({ "results": rests }));
    
});

//POST
app.post('/api/v1/rest', function (req, res) { //Add a new restaurant into database
    MongoDB.add('Restaurants',req.body); //First parm is which namespace to use
    req.body.password = log.hashPass(user.password);
    res.send({"message":'POST request to the homepage, restaurant ' + req.body.name+' added to database'});
})

//PUT
app.put('/api/v1/rest', function (req, res) { //Update given property of a restaurant with given value
    res.send({"message":'PUT request to the homepage, restaurant fields updatd'});
})

//DELETE
app.delete('/api/v1/rest', function (req, res) { //remove a restaurant from database by name
    res.send({"message":'DELETE request to the homepage'});
})

https.createServer({
    key: fs.readFileSync('server.key'),
    cert: fs.readFileSync('server.cert')
}, app).listen(port, () => console.log(`Example app listening on port ${port}!`));