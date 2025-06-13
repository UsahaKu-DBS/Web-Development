const Boom = require('@hapi/boom');
const UserModel = require('../models/UserModel');

class UserController {
  static async connectUmkm(request, h) {
    try {
      const { id_user } = request.params;
      const { id_umkm } = request.payload;

      const user = await UserModel.findById(id_user);
      if (!user) {
        throw Boom.notFound('User tidak ditemukan');
      }

      await UserModel.update(id_user, { id_umkm });

      return h.response({ message: 'UMKM berhasil dihubungkan ke user' }).code(200);
    } catch (error) {
      console.error(error);
      throw Boom.internal('Terjadi kesalahan server saat menghubungkan UMKM ke user');
    }
  }
}

module.exports = UserController;
