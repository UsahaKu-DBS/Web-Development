const Boom = require('@hapi/boom');
const ProdukModel = require('../models/ProdukModel');

class ProdukController {
  static async create(request, h) {
    try {
      const { id_umkm, id_user } = request.auth.credentials;
      const data = {
        ...request.payload,
        id_umkm,
        created_by: id_user
      };

      const produk = await ProdukModel.create(data);

      return h.response({
        status: 'success',
        message: 'Produk berhasil ditambahkan',
        data: { produk }
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
      const produk = await ProdukModel.findByUmkm(id_umkm);

      return h.response({
        status: 'success',
        data: { produk }
      });

    } catch (error) {
      throw Boom.internal('Terjadi kesalahan server');
    }
  }

  static async getById(request, h) {
    try {
      const { id } = request.params;
      const { id_umkm } = request.auth.credentials;

      const produk = await ProdukModel.findById(id);
      if (!produk || produk.id_umkm !== id_umkm) {
        throw Boom.notFound('Produk tidak ditemukan');
      }

      return h.response({
        status: 'success',
        data: { produk }
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

      // Check if produk exists and belongs to user's UMKM
      const existingProduk = await ProdukModel.findById(id);
      if (!existingProduk || existingProduk.id_umkm !== id_umkm) {
        throw Boom.notFound('Produk tidak ditemukan');
      }

      const produk = await ProdukModel.update(id, request.payload);

      return h.response({
        status: 'success',
        message: 'Produk berhasil diperbarui',
        data: { produk }
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

      // Check if produk exists and belongs to user's UMKM
      const existingProduk = await ProdukModel.findById(id);
      if (!existingProduk || existingProduk.id_umkm !== id_umkm) {
        throw Boom.notFound('Produk tidak ditemukan');
      }

      await ProdukModel.delete(id);

      return h.response({
        status: 'success',
        message: 'Produk berhasil dihapus'
      });

    } catch (error) {
      if (error.isBoom) {
        throw error;
      }
      throw Boom.internal('Terjadi kesalahan server');
    }
  }
}

module.exports = ProdukController;