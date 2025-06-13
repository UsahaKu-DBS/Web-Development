/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('umkm', function(table) {
    table.increments('id_umkm').primary();
    table.string('nama_umkm').notNullable();
    table.string('alamat');
    table.string('no_telp', 20);
    table.string('jenis_usaha');
    table.integer('tahun_berdiri');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  
};
