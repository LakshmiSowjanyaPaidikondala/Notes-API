// This model file handles only the SQL queries

const connection = require("../config/db");

async function getAllNotes(userId,limit,offset){
    const [result]= await connection.query("SELECT * FROM notes WHERE user_id=? LIMIT ? OFFSET ?",[userId,limit,offset]);
    return result;
}

async function getNoteById(id,userId){
    const [result] = await connection.query("SELECT * FROM notes WHERE id=? AND user_id=?",
                     [id,userId]);
    return result;
}

async function createNote(title,content,userId){
    const [result] = await connection.query("INSERT INTO notes(title,content) VALUES(?,?,?)",
            [title,content,userId]);
    return result;
}

async function updateNote(title,content,id,userId){
    const [result] = await connection.query("UPDATE notes SET title=?,content=? WHERE id = ? AND user_id=?",
                          [title,content,id,userId]);
    return result;
}

async function deleteNote(id,userId){
    const [result] = await connection.query("DELETE FROM notes WHERE id=? AND user_id=?",
                     [id,userId]);
    return result;
}

module.exports = {
    getAllNotes,
    getNoteById,
    createNote,
    updateNote,
    deleteNote
};
