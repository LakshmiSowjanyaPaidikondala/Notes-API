const connection = require("../config/db");

async function createUser(username,hashedpassword) {
    const [result]=await connection.query(
                    "INSERT INTO users(username,password) Values(?,?)",
                    [username,hashedpassword]);
    return result;
}
module.exports = {
    createUser
};