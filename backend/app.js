/* Database */
const MongoDB=require("./MongoDB")//import database helpers

/**Login */
const passport = require('passport')
const bcrypt = require('bcrypt')

/** Express Setup Begin*/
const https = require('https')
const fs = require('fs')
const express = require('express')
const cors = require('cors')
const app = express()
const port = 3000

app.use(cors())
app.use(express.json());

/** Express Setup End*/

app.post('/login', function (req, res) {
    
})

app.post('/logout', function (req, res) {

})
/** API ROUTES*/

/**RESTAURAUNT*/
//GET
app.get('/api/v1/rest', function (req, res) { //get a restaurant by name?
    console.log(req.query); //query parameters
    MongoDB.find('Restaurants',req.query).then(rests=>res.send({"results":rests}));//send back query results
})
  
//POST
app.post('/api/v1/rest', function (req, res) { //Add a new restaurant into database
    console.log(req);
    console.log("/rest got post req");
    console.log(req.body); //add body to database, maybee have some extra logic here to build db formatted json with info sent over
    MongoDB.add('Restaurants',req.body);
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
app.delete('/api/v1/rest', jsonParser, function (req, res) { //remove a restaurant from database by name
    console.log(req);
    console.log("/rest got delete req");
    console.log(req.body); //remove restaurant from database
    res.send({"message":'DELETE request to the homepage'});
})


/**CUSTOMER*/
//GET
app.get('/api/v1/cust', function (req, res) {

})
  
//POST
app.post('/api/v1/cust', jsonParser, function (req, res) {

})

//PUT
app.put('/api/v1/cust', jsonParser, function (req, res) {
 
})

//DELETE
app.delete('/api/v1/cust', jsonParser, function (req, res) {

})


/**ORDER API ROUTES*/
//GET
app.get('/api/v1/order', function (req, res) { 
    
})
  
//POST
app.post('/api/v1/order', jsonParser, function (req, res) { 
    
})

//PUT
app.put('/api/v1/order', jsonParser, function (req, res) { 

})

//DELETE
app.delete('/api/v1/order', jsonParser, function (req, res) { 
    
})







//start server
https.createServer({
    key: fs.readFileSync('server.key'),
    cert: fs.readFileSync('server.cert')
},app).listen(port, () => console.log(`Example app listening on port ${port}!`));