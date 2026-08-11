function validateNote(req,res,next){
    const {title,content}=req.body
            if(typeof title !=="string"||typeof content !=="string"||!title.trim()||!content.trim()){
                return res.status(400).send("Title and Content are required");
            }
            if (title.length > 100) {
                return res.status(400).send("Title is too long");
            }
    
            if (content.length > 5000) {
                return res.status(400).send("Content is too long");
            }
            
    next();
}

module.exports=validateNote;