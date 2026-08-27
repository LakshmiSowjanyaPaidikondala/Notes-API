const express = require("express");
const router = express.Router();

const notesController = require("../controllers/notesController");
const validateNote = require("../middleware/noteValidation");
const validateId = require("../middleware/idValidation");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/",authMiddleware,notesController.getAllNotes);

router.get("/:id",authMiddleware,validateId,notesController.getNoteById);

router.post("/",authMiddleware,validateNote,notesController.createNote);

router.put("/:id",authMiddleware,validateId,validateNote,notesController.updateNote);

router.delete("/:id",authMiddleware,validateId,notesController.deleteNote);

module.exports=router;
