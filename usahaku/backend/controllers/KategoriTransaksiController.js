const Boom = require('@hapi/boom');
const KategoriTransaksiModel = require('../models/KategoriTransaksiModel');

class KategoriTransaksiController {
  static async create(request, h) {
    try {
      const { id_umkm } = request.auth.credentials;
      const data = {
        ...request.payload,
        id_umkm
      };

      const kategori = await KategoriTransaksiModel.create(data);

      return h.response({
        status: 'success',
        message: 'Kategori transaksi berhasil ditambahkan',
        data: { kategori }
      }).code(201);

    } catch (error) {
      if (error.isBoom) {
        throw error;
      }
      throw Boom.internal('Terjadi kesalahan server');
    }
  }

  static async getAll(request, h) {
    try {
      const { id_umkm } = request.auth.credentials;
      const kategori = await KategoriTransaksiModel.findByUmkm(id_umkm);

      return h.response({
        status: 'success',
        data: { kategori }
      });

    } catch (error) {
      throw Boom.internal('Terjadi kesalahan server');
    }
  }

  static async getById(request, h) {
    try {
      const { id } = request.params;
      const { id_umkm } = request.auth.credentials;

      const kategori = await KategoriTransaksiModel.findById(id);
      if (!kategori || kategori.id_umkm !== id_umkm) {
        throw Boom.notFound('Kategori tidak ditemukan');
      }

      return h.response({
        status: 'success',
        data: { kategori }
      });

    } catch (error) {
      if (error.isBoom) {
        throw error;
      }
      throw Boom.internal('Terjadi kesalahan server');
    }
  }

  static async update(request, h) {
    try {
      const { id } = request.params;
      const { id_umkm } = request.auth.credentials;

      // Check if kategori exists and belongs to user's UMKM
      const existingKategori = await KategoriTransaksiModel.findById(id);
      if (!existingKategori || existingKategori.id_umkm !== id_umkm) {
        throw Boom.notFound('Kategori tidak ditemukan');
      }

      const kategori = await KategoriTransaksiModel.update(id, request.payload);

      return h.response({
        status: 'success',
        message: 'Kategori berhasil diperbarui',
        data: { kategori }
      });

    } catch (error) {
      if (error.isBoom) {
        throw error;
      }
      throw Boom.internal('Terjadi kesalahan server');
    }
  }

  static async delete(request, h) {
    try {
      const { id } = request.params;
      const { id_umkm } = request.auth.credentials;

      // Check if kategori exists and belongs to user's UMKM
      const existingKategori = await KategoriTransaksiModel.findById(id);
      if (!existingKategori || existingKategori.id_umkm !== id_umkm) {
        throw Boom.notFound('Kategori tidak ditemukan');
      }

      await KategoriTransaksiModel.delete(id);

      return h.response({
        status: 'success',
        message: 'Kategori berhasil dihapus'
      });

    } catch (error) {
      if (error.isBoom) {
        throw error;
      }
      throw Boom.internal('Terjadi kesalahan server');
    }
  }

  static async createDefaultCategories(request, h) {
    try {
      const { id_umkm } = request.auth.credentials;

      const defaultCategories = [
        { nama_kategori: 'Penjualan Produk', jenis: 'pemasukan', id_umkm },
        { nama_kategori: 'Penjualan Jasa', jenis: 'pemasukan', id_umkm },
        { nama_kategori: 'Pendapatan Lain', jenis: 'pemasukan', id_umkm },
        { nama_kategori: 'Pembelian Bahan Baku', jenis: 'pengeluaran', id_umkm },
        { nama_kategori: 'Biaya Operasional', jenis: 'pengeluaran', id_umkm },
        { nama_kategori: 'Biaya Transport', jenis: 'pengeluaran', id_umkm },
        { nama_kategori: 'Biaya Listrik & Air', jenis: 'pengeluaran', id_umkm },
        { nama_kategori: 'Pengeluaran Lain', jenis: 'pengeluaran', id_umkm }
      ];

      const createdCategories = [];
      for (const category of defaultCategories) {
        const created = await KategoriTransaksiModel.create(category);
        createdCategories.push(created);
      }

      return h.response({
        status: 'success',
        message: 'Kategori default berhasil dibuat',
        data: { kategori: createdCategories }
      }).code(201);

    } catch (error) {
      throw Boom.internal('Terjadi kesalahan server');
    }
  }
}

module.exports = KategoriTransaksiController;