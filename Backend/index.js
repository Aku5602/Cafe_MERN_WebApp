// import "./database/conn.mjs";

const express = require('express');
const index=require("./routes/index.js");
const app = express();
const cors=require("cors");
const path = require("path");

const port = 3001;

//To register middleware
app.use(cors({
  origin:["http://localhost:3000","https://Cafe_WebApp1.onrender.com"]
})) 
app.use(express.json());

require("./database/conn.js");

app.use(index);
// app.use(connection);

app.listen(port, (err) => {
    if (err) throw "Error";
    console.log("Listening to port ", port);
});