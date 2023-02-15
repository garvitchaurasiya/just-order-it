const mongoose = require('mongoose');

// const mongoDB_URI = "mongodb://localhost:27017/justorderit";
const mongoDB_URI = "mongodb+srv://garvit:20020725@cluster0.nhpd38n.mongodb.net/justorderit?retryWrites=true&w=majority";

mongoose.set("strictQuery", false);
const connectToMongoDB = ()=>{
    mongoose.connect(mongoDB_URI, ()=>{
        console.log("Connected to MongoDB successfully");
    })
}

module.exports= connectToMongoDB;