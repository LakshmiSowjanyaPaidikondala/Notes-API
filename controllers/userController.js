const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");
async function registerUser(req,res,next){
    const {username,password}=req.body;
    try{
        const hashedpassword = await bcrypt.hash(password,10);
        const result = await userModel.createUser(username,hashedpassword);
        res.status(201).json({
            message:"User registered successfully!!",
            id:result.insertId
        });
    }catch(error){
        next(error);
    }
}

async function loginUser(req,res,next){
    const {username,password} = req.body;
    try{
        const result = await userModel.findUserByUsername(username);
        if(result.length==0){
            return res.status(401).send("Invalid username or password");
        }
        const user = result[0];
        const isPasswordCorrect = await bcrypt.compare(password,user.password);
        if(!isPasswordCorrect){
            return res.status(401).send("Invalid username or password");
        }
        const token = jwt.sign(
            {userId:user.id},
            process.env.JWT_SECRET,
            {expiresIn:"1h"}
        );
        res.status(201).json({
            message:"Login successfull",
            token:token
        });
    }catch(error){
        next(error);
    }
}
module.exports = {
    registerUser,
    loginUser
};