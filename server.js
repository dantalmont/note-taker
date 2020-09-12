//dependencies
const express = require("express");
const fs = require("fs");
const path = require("path");

//creates the express server
const app = express();
//port listener
const PORT = process.env.PORT || 8080;

//sets up middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

//routes
require("./routes/api-routes")(app);
require("./routes/html-routes")(app);

//starts server
app.listen(PORT,function(){
    console.log("app is listening on PORT: " + PORT);
});
  