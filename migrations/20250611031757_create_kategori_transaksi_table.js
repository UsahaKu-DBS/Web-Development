exports.up = function(knex) {
  return knex.schema.createTable('kategori_transaksi', function(table) {
    table.increments('id_kategori').primary();
    table.integer('id_umkm').unsigned().references('id_umkm').inTable('umkm').onDelete('CASCADE');
    table.string('nama_kategori', 100).notNullable();
    table.enum('jenis', ['pemasukan', 'pengeluaran']).notNullable();
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('kategori_transaksi');
};