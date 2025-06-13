const db = require('../config/database');

class KategoriTransaksiModel {
  static async create(data) {
    const [id] = await db('kategori_transaksi').insert(data);
    return await this.findById(id);
  }

  static async findById(id) {
    return await db('kategori_transaksi').where('id_kategori', id).first();
  }

  static async findByUmkm(id_umkm) {
    return await db('kategori_transaksi').where('id_umkm', id_umkm);
  }

  static async findAll() {
    return await db('kategori_transaksi')
      .select('kategori_transaksi.*', 'umkm.nama_umkm')
      .leftJoin('umkm', 'kategori_transaksi.id_umkm', 'umkm.id_umkm');
  }

  static async update(id, data) {
    await db('kategori_transaksi').where('id_kategori', id).update(data);
    return await this.findById(id);
  }

  static async delete(id) {
    return await db('kategori_transaksi').where('id_kategori', id).del();
  }
}

module.exports = KategoriTransaksiModel;