const MongoDB=require("./MongoDB")//import database helpers

/** Express Setup Begin*/
const express = require('express')
const cors = require('cors')
const app = express()
const port = 3000
const https = require('https')
const fs = require('fs')
app.use(cors())

const jsonParser= express.json();
/** Express Setup End*/

/**RESTAURAUNT INFO API ROUTES*/
//GET
app.get('/api/v1/rest', function (req, res) { //get a restaurant by name?
    console.log(req.query); //query parameters
    MongoDB.find('Restaurants',req.query).then(rests=>res.send({"results":rests}));//send back query results
});

app.get('/api/v1/rest/:restName', function (req, res) {
    let restName = req.params.restName;
    MongoDB.find('Restaurants',(
        {
            "restinfo.restName": restName
        }
    )).then(rests => res.send({ "results": rests }));
    
});

//POST
app.post('/api/v1/rest', jsonParser, function (req, res) { //Add a new restaurant into database
    console.log(req);
    console.log("/rest got post req");
    console.log(req.body); //add body to database, maybee have some extra logic here to build db formatted json with info sent over
    MongoDB.add('Restaurants',req.body); //First parm is which namespace to use
    res.send({"message":'POST request to the homepage, restaurant ' + req.body.name+' added to database'});
})

//PUT
app.put('/api/v1/rest', jsonParser, function (req, res) { //Update given property of a restaurant with given value
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


/**CUSTOMER INFO API ROUTES*/
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
  
//POST
app.post('/api/v1/cust', jsonParser, function (req, res) { //Add a new customre into database
    /*console.log(req);*/
    console.log("/cust got post req");
    console.log(req.body); //add body to database, maybee have some extra logic here to build db formatted json with info sent over
    MongoDB.add('Customers', req.body);
    res.send({"message":'POST request to the homepage, customer added to database'});
})

//PUT
app.put('/api/v1/cust', jsonParser, function (req, res) { //Update given property of a customer with given value
    console.log(req);
    console.log("/cust got put req");
    console.log(req.body); // retreive rest name, fields to update and new values theen update in DB
    res.send({"message":'PUT request to the homepage, customer fields updatd'});
})

//DELETE
app.delete('/api/v1/cust', jsonParser, function (req, res) { //remove a customer from database by name
    console.log(req);
    console.log("/cust got delete req");
    console.log(req.body); //remove customer from database
    res.send({"message":'DELETE request to the homepage'});
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
  
//POST
app.post('/api/v1/order', jsonParser, function (req, res) { //Add a new order into database
    console.log(req);
    console.log("/rest got post req");
    console.log(req.body); //add body to database, maybee have some extra logic here to build db formatted json with info sent over
    res.send({"message":'POST request to the homepage, order added to database'});
})

//PUT
app.put('/api/v1/order', jsonParser, function (req, res) { //Update given property of a order with given value
    console.log(req);
    console.log("/rest got put req");
    console.log(req.body); // retreive rest name, fields to update and new values theen update in DB
    res.send({"message":'PUT request to the homepage, restaurant fields updatd'});
})

//DELETE
app.delete('/api/v1/order', jsonParser, function (req, res) { //remove a order from database by name
    console.log(req);
    console.log("/rest got delete req");
    console.log(req.body); //remove order from database
    res.send({"message":'DELETE request to the homepage'});
})


https.createServer({
    key: fs.readFileSync('server.key'),
    cert: fs.readFileSync('server.cert')
}, app).listen(port, () => console.log(`Example app listening on port ${port}!`));