import customResponse from "../utils/customResponse.js";
import User from "../models/user.js";

async function isLoggedIn(req, res, next){
    let token = req.headers.authorization 
    if(!token){
             return customResponse(res,400,false,"","Token Missing",null);
        }

    token = token.split(" ")[1]  // undefined

     if(!token){
             return customResponse(res,400,false,"","Token Missing",null);
        }

    try{
        const foundUser = await User.findOne({token: token})
    
        if(!foundUser){
            return customResponse(res,400,false,"","Daffa ho ja",null);
        }

        req.currentUser = foundUser



        next()
    }
    catch(err){
         return customResponse(res,500,false,"","Internal Server Error",null);
    }

}

export default isLoggedIn