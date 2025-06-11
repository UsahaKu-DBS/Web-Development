exports.up = function(knex) {
  return knex.schema.createTable('umkm', function(table) {
    table.increments('id_umkm').primary();
    table.string('nama_umkm', 255).notNullable();
    table.text('alamat').notNullable();
    table.string('no_telp', 20).notNullable();
    table.string('jenis_usaha', 100).notNullable();
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('umkm');
};
