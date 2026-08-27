function validateUser(req,res,next){
    const {username,password}=req.body;
    if(typeof username !== "string"|| typeof password !== "string"||!username.trim()||!password.trim()){
        return res.status(400).send("Username and password are required");
    }
    if(username.trim().length < 3){
        return res.status(400).send("Username must be atleast 3 characters");
    }
    if(username.trim().length > 100){
        return res.status(400).send("Username is too long");
    }
    if(password.length < 6){
        return res.status(400).send("Password must be atleast 6 characters");
    }
    next();
}
module.exports = validateUser;