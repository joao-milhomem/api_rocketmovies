const { Router } = require("express");
const appRouter = Router();

const usersRoutes = require("./users.routes");
const notesRoutes = require("./notes.routes");
const tagsRoutes = require("./tags.routes");

appRouter.use("/users", usersRoutes);
appRouter.use("/notes", notesRoutes);
appRouter.use("/tags", tagsRoutes);

module.exports = appRouter;
