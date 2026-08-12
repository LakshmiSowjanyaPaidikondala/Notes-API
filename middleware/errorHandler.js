function errorHandler(error,req,res,next){
    console.log(error);
    const statusCode = error.statusCode || 500;

    res.status(statusCode).send(error.message||"Internal server error");
}
module.exports= errorHandler;