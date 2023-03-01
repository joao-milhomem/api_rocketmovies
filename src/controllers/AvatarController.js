const knex = require("../database/knex");
const DiskStorage = require("../providers/DiskStorage");

class AvatarController {
  async update(request, response) {
    const diskStorage = new DiskStorage();
    const user_id = request.user.id;
    const filename = request.file.filename;

    const user = await knex("users").where({ id: user_id }).first();
    if (!user) {
      throw new AppError("Usuário não autenticado", 401);
    }

    if (user.avatar) {
      await diskStorage.deleteFile(user.avatar);
    }

    const filePath = await diskStorage.saveFile(filename);

    user.avatar = filePath;

    await knex("users").update(user).where({ id: user_id });

    return response.json({ user });
  }
}

module.exports = AvatarController;
