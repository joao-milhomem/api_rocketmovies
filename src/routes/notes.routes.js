const { Router } = require("express");
const notesRoutes = Router();

const NotesController = require("../controllers/NotesController");
const notesControllers = new NotesController();

notesRoutes.get("/", notesControllers.index);
notesRoutes.get("/:id", notesControllers.show);
notesRoutes.post("/:user_id", notesControllers.create);
notesRoutes.delete("/:id", notesControllers.delete);
module.exports = notesRoutes;
