const mongo = require('mongodb');
const MongoClient = mongo.MongoClient;
const hidden=require("./hidden.js"); //hidden file containing passwords/authentication info for MongoDB(won't be pushed to github)
const client = new MongoClient(hidden.mongo.uri, { useNewUrlParser: true ,useUnifiedTopology: true });

exports.ObjId = mongo.ObjectId;

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
 * @param query parameters to find items in the collection using 
 * */
exports.fullFind = async function (coll,query){
    await client.connect();
    const collection = client.db("FoodWaste").collection(coll);
    const results = await collection.find(query).toArray();
    client.close();
    return results;
};

/**
 * Submit the query to the proper collection in our database
 * @param coll collection to search through
 * @param query parameters to find an itme in the collection using
 * */
exports.fullFindOne = async function (coll,query){
    await client.connect();
    const collection = client.db("FoodWaste").collection(coll);
    const result = await collection.findOne(query);
    client.close();
    return result;
};

/**
 * Submit the query to the proper collection in our database
 * @param coll collection to search through
 * @param query parameters to find items in the collection using 
 * */
exports.find = async function (coll,query){
    await client.connect();
    const collection = client.db("FoodWaste").collection(coll);
    const results = await collection.find(query,{projection:{"accountinfo":0}}).toArray();
    client.close();
    return results;
};

/**
 * Submit the query to the proper collection in our database
 * @param coll collection to search through
 * @param query parameters to find an itme in the collection using
 * */
exports.findOne = async function (coll,query){
    await client.connect();
    const collection = client.db("FoodWaste").collection(coll);
    const result = await collection.findOne(query,{projection:{"accountinfo":0}});
    client.close();
    return result;
};

/**
 * Submit the query to the proper collection in our database
 * @param coll collection to search through
 * @param query parameters to find item to update in the collection using 
 * @param newVals fields to update and their new values to set to 
 * */
exports.update = async function (coll, query, newVals){
    await client.connect();
    const collection = client.db("FoodWaste").collection(coll);

    let error =false;

    collection.updateOne(query,{$set:newVals},function(err, res) {
        if (err){ 
            console.error(err);
            error=true;
        }
        else{
            console.log("1 document updated in"+ coll);
            client.close();
        }
      });
      return !error;
};

/**
 * Submit the query to the proper collection in our database
 * @param coll collection to search through
 * @param query parameters to find items to update in the collection using 
 * @param newVals fields to update and their new values to set to 
 * */
exports.updateMany = async function (coll, query, newVals){
    await client.connect();
    const collection = client.db("FoodWaste").collection(coll);

    let error =false;

    collection.updateMany(query,{$set:newVals},function(err, res) {
        if (err){ 
            console.error(err);
            error=true;
        }
        else{
            console.log(res.result.nModified + " document(s) updated in "+ coll);
        }
        client.close();
      });
      return !error;
};

/**
 * Submit the query to the proper collection in our database
 * @param coll collection to search through
 * @param query parameters to find item to delete using 
 * */
exports.delete = async function (coll,query){
    await client.connect();
    const collection = client.db("FoodWaste").collection(coll);
    let error =false;

    collection.delete(query,function(err, res) {
        if (err){ 
            console.error(err);
            error=true;
        }
        else{
            console.log("1 document deleted from "+ coll);
        }
        client.close();
      });
    return !error;
};

/**
 * Submit the query to the proper collection in our database
 * @param coll collection to search through
 * @param query parameters to find an items to delete in the collection using
 * */
exports.deleteMany = async function (coll,query){
    await client.connect();
    const collection = client.db("FoodWaste").collection(coll);
    let error =false;

    collection.deleteMany(query,function(err, res) {
        if (err){ 
            console.error(err);
            error=true;
        }
        else{
            console.log(res.result.n + " document(s) deleted from "+ coll);
        }
        client.close();
      });
    return !error;
};