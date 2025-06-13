const Boom = require('@hapi/boom');
const UmkmModel = require('../models/UmkmModel');

class UmkmController {
  static async create(request, h) {
    try {
      const umkmData = request.payload;
      const newUmkm = await UmkmModel.create(umkmData);
      return h.response(newUmkm).code(201);
    } catch (error) {
      console.error(error);
      throw Boom.internal('Terjadi kesalahan server saat membuat UMKM');
    }
  }
}

module.exports = UmkmController;
