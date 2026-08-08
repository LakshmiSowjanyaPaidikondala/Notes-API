// This model file handles only the SQL queries

const connection = require("../config/db");

function getAllNotes(callback){
    connection.query("SELECT * FROM notes",callback);
}

function getNoteById(id,callback){
    connection.query("SELECT * FROM notes WHERE id=?",
                     [id], callback);
}

function createNote(title,content,callback){
    connection.query("INSERT INTO notes(title,content) VALUES(?,?)",
            [title,content],callback);
}

function updateNote(title,content,id,callback){
    connection.query("UPDATE notes SET title=?,content=? WHERE id = ?",
                          [title,content,id],callback);
}

function deleteNote(id,callback){
    connection.query("DELETE FROM notes WHERE id=?",
                     [id],callback);
}

module.exports = {
    getAllNotes,
    getNoteById,
    createNote,
    updateNote,
    deleteNote
};
