exports.up = function(knex) {
  return knex.schema.createTable('produk', function(table) {
    table.increments('id_produk').primary();
    table.integer('id_umkm').unsigned().references('id_umkm').inTable('umkm').onDelete('CASCADE');
    table.string('nama_produk', 255).notNullable();
    table.decimal('harga_beli', 12, 2).notNullable();
    table.decimal('harga_jual', 12, 2).notNullable();
    table.integer('stok_awal').defaultTo(0);
    table.integer('stok_tersedia').defaultTo(0);
    table.string('kategori', 100);
    table.text('deskripsi');
    table.integer('created_by').unsigned().references('id_user').inTable('users');
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('produk');
};