const connection = require("../config/db");

async function createUser(username,hashedpassword) {
    const [result]=await connection.query(
                    "INSERT INTO users(username,password) Values(?,?)",
                    [username,hashedpassword]);
    return result;
}

async function findUserByUsername(username){
    const [result]= await connection.query(
                    "SELECT * FROM users where username=?",
                    [username]);
    return result;
}
module.exports = {
    createUser,
    findUserByUsername
};