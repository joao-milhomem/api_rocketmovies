const knex = require("../database/knex");
const AppError = require("../utils/AppError");

class NotesController {
  async create(request, response) {
    const user_id = request.user.id;
    const { title, description, rating, tags } = request.body;

    if (rating < 1 || rating > 5) {
      throw new AppError("Digite uma nota entre 1 e 5");
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
    const { title, tags } = request.query;
    const user_id = request.user.id;
    let notes;

    if (tags) {
      const listTags = tags.split(",").map((tag) => tag.trim());
      notes = await knex("tags")
        .select(["notes.id", "notes.title", "notes.user_id"])
        .where("notes.user_id", user_id)
        .whereLike("notes.title", `%${title}%`)
        .whereIn("tags.name", listTags)
        .innerJoin("notes", "notes.id", "tags.note_id")
        .orderBy("notes.title");
    } else {
      notes = await knex("notes")
        .where({ user_id })
        .whereLike("title", `%${title}%`)
        .orderBy("title");
    }

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
