// This file consists main bussiness logic

const notesModel = require("../models/notesModel");

async function getAllNotes(req,res){
        try{
            const result = await notesModel.getAllNotes();
            res.json(result);
        }
        catch(error){
            console.log(error);
            res.status(500).send("Database Error");
        }
}

async function getNoteById(req,res){
    const id = req.params.id;
    try{
        const result = await notesModel.getNoteById(id);
        if(result.length == 0){
            return res.status(404).send("Note not found");
        }
        res.json(result[0]);
    }
    catch(error){
        console.log(error);
        res.status(500).send("Database Error");
    }
}

async function createNote(req,res){
    const {title, content} = req.body;
    //This is similar to
    //const title = req.body.title;
    //const content = req.body.content;
    try{
        const result = await notesModel.createNote(title,content);
        res.status(201).json({
                    message: "Note created successfully",
                    id: result.insertId
                });
    }
    catch(error){
        console.log(error);
        res.status(500).send("Database Error");
    }

}

async function updateNote(req,res){
        const id = req.params.id;
        // const title = req.body.title;
        // const content = req.body.content;
        const {title, content} = req.body;
        try{
            
            const result = await notesModel.updateNote(title,content,id);
            if (result.affectedRows === 0) {
                return res.status(404).send("Note not found");
            }
            res.status(200).json({
                                message:"Notes updated successfully"
                            });
        }catch(error){
            console.log(error);
            res.status(500).send("Database Error");
        }
}

async function deleteNote(req,res){
    try{
        const id = req.params.id;
        const result = await notesModel.deleteNote(id);
        if (result.affectedRows === 0) {
            return res.status(404).send("Note not found");
        }
         res.status(200).json({
                            message:"Note deleted successfully"
                        });
    }catch(error){
        console.log(error);
        res.status(500).send("Database Error");
    }
}

module.exports = {
    getAllNotes,
    createNote,
    getNoteById,
    updateNote,
    deleteNote
};
