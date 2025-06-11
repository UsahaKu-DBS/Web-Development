exports.up = function(knex) {
  return knex.schema.createTable('users', function(table) {
    table.increments('id_user').primary();
    table.integer('id_umkm').unsigned().references('id_umkm').inTable('umkm').onDelete('CASCADE');
    table.string('username', 50).unique().notNullable();
    table.string('password', 255).notNullable();
    table.string('nama', 100).notNullable();
    table.string('no_telp', 20).notNullable();
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('users');
};