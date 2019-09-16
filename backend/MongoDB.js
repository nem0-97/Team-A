const MongoClient = require('mongodb').MongoClient;
const hidden=require("./hidden.js"); //hidden file containing passwords/authentication info for MongoDB(won't be pushed to github)
const client = new MongoClient(hidden.mongo.uri, { useNewUrlParser: true });

/**
 * Add the provided restaurant to the proper collection in our database
 * @param rest new restaurant to add to collection in JSON format 
 * */
export function addRest(rest){
    client.connect(err => {
        const collection = client.db("FoodWaste").collection("Restaurants");
        // perform actions on the collection object
        client.close();
    });
}

/**
 * Add the provided restaurant to the proper collection in our database
 * @param keywords new restaurant to add to collection in JSON format 
 * */
export function getRest(keywords){
    client.connect(err => {
        const collection = client.db("FoodWaste").collection("Restaurants");
        // perform actions on the collection object
        client.close();
    });
}