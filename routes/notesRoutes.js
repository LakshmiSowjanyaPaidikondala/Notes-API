const express = require("express");
const router = express.Router();

const notesController = require("../controllers/notesController");
const validateNote = require("../middleware/noteValidation");
const validateId = require("../middleware/idValidation");

router.get("/",notesController.getAllNotes);

router.get("/:id",validateId,notesController.getNoteById);

router.post("/",validateNote,notesController.createNote);

router.put("/:id",validateId,validateNote,notesController.updateNote);

router.delete("/:id",validateId,notesController.deleteNote);

module.exports=router;
