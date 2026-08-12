const bcrypt = require("bcrypt");
const userModel = require("../models/userModel");
async function registerUser(req,res,next){
    const {username,password}=req.body;
    try{
        const hashedpassword = await bcrypt.hash(password,10);
        const result = await userModel.createUser(username,hashedpassword);
        res.status(201).send({
            message:"User registered successfully!!",
            id:result.insertId
        });
    }catch(error){
        next(error);
    }
}
module.exports = {
    registerUser
};