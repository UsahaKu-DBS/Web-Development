const db = require('../config/database');

class TransaksiModel {
  static async create(data) {
    const [id] = await db('transaksi').insert(data);
    return await this.findById(id);
  }

  static async findById(id) {
    return await db('transaksi')
      .select(
        'transaksi.*',
        'kategori_transaksi.nama_kategori',
        'kategori_transaksi.jenis',
        'users.nama as created_by_name'
      )
      .leftJoin('kategori_transaksi', 'transaksi.id_kategori', 'kategori_transaksi.id_kategori')
      .leftJoin('users', 'transaksi.created_by', 'users.id_user')
      .where('transaksi.id_transaksi', id)
      .first();
  }

  static async findByUmkm(id_umkm, filters = {}) {
    let query = db('transaksi')
      .select(
        'transaksi.*',
        'kategori_transaksi.nama_kategori',
        'kategori_transaksi.jenis',
        'users.nama as created_by_name'
      )
      .leftJoin('kategori_transaksi', 'transaksi.id_kategori', 'kategori_transaksi.id_kategori')
      .leftJoin('users', 'transaksi.created_by', 'users.id_user')
      .where('transaksi.id_umkm', id_umkm);

    if (filters.tanggal_mulai && filters.tanggal_selesai) {
      query = query.whereBetween('transaksi.tanggal_transaksi', [filters.tanggal_mulai, filters.tanggal_selesai]);
    }

    if (filters.jenis) {
      query = query.where('kategori_transaksi.jenis', filters.jenis);
    }

    return await query.orderBy('transaksi.tanggal_transaksi', 'desc');
  }

  static async findAll() {
    return await db('transaksi')
      .select(
        'transaksi.*',
        'kategori_transaksi.nama_kategori',
        'kategori_transaksi.jenis',
        'users.nama as created_by_name',
        'umkm.nama_umkm'
      )
      .leftJoin('kategori_transaksi', 'transaksi.id_kategori', 'kategori_transaksi.id_kategori')
      .leftJoin('users', 'transaksi.created_by', 'users.id_user')
      .leftJoin('umkm', 'transaksi.id_umkm', 'umkm.id_umkm')
      .orderBy('transaksi.tanggal_transaksi', 'desc');
  }

  static async update(id, data) {
    await db('transaksi').where('id_transaksi', id).update(data);
    return await this.findById(id);
  }

  static async delete(id) {
    return await db('transaksi').where('id_transaksi', id).del();
  }

  // Method untuk laporan
  static async getRekapByUmkm(id_umkm, filters = {}) {
    let query = db('transaksi')
      .select(
        db.raw('SUM(CASE WHEN kategori_transaksi.jenis = "pemasukan" THEN transaksi.jumlah ELSE 0 END) as total_pemasukan'),
        db.raw('SUM(CASE WHEN kategori_transaksi.jenis = "pengeluaran" THEN transaksi.jumlah ELSE 0 END) as total_pengeluaran'),
        db.raw('SUM(CASE WHEN kategori_transaksi.jenis = "pemasukan" THEN transaksi.jumlah ELSE -transaksi.jumlah END) as saldo_bersih')
      )
      .leftJoin('kategori_transaksi', 'transaksi.id_kategori', 'kategori_transaksi.id_kategori')
      .where('transaksi.id_umkm', id_umkm);

    if (filters.tanggal_mulai && filters.tanggal_selesai) {
      query = query.whereBetween('transaksi.tanggal_transaksi', [filters.tanggal_mulai, filters.tanggal_selesai]);
    }

    return await query.first();
  }
}

module.exports = TransaksiModel;