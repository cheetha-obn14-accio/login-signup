import User from "../models/user.js";
import express from "express";

const authRouter = express.Router();

import customResponse from "../utils/customResponse.js";



// signup route:


//  return res.status(status).json({
    //     success,message,err, data
    // })

authRouter.post("/signup", async (req, res) => {

    const { name, email, password } = req.body;

    // validations:
    if (!name || !email || !password) {
        return customResponse(res,400,false,"All fields are required",null,null);
    }
    // check if email is in proper format: => rejex 

    // check if password is strong: => regex
try{

   const foundUser = await User.findOne({email: email})

   if(foundUser){
       return customResponse(res,400,false,"","User already Exists",null);
   }
    
   let newUser = new User({
    name, email, password
   })

  const savedUser =  await newUser.save()

  if(savedUser){
    return customResponse(res,200,true," User Saved Successfully","",savedUser);
  }
}
catch(err){
    return customResponse(res,500,false,"","Internal Server Error",null);
}



})


// Problem 1: Password is not hashed 
// Proble 2: Send limited filed in res

// login route:

authRouter.post("/login", async (req, res) => {

    const { email, password } = req.body;

    // validations:
    if (!email || !password) {
        return customResponse(res,400,false,"All fields are required",null,null);
    }

    try{
        const foundUser = await User.findOne({email: email})
        if(!foundUser){
             return customResponse(res,400,false,"","User doesnt exits",null);
        }
        if(foundUser.password == password){
            return customResponse(res,200,true," User LoggedIN","",foundUser);
        }
    }

    catch(err){
         return customResponse(res,500,false,"","Internal Server Error",null);
    }

})



export default authRouter