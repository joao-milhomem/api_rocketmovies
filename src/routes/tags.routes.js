const { Router } = require("express");
const tagsRoutes = Router();

const TagsControllers = require("../controllers/TagsController");
const tagsControllers = new TagsControllers();

tagsRoutes.get("/:user_id", tagsControllers.index);


module.exports = tagsRoutes;
