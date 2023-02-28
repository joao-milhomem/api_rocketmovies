const { Router } = require("express");
const usersRoutes = Router();

const UsersControllers = require("../controllers/UsersControllers");
const usersControllers = new UsersControllers();
const ensureAuthenticity = require("../middlewares/ensureAuthenticity");

usersRoutes.post("/", usersControllers.create);
usersRoutes.put("/", ensureAuthenticity, usersControllers.update);

module.exports = usersRoutes;
