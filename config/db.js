const mysql = require("mysql2");
const connection = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"PASSWORD_HERE",
    database:"notes_db"
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
