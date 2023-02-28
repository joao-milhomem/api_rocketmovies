const { Router } = require("express");
const tagsRoutes = Router();

const TagsControllers = require("../controllers/TagsController");
const tagsControllers = new TagsControllers();
const ensureAuthenticity = require("../middlewares/ensureAuthenticity");

tagsRoutes.get("/", ensureAuthenticity, tagsControllers.index);

module.exports = tagsRoutes;
