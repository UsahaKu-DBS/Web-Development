const Boom = require('@hapi/boom');
const TransaksiModel = require('../models/TransaksiModel');
const KategoriTransaksiModel = require('../models/KategoriTransaksiModel');
const ProdukModel = require('../models/ProdukModel');
const db = require('../config/database');

class TransaksiController {
  static async create(request, h) {
    const trx = await db.transaction();
    
    try {
      const { id_umkm, id_user } = request.auth.credentials;
      const { detail_produk, ...transaksiData } = request.payload;

      // Validate kategori belongs to UMKM
      const kategori = await KategoriTransaksiModel.findById(transaksiData.id_kategori);
      if (!kategori || kategori.id_umkm !== id_umkm) {
        throw Boom.badRequest('Kategori transaksi tidak valid');
      }

      const data = {
        ...transaksiData,
        id_umkm,
        created_by: id_user
      };

      // Create transaksi
      const [id_transaksi] = await trx('transaksi').insert(data);

      // If there are product details, process them
      if (detail_produk && detail_produk.length > 0) {
        for (const detail of detail_produk) {
          // Validate produk belongs to UMKM
          const produk = await ProdukModel.findById(detail.id_produk);
          if (!produk || produk.id_umkm !== id_umkm) {
            throw Boom.badRequest(`Produk dengan ID ${detail.id_produk} tidak valid`);
          }

          // Calculate total harga
          const total_harga = detail.jumlah_produk * detail.harga_satuan;

          // Insert detail transaksi produk
          await trx('detail_transaksi_produk').insert({
            id_transaksi,
            id_produk: detail.id_produk,
            jumlah_produk: detail.jumlah_produk,
            harga_satuan: detail.harga_satuan,
            total_harga
          });

          // Update stok produk (kurangi stok jika penjualan, tambah jika pembelian)
          if (kategori.jenis === 'pemasukan') {
            // Penjualan - kurangi stok
            await trx('produk')
              .where('id_produk', detail.id_produk)
              .decrement('stok_tersedia', detail.jumlah_produk);
          } else if (kategori.jenis === 'pengeluaran' && kategori.nama_kategori.toLowerCase().includes('beli')) {
            // Pembelian - tambah stok
            await trx('produk')
              .where('id_produk', detail.id_produk)
              .increment('stok_tersedia', detail.jumlah_produk);
          }
        }
      }

      await trx.commit();

      // Get complete transaksi data
      const transaksi = await TransaksiModel.findById(id_transaksi);

      return h.response({
        status: 'success',
        message: 'Transaksi berhasil ditambahkan',
        data: { transaksi }
      }).code(201);

    } catch (error) {
      await trx.rollback();
      if (error.isBoom) {
        throw error;
      }
      throw Boom.internal('Terjadi kesalahan server');
    }
  }

  static async getAll(request, h) {
    try {
      const { id_umkm } = request.auth.credentials;
      const { tanggal_mulai, tanggal_selesai, jenis } = request.query;

      const filters = {};
      if (tanggal_mulai && tanggal_selesai) {
        filters.tanggal_mulai = tanggal_mulai;
        filters.tanggal_selesai = tanggal_selesai;
      }
      if (jenis) {
        filters.jenis = jenis;
      }

      const transaksi = await TransaksiModel.findByUmkm(id_umkm, filters);

      return h.response({
        status: 'success',
        data: { 
          transaksi,
          total: transaksi.length 
        }
      });

    } catch (error) {
      throw Boom.internal('Terjadi kesalahan server');
    }
  }

  static async getById(request, h) {
    try {
      const { id } = request.params;
      const { id_umkm } = request.auth.credentials;

      const transaksi = await TransaksiModel.findById(id);
      if (!transaksi || transaksi.id_umkm !== id_umkm) {
        throw Boom.notFound('Transaksi tidak ditemukan');
      }

      // Get detail produk if exists
      const detailProduk = await db('detail_transaksi_produk')
        .select(
          'detail_transaksi_produk.*',
          'produk.nama_produk'
        )
        .leftJoin('produk', 'detail_transaksi_produk.id_produk', 'produk.id_produk')
        .where('detail_transaksi_produk.id_transaksi', id);

      return h.response({
        status: 'success',
        data: { 
          transaksi,
          detail_produk: detailProduk
        }
      });

    } catch (error) {
      if (error.isBoom) {
        throw error;
      }
      throw Boom.internal('Terjadi kesalahan server');
    }
  }

  static async update(request, h) {
    const trx = await db.transaction();
    
    try {
      const { id } = request.params;
      const { id_umkm } = request.auth.credentials;
      const { detail_produk, ...transaksiData } = request.payload;

      // Check if transaksi exists and belongs to user's UMKM
      const existingTransaksi = await TransaksiModel.findById(id);
      if (!existingTransaksi || existingTransaksi.id_umkm !== id_umkm) {
        throw Boom.notFound('Transaksi tidak ditemukan');
      }

      // Validate kategori if changed
      if (transaksiData.id_kategori) {
        const kategori = await KategoriTransaksiModel.findById(transaksiData.id_kategori);
        if (!kategori || kategori.id_umkm !== id_umkm) {
          throw Boom.badRequest('Kategori transaksi tidak valid');
        }
      }

      // Update transaksi
      await trx('transaksi').where('id_transaksi', id).update(transaksiData);

      // Handle detail produk updates if provided
      if (detail_produk !== undefined) {
        // Remove existing detail produk
        await trx('detail_transaksi_produk').where('id_transaksi', id).del();

        // Add new detail produk
        if (detail_produk.length > 0) {
          for (const detail of detail_produk) {
            const total_harga = detail.jumlah_produk * detail.harga_satuan;

            await trx('detail_transaksi_produk').insert({
              id_transaksi: id,
              id_produk: detail.id_produk,
              jumlah_produk: detail.jumlah_produk,
              harga_satuan: detail.harga_satuan,
              total_harga
            });
          }
        }
      }

      await trx.commit();

      const transaksi = await TransaksiModel.findById(id);

      return h.response({
        status: 'success',
        message: 'Transaksi berhasil diperbarui',
        data: { transaksi }
      });

    } catch (error) {
      await trx.rollback();
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

      // Check if transaksi exists and belongs to user's UMKM
      const existingTransaksi = await TransaksiModel.findById(id);
      if (!existingTransaksi || existingTransaksi.id_umkm !== id_umkm) {
        throw Boom.notFound('Transaksi tidak ditemukan');
      }

      await TransaksiModel.delete(id);

      return h.response({
        status: 'success',
        message: 'Transaksi berhasil dihapus'
      });

    } catch (error) {
      if (error.isBoom) {
        throw error;
      }
      throw Boom.internal('Terjadi kesalahan server');
    }
  }
}

module.exports = TransaksiController;