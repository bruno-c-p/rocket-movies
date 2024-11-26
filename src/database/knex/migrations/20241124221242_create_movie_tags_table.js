export const up = (knex) =>
  knex.schema.createTable("movie_tags", (table) => {
    table.increments("id");
    table.text("name");
    table.integer("user_id").references("id").inTable("users");
    table
      .integer("movie_id")
      .references("id")
      .inTable("movie_notes")
      .onDelete("CASCADE");
  });

export const down = (knex) => knex.schema.dropTable("movie_tags");
