const app = require("./app.js");
const path= require('path')

if(process.env.NODE_ENV !=='PRODUCTION') {
  require("dotenv").config({ path: __dirname + "/config/.env" });
  
  }
const port = process.env.PORT || 8080;
const cloudinary= require('cloudinary')



// uncaught error handling

process.on("uncaughtException",(err)=>{
    // console.log(`Error: ${err.message}`);
    // console.log("Sutting down the server due to uncaught exception");
   
        process.exit(1);
    
})

require("./config/database.js");

cloudinary.config({
  cloud_name:process.env.CLOUDINARY_NAME,
  api_key: process.env.API_KEY,
  api_secret:  process.env.API_SECRET
} )

const server = app.listen(port, () => {
  console.log("port is listening....");
});

process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log("Sutting down the server due to unhandled rejection");

  server.close(() => {
    process.exit(1);
  });
});
