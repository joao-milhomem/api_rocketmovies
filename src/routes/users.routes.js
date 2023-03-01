const { Router } = require("express");
const multer = require("multer");
const usersRoutes = Router();

const UsersControllers = require("../controllers/UsersControllers");
const usersControllers = new UsersControllers();

const ensureAuthenticity = require("../middlewares/ensureAuthenticity");

const uploadConfig = require("../configs/upload");
const AvatarController = require("../controllers/AvatarController");
const avatarController = new AvatarController();
const upload = multer(uploadConfig.MULTER);

usersRoutes.post("/", usersControllers.create);
usersRoutes.put("/", ensureAuthenticity, usersControllers.update);
usersRoutes.patch(
  "/avatar",
  ensureAuthenticity,
  upload.single("avatar"),
  avatarController.update
);

module.exports = usersRoutes;
