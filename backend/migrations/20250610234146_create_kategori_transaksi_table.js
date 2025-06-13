/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('kategori_transaksi', function(table) {
        table.increments('id_kategori').primary();
        table.integer('id_umkm').unsigned().references('id_umkm').inTable('umkm').onDelete('CASCADE');
        table.string('nama_kategori').notNullable();
        table.enu('jenis', ['pemasukan', 'pengeluaran']).notNullable();
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  
};
