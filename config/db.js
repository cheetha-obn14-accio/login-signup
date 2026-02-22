import mongoose from "mongoose";

mongoose.connect("mongodb+srv://ramesh123:ramesh123@trello.et12q.mongodb.net/auth14")
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error("Could not connect to MongoDB", err));



    // retry for 3 times (2sec, 5sec, 8sec)