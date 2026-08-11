// This model file handles only the SQL queries

const connection = require("../config/db");

async function getAllNotes(){
    const [result]= await connection.query("SELECT * FROM notes");
    return result;
}

async function getNoteById(id){
    const [result] = await connection.query("SELECT * FROM notes WHERE id=?",
                     [id]);
    return result;
}

async function createNote(title,content){
    const [result] = await connection.query("INSERT INTO notes(title,content) VALUES(?,?)",
            [title,content]);
    return result;
}

async function updateNote(title,content,id){
    const [result] = await connection.query("UPDATE notes SET title=?,content=? WHERE id = ?",
                          [title,content,id]);
    return result;
}

async function deleteNote(id){
    const [result] = await connection.query("DELETE FROM notes WHERE id=?",
                     [id]);
    return result;
}

module.exports = {
    getAllNotes,
    getNoteById,
    createNote,
    updateNote,
    deleteNote
};
