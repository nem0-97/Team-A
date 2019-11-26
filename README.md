# Backend Setup

  First you need to add a hidden.js into the backend dirctory with the format:
    
  
    module.exports={
      "mongo":{
        "uri" :<your mongodb server uri>
      },
      "login":{
        "sessionSecret":<whateveer string you want>
      }
    }
 
    
   Next to setup the backend run `npm install` from the backend directory to install required node modules. 
   The backend requires a certificate to be able to run since it uses https. You can seet this up by running:
  
   $ openssl req -nodes -new -x509 -keyout server.key -out server.cert
   
   You can then just follow the prompts to make the certificate.
  
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
