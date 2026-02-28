import User from "../models/user.js";
import express from "express";

const authRouter = express.Router();

import customResponse from "../utils/customResponse.js";

import bcrypt from "bcrypt"

import { v4 as uuidv4 } from 'uuid';

import hello from "../middleware/hello.js";

import isLoggedIn from "../middleware/isLoggedIn.js";


const saltRounds = 10;

  const zuckerbergJokes = [
  "Mark Zuckerberg doesn’t need a diary. Facebook already knows what he did.",
  "Mark doesn’t age. He just updates to a new version.",
  "If Mark Zuckerberg forgets your birthday, it’s because you didn’t click 'Interested.'",
  "Mark’s idea of privacy is switching from public to ‘friends of friends.’",
  "He didn’t build Facebook. He built a global group project where we all overshare.",
  "Mark smiles like he just debugged humanity.",
  "The only thing more updated than Facebook is Mark’s sunscreen collection.",
  "When Mark says ‘connecting the world,’ he means connecting your data to advertisers.",
  "Mark Zuckerberg probably reads terms and conditions for fun.",
  "If aliens land on Earth, they’ll assume Mark is their ambassador.",
  "Mark doesn’t scroll Instagram. Instagram scrolls him.",
  "Facebook outage? Mark just tripped over the main cable.",
  "Mark’s hoodie has more net worth than most countries.",
  "Mark doesn’t blink. He refreshes.",
  "When Mark says ‘What’s on your mind?’ he already knows.",
  "Mark’s metaverse demo looks like The Sims after a low battery warning.",
  "He doesn’t ghost people. He just optimizes them out.",
  "Mark Zuckerberg’s poker face is just his regular face.",
  "Even Siri asks Mark for permission.",
  "Mark didn’t invent social media. He invented social homework."
];




// signup route:


//  return res.status(status).json({
    //     success,message,err, data
    // })

authRouter.post("/signup", async (req, res) => {

    const { name, email, password } = req.body;
    console.log("hello", typeof User)

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

   const hashedPassword = await bcrypt.hash(password, saltRounds)
    
   let newUser = new User({
    name, email, password: hashedPassword
   })

   newUser.token =  uuidv4()


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
        const isMatch = await bcrypt.compare(password, foundUser.password);

        if(!isMatch){
             return customResponse(res,400,false,"","Password doesnot match",null);
        }

        // generate token: 
          let token =  uuidv4()
   
        // save token
          foundUser.token = token

         let tokenedUser =  await foundUser.save()
     
         return customResponse(res,200,true," User LoggedIN","",tokenedUser);
        
    }

    catch(err){
         return customResponse(res,500,false,"","Internal Server Error",null);
    }

})



authRouter.get("/zuku/", isLoggedIn , async(req, res)=>{

    // current logged In user:

   
   console.log(" I am inside api")

   let randomJoke = zuckerbergJokes[parseInt(Math.random()*zuckerbergJokes.length)]
    
    return customResponse(res,200,true,"Joke is Ready","",{
        joke: randomJoke,
        user:  req.currentUser
    });
   
   
})

authRouter.delete("/logout", isLoggedIn,  async(req, res)=>{
     
    try{
    let foundUser = req.currentUser
    foundUser.token = ""
    // delete foundUser.token

    console.log(foundUser)
    // User.findOneAndDelete({token: token})

    let loggedOutUser = await foundUser.save()

     return customResponse(res,200,true," User LoggedOut","",loggedOutUser);

    }
    catch(err){
     return customResponse(res,500,false,"","Internal Server Error",null);
   }

})



export default authRouter