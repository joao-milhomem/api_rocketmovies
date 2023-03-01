const fs = require("fs");
const path = require("path");
const { TMP_FOLDER, UPLOADS_FOLDER } = require("../configs/upload");
class DiskStorage {
  async saveFile(file) {
    await fs.promises.rename(
      path.resolve(TMP_FOLDER, file),
      path.resolve(UPLOADS_FOLDER, file)
    );

    return file;
  }

  async deleteFile(file) {
    const targetFile = path.resolve(UPLOADS_FOLDER, file);

    try {
      await fs.promises.stat(targetFile);
    } catch {
      return;
    }

    fs.promises.unlink(targetFile);
  }
}

module.exports = DiskStorage