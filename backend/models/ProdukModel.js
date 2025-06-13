const db = require('../config/database');

class ProdukModel {
  static async create(data) {
    const [id] = await db('produk').insert(data);
    return await this.findById(id);
  }

  static async findById(id) {
    return await db('produk')
      .select('produk.*', 'users.nama as created_by_name')
      .leftJoin('users', 'produk.created_by', 'users.id_user')
      .where('produk.id_produk', id)
      .first();
  }

  static async findByUmkm(id_umkm) {
    return await db('produk')
      .select('produk.*', 'users.nama as created_by_name')
      .leftJoin('users', 'produk.created_by', 'users.id_user')
      .where('produk.id_umkm', id_umkm);
  }

  static async findAll() {
    return await db('produk')
      .select('produk.*', 'users.nama as created_by_name', 'umkm.nama_umkm')
      .leftJoin('users', 'produk.created_by', 'users.id_user')
      .leftJoin('umkm', 'produk.id_umkm', 'umkm.id_umkm');
  }

  static async update(id, data) {
    await db('produk').where('id_produk', id).update(data);
    return await this.findById(id);
  }

  static async delete(id) {
    return await db('produk').where('id_produk', id).del();
  }

  static async updateStok(id, jumlah) {
    await db('produk')
      .where('id_produk', id)
      .increment('stok_tersedia', jumlah);
    return await this.findById(id);
  }
}

module.exports = ProdukModel;