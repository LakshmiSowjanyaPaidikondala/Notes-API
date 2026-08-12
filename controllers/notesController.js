// This file consists main bussiness logic

const notesModel = require("../models/notesModel");

async function getAllNotes(req,res,next){
        try{
            
            const result = await notesModel.getAllNotes();
            res.json(result);
        }
        catch(error){
            next(error);
        }
}

async function getNoteById(req,res,next){
    const id = req.params.id;
    try{
        const result = await notesModel.getNoteById(id);
        if(result.length == 0){
            const error = new Error("Note not found");
            error.statusCode = 404;
            return next(error);
        }
        res.json(result[0]);
    }
    catch(error){
        next(error);
    }
}

async function createNote(req,res,next){
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
        next(error);
    }

}

async function updateNote(req,res,next){
        const id = req.params.id;
        // const title = req.body.title;
        // const content = req.body.content;
        const {title, content} = req.body;
        try{
            
            const result = await notesModel.updateNote(title,content,id);
            if (result.affectedRows === 0) {
                const error = new Error("Note not found");
                error.statusCode = 404;
                return next(error);
            }
            res.status(200).json({
                                message:"Notes updated successfully"
                            });
        }catch(error){
            next(error);
        }
}

async function deleteNote(req,res,next){
    try{
        const id = req.params.id;
        const result = await notesModel.deleteNote(id);
        if (result.affectedRows === 0) {
            const error = new Error("Note not found");
            error.statusCode = 404;
            return next(error);
        }
         res.status(200).json({
                            message:"Note deleted successfully"
                        });
    }catch(error){
        next(error);
    }
}

module.exports = {
    getAllNotes,
    createNote,
    getNoteById,
    updateNote,
    deleteNote
};
