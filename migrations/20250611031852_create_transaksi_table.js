exports.up = function(knex) {
  return knex.schema.createTable('transaksi', function(table) {
    table.increments('id_transaksi').primary();
    table.integer('id_umkm').unsigned().references('id_umkm').inTable('umkm').onDelete('CASCADE');
    table.date('tanggal_transaksi').notNullable();
    table.integer('id_kategori').unsigned().references('id_kategori').inTable('kategori_transaksi');
    table.decimal('jumlah', 12, 2).notNullable();
    table.text('keterangan');
    table.integer('created_by').unsigned().references('id_user').inTable('users');
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('transaksi');
};