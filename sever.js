//This will be the starting file of  the project

const express = require("express");
const mongoose = require("mongoose");
const app = express();
const bcrypt = require("bcryptjs");
const server_config = require("./configs/server.config");
const db_config = require("./configs/db.config");
const user_model = require("./models/user.models");
const bodyParser=require('body-parser');
app.use(bodyParser.json()); // this is middleware  used to read json as like js object
app.use(bodyParser.urlencoded({extended:true}));

//Connection with mongodb
mongoose.connect(db_config.DB_URL);
const db = mongoose.connection;
db.on("error", () => {
  console.log("Error while connecting to mongoDB");
});
db.once("open", () => {
  console.log("Connected to MongoDB");
  init();
});

async function init() {
  let user = await user_model.findOne({ userId: "admin" });
  if (user) {
    console.log("Admin is already present");
    return;
  } else {
    try {
      let user = await user_model.create({
        name: "pawan kumar",
        userId: "admin",
        email: "smartboy82100@gmail.com",
        userType: "ADMIN",
        password: bcrypt.hashSync("welcome1", 8),
      });
      console.log("Admin is created");
      console.log(user);
    } catch (err) {
      console.log("Error while create admin", err);
    }
  }
}
//Stich the router to the server
require("./routes/auth.routes")(app); //call routes and passing app object
/* Start the server*/
console.log(server_config.PORT);
app.listen(server_config.PORT, (err) => {
  if (err) {
    console.log("sever not start ");
  } else {
    console.log(`server started at port ${server_config.PORT}`);
  }
});
