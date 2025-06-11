exports.up = function(knex) {
  return knex.schema.createTable('detail_transaksi_produk', function(table) {
    table.increments('id_detail').primary();
    table.integer('id_transaksi').unsigned().references('id_transaksi').inTable('transaksi').onDelete('CASCADE');
    table.integer('id_produk').unsigned().references('id_produk').inTable('produk');
    table.integer('jumlah_produk').notNullable();
    table.decimal('harga_satuan', 12, 2).notNullable();
    table.decimal('total_harga', 12, 2).notNullable();
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('detail_transaksi_produk');
};