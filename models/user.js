import mongoose from "mongoose";
// const Schema = mongoose.Schema


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide a name"],
    },
    email: {
        type: String,
        required: [true, "Please provide an email"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Please provide a password"],
    },
    token: {
        type: String
    }

})

const User = mongoose.model("User", userSchema);
console.log(User)
// users

export default User;