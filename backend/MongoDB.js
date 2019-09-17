const MongoClient = require('mongodb').MongoClient;
const hidden=require("./hidden.js"); //hidden file containing passwords/authentication info for MongoDB(won't be pushed to github)
const client = new MongoClient(hidden.mongo.uri, { useNewUrlParser: true ,useUnifiedTopology: true });

/**
 * Add the provided element to the proper collection in our database
 * @param coll collection to add el to
 * @param el new item to add to the collection
 * */
exports.add = function (coll,el){
    client.connect(err => {
        const collection = client.db("FoodWaste").collection(coll);
        collection.insertOne(el);
        client.close();
    });
};

/**
 * Submit the query to the proper collection in our database
 * @param coll collection to search through
 * @param query new restaurant to add to collection in JSON format 
 * */
exports.find = async function (coll,query){
    await client.connect();
    const collection = client.db("FoodWaste").collection(coll);
    const results = await collection.find(query).toArray();
    client.close();
    return results;
}; // TODO: Figure out awaits 