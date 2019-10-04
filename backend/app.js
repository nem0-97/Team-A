/* Database */
const MongoDB=require("./MongoDB")//import database helpers

/**Login */
const log = require("./login");
const passport = require('passport');
const locStrat = require('passport-local').Strategy;

passport.use(new locStrat({usernameField:'email'},
function(user,pass,done){
    console.log('hi');
    let cust = MongoDB.find('Customers',{email:user});
    if(!cust){
        console.log('bad username');
        return done(null, false, { message: 'Incorrect username.' });
    }
    if(!log.passIsHash(pass,cust.password)){
        console.log('bad pass');
        return done(null, false, { message: 'Incorrect password.' });
    }
    console.log('auth good');
    return done(null, cust);
}));

/** Express Setup Begin*/
const https = require('https')
const fs = require('fs')
const express = require('express')
const cors = require('cors')
const app = express()
const port = 3000

app.use(passport.initialize());
app.use(passport.session());

app.use(cors());
app.use(express.json());

/** Express Setup End*/

/** Account Routes*/
app.post('/register', function (req, res) { 
    //TODO test, have one of these for customer and rest call log.hashPass(password) before adding to database
});

app.post('/login',
function(req, res) {
    //req.logIn();
    //console.log(req.user);
  res.redirect('/api/v1/rest');
});

app.post('/logout', function (req, res) { //TODO test
    req.logout();
    res.direct();
});
/** End Account Routes*/

/** API ROUTES*/

/**RESTAURAUNT*/
//GET
app.get('/api/v1/rest', function (req, res) { //get a restaurant by name?
    console.log(req.query); //query parameters
    MongoDB.find('Restaurants',req.query).then(rests=>res.send({"results":rests}));//send back query results
});

/** GET restaurant info by quering a name */
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
    console.log(req);
    console.log("/rest got post req");
    console.log(req.body); //add body to database, maybee have some extra logic here to build db formatted json with info sent over
    MongoDB.add('Restaurants',req.body); //First parm is which namespace to use
    res.send({"message":'POST request to the homepage, restaurant ' + req.body.name+' added to database'});
})

//PUT
app.put('/api/v1/rest', function (req, res) { //Update given property of a restaurant with given value
    console.log(req);
    console.log("/rest got put req");
    console.log(req.body); // retreive rest name, fields to update and new values theen update in DB
    res.send({"message":'PUT request to the homepage, restaurant fields updatd'});
})

//DELETE
app.delete('/api/v1/rest', function (req, res) { //remove a restaurant from database by name
    console.log(req);
    console.log("/rest got delete req");
    console.log(req.body); //remove restaurant from database
    res.send({"message":'DELETE request to the homepage'});
})


/**CUSTOMER*/
//GET

app.get('/api/v1/cust', function (req, res) { //get a customer by name?
    console.log(req.query); //query parameters
    if (Object.keys(req.query).length==0){//return all customer
        console.log("All customers will be queried");
    }else{
        //cycle through req.query 
    }
    console.log("/cust got get req"); //query database for customer with matching name (req.params.name)
    res.send({"message":'GET request to the homepage'}); //send list of results
})

app.get('/api/v1/cust', function (req, res) {
    res.send({"message":'GET request to the homepage, cust'});
})
  
//POST
app.post('/api/v1/cust', function (req, res) {

})

//PUT
app.put('/api/v1/cust', function (req, res) {
 
})

//DELETE
app.delete('/api/v1/cust', function (req, res) {


})


/**ORDER API ROUTES*/
//GET

app.get('/api/v1/order', function (req, res) { //get a order by name?
    console.log(req.query); //query parameters
    if (Object.keys(req.query).length==0){//return all order
        console.log("All rstaurants will be queried");
    }else{
        //cycle through req.query 
    }
    console.log("/rest got get req"); //query database for order with matching name (req.params.name)
    res.send({"message":'GET request to the homepage'}); //send list of results
})

https.createServer({
    key: fs.readFileSync('server.key'),
    cert: fs.readFileSync('server.cert')
}, app).listen(port, () => console.log(`Example app listening on port ${port}!`));