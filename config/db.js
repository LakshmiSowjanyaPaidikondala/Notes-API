require("dotenv").config();


const mysql = require("mysql2");


const connection = mysql.createConnection({
    host:process.env.DB_HOSRT,
    user:process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database:process.env.DB_NAME,
    port: process.env.DB_PORT
});

connection.connect((error)=>{
    if(error){
        console.log("Connection failed");
        return;
    }
    else{
        console.log("Connection Successfull!!");

    }
});

module.exports = connection; // connection between the 2 files
