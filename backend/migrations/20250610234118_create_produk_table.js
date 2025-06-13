/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
   return knex.schema.createTable('produk', function(table) {
    table.increments('id_produk').primary();
    table.integer('id_umkm').unsigned().references('id_umkm').inTable('umkm').onDelete('CASCADE');
    table.string('nama_produk').notNullable();
    table.decimal('harga_beli', 12, 2);
    table.decimal('harga_jual', 12, 2);
    table.integer('stok_awal');
    table.integer('stok_tersedia');
    table.string('kategori');
    table.text('deskripsi');
    table.integer('created_by').unsigned().references('id_user').inTable('users').onDelete('SET NULL');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  
};
