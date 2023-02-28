const { Router } = require("express");
const notesRoutes = Router();

const NotesController = require("../controllers/NotesController");
const notesControllers = new NotesController();
const ensureAuthenticity = require("../middlewares/ensureAuthenticity");

notesRoutes.get("/", ensureAuthenticity, notesControllers.index);
notesRoutes.get("/:id", notesControllers.show);
notesRoutes.post("/", ensureAuthenticity, notesControllers.create);
notesRoutes.delete("/:id", notesControllers.delete);
module.exports = notesRoutes;
