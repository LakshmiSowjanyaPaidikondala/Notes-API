// This file consists main bussiness logic

const notesModel = require("../models/notesModel");

async function getAllNotes(req,res,next){
        try{
            
            const userId = req.user.userId;
            const page = Number(req.query.page) || 1;
            const limit = Number(req.query.limit) || 10;

            const offset = (page - 1) * limit;
            const result = await notesModel.getAllNotes(userId,limit,offset);
            res.json({
                page: page,
                limit: limit,
                notes: result
            });
        }
        catch(error){
            next(error);
        }
}

async function getNoteById(req,res,next){
    const id = req.params.id;
    const userId = req.user.userId;
    try{
        const result = await notesModel.getNoteById(id,userId);
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
    const userId = req.user.userId;
    //This is similar to
    //const title = req.body.title;
    //const content = req.body.content;
    try{
        const result = await notesModel.createNote(title,content,userId);
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
        const userId = req.user.userId;
        try{
            const result = await notesModel.updateNote(title,content,id,userId);
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
        const userId = req.user.userId;
        const id = req.params.id;
        const result = await notesModel.deleteNote(id,userId);
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
