// import "./database/conn.mjs";

const express = require('express');
const index = require("./routes/index.js");
const app = express();
const cors = require("cors");
const path = require("path");
const cron = require("node-cron");

// const port = 80;

//To register middleware
app.use(cors())
app.use(express.json());

require("./database/conn.js");

app.use(index);
cron.schedule('* * * * *', () => { 
  // console.log("Hello");
});
// app.use(connection);

app.listen(process.env.PORT, (err) => {
  if (err) throw "Error";
  console.log("Listening to port ", process.env.PORT);
});
