const mongo = require('mongodb');
const MongoClient = mongo.MongoClient;
const hidden=require("./hidden.js"); //hidden file containing passwords/authentication info for MongoDB(won't be pushed to github)
const client = new MongoClient(hidden.mongo.uri, { useNewUrlParser: true ,useUnifiedTopology: true });

exports.ObjId = mongo.ObjectId;

let db;
client.connect(err => {
    if(err) console.log(err);
    else db = client.db("FoodWaste")
})

/**
 * Add the provided element to the proper collection in our database
 * @param coll collection to add el to
 * @param el new item to add to the collection
 * */
exports.add = function (coll,el){
    db.collection(coll).insertOne(el);
};

/**
 * Submit the query to the proper collection in our database
 * @param coll collection to search through
 * @param query parameters to find items in the collection using 
 * */
exports.fullFind = async function (coll,query){
    return await db.collection(coll).find(query).toArray();
};

/**
 * Submit the query to the proper collection in our database
 * @param coll collection to search through
 * @param query parameters to find an itme in the collection using
 * */
exports.fullFindOne = async function (coll,query){
    return await db.collection(coll).findOne(query);
};

/**
 * Submit the query to the proper collection in our database
 * @param coll collection to search through
 * @param query parameters to find items in the collection using 
 * */
exports.find = async function (coll,query){
    return await db.collection(coll).find(query,{projection:{"accountinfo":0}}).toArray();
};

/**
 * Submit the query to the proper collection in our database
 * @param coll collection to search through
 * @param query parameters to find an itme in the collection using
 * */
exports.findOne = async function (coll,query){
    return await db.collection(coll).findOne(query,{projection:{"accountinfo":0}});
};

/**
 * Submit the query to the proper collection in our database
 * @param coll collection to search through
 * @param query parameters to find item to update in the collection using 
 * @param newVals fields to update and their new values to set to 
 * */
exports.update = async function (coll, query, newVals){
    let error =false;

    db.collection(coll).updateOne(query,{$set:newVals},function(err, res) {
        if (err){ 
            console.error(err);
            error=true;
        }
        else{
            console.log("1 document updated in"+ coll);
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
    let error =false;

    db.collection(coll).updateMany(query,{$set:newVals},function(err, res) {
        if (err){ 
            console.error(err);
            error=true;
        }
        else{
            console.log(res.result.nModified + " document(s) updated in "+ coll);
        }
      });
      return !error;
};

/**
 * Submit the query to the proper collection in our database
 * @param coll collection to search through
 * @param query parameters to find item to delete using 
 * */
exports.delete = async function (coll,query){
    let error =false;

    db.collection(coll).deleteOne(query,function(err, res) {
        if (err){ 
            console.error(err);
            error=true;
        }
      });
    return !error;
};

/**
 * Submit the query to the proper collection in our database
 * @param coll collection to search through
 * @param query parameters to find an items to delete in the collection using
 * */
exports.deleteMany = async function (coll,query){
    let error =false;

    db.collection(coll).deleteMany(query,function(err, res) {
        if (err){ 
            console.error(err);
            error=true;
        }
        else{
            console.log(res.result.n + " document(s) deleted from "+ coll);
        }
      });
    return !error;
};