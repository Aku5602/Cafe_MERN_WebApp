//connect MongoDB to server
const mongoose= require("mongoose");
console.log(process.env.MONGO_URL);
mongoose.connect(process.env.MONGO_URL).then(() => console.log("Connected To DB")).catch((err) => console.log("Some error",err));


