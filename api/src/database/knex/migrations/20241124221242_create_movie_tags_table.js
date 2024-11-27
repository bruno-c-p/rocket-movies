export const up = (knex) =>
  knex.schema.createTable("movie_tags", (table) => {
    table.increments("id");
    table.text("name");
    table
      .integer("movie_notes_id")
      .references("id")
      .inTable("movie_notes")
      .onDelete("CASCADE");
  });

export const down = (knex) => knex.schema.dropTable("movie_tags");
