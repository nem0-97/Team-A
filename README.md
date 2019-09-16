# Backend Setup

  First you need to add a hidden.js into the backend dirctory with the format:
    
  
    module.exports={
      "mongo":{
        "uri" :<your mongodb server uri>
      }
    }
 
    
   Next to setup the backend run `npm install` from the backend directory to install required node modules. 
  
  To start the backend run the command `npm start` from the backend directory.
   
# Frontend Setup

  You first need to add a hidden.js into the frontend/src dirctory with the format:
    

    module.exports={
      "apiPaths":{
          "base" :<url backend hosts api at (http://localhost:3000/api/v1) with given code>
      }
    }

 Next to setup the frontend run `npm install` from the frontend directory to install required node modules.
 
 To start the frontend run the command `npm start` form the frontend directory.

[REACT FRONTEND README](./frontend/README.md)
