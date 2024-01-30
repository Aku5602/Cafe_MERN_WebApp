// import "./database/conn.mjs";
require('dotenv').config(); 
const express = require('express');
const index = require("./routes/index.js");
const app = express();
const cors = require("cors");
const path = require("path");
const cron = require("node-cron");


//To register middleware
app.use(cors())
app.use(express.json());

require("./database/conn.js");

app.use(index);
cron.schedule('* * * * *', () => { 
  // console.log("Hello");
});
// app.use(connection);

app.listen(+process.env.PORT, (err) => {
  if (err) throw "Error";
  console.log("Listening to port ", process.env.PORT);
});
