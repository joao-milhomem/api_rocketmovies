const knex = require("../database/knex");
const AppError = require("../utils/AppError");

class NotesController {
  async create(request, response) {
    const user_id = request.user.id;
    const { title, description, rating, tags } = request.body;

    if (rating < 0 || rating > 5) {
      throw new AppError("Digite uma nota entre 0 e 5");
    }

    const note_id = await knex("notes").insert({
      title,
      description,
      rating,
      user_id,
    });

    const tagsToInsert = tags.map((tag) => {
      return {
        note_id,
        user_id,
        name: tag,
      };
    });

    await knex("tags").insert(tagsToInsert);

    response.json({});
  }

  async show(request, response) {
    const { id } = request.params;

    const note = await knex("notes").where({ id }).first();
    const tags = await knex("tags").where({ note_id: id });

    return response.json({
      ...note,
      tags,
    });
  }

  async delete(request, response) {
    const { id } = request.params;

    await knex("notes").where({ id }).delete();

    return response.json({});
  }

  async index(request, response) {
    const { title } = request.query;
    const user_id = request.user.id;

    const notes = await knex("notes")
      .where({ user_id })
      .whereLike("title", `%${title}%`)
      .orderBy("title");

    const allUserTags = await knex("tags").where({ user_id });

    const notesWithTags = notes.map((note) => {
      const filteredTags = allUserTags.filter((tag) => tag.note_id === note.id);
      return {
        ...note,
        tags: filteredTags,
      };
    });

    return response.json(notesWithTags);
  }
}
module.exports = NotesController;
