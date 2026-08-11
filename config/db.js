require("dotenv").config();


const mysql = require("mysql2/promise");


const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
});

console.log("Database pool created successfully");

module.exports = pool;

// connection.connect((error)=>{
//     if(error){
//         console.log("Connection failed");
//         return;
//     }
//     else{
//         console.log("Connection Successfull!!");

//     }
// });
 // connection between the 2 files
