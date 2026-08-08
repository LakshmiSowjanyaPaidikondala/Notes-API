// This file consists main bussiness logic

const notesModel = require("../models/notesModel");

function getAllNotes(req,res){
        notesModel.getAllNotes((error,result)=>{
                        if (error) {
                            console.log(error);
                            return res.status(500).send("Database Error");
                        }
                        res.json(result);
                    });
}

function getNoteById(req,res){
    const id = req.params.id;
    notesModel.getNoteById(id,(error,result)=>{
                        if(error){
                            return res.status(500).send("Database Error");
                        }
                        if(result.length==0){
                            return res.status(404).send("Note not found");
                        }
                        res.json(result[0]);
                     });
}

function createNote(req,res){
    const {title, content} = req.body;
    //This is similar to
    //const title = req.body.title;
    //const content = req.body.content;
    notesModel.createNote(title,content,(error,result)=>{
                if(error){
                    return res.status(500).send("Database Error");
                }
                res.status(201).json({
                    message: "Note created successfully",
                    id: result.insertId
                });
            }
    );
}

function updateNote(req,res){
        const id = req.params.id;
        // const title = req.body.title;
        // const content = req.body.content;
        const {title, content} = req.body;
        notesModel.updateNote(title,content,id,(error,result)=>{
                            if(error){
                                return res.status(500).send("Database Error");
                            }
                            if(result.affectedRows==0){
                                return res.status(404).send("Notes not found");
                            }
                            res.status(200).json({
                                message:"Notes updated successfully"
                            });
                          }
        );
}

function deleteNote(req,res){
    const id = req.params.id;
    notesModel.deleteNote(id,(error,result)=>{
                        if(error){
                            return res.status(500).send("Database Error");
                        }
                        if(result.affectedRows==0){
                            return res.status(404).send("Notes not found");
                        }
                        res.status(200).json({
                            message:"Note deleted successfully"
                        });
                     }
    );
}

module.exports = {
    getAllNotes,
    createNote,
    getNoteById,
    updateNote,
    deleteNote
};
