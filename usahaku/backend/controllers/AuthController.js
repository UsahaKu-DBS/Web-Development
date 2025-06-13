const Boom = require('@hapi/boom');
const UserModel = require('../models/UserModel');
const UmkmModel = require('../models/UmkmModel');

class AuthController {
  static async register(request, h) {
    try {
      const { nama_lengkap, no_telp, username, password, email, umkm } = request.payload;

      // Cek username
      const existingUser = await UserModel.findByUsername(username);
      if (existingUser) {
        throw Boom.conflict('Username sudah digunakan');
      }

      // Buat UMKM
      const newUmkm = await UmkmModel.create(umkm);

      // Buat User
      const userData = {
        id_umkm: newUmkm.id_umkm,
        nama_lengkap,
        no_telp,
        username,
        email,
        password
      };

      const newUser = await UserModel.create(userData);
      delete newUser.password;

      return h.response({
        status: 'success',
        message: 'Registrasi berhasil',
        data: {
          user: newUser,
          umkm: newUmkm
        }
      }).code(201);

    } catch (error) {
      if (error.isBoom) throw error;
      console.error(error);
      throw Boom.internal('Terjadi kesalahan server');
    }
  }

  static async login(request, h) {
    try {
      const { username, password } = request.payload;

      const user = await UserModel.findByUsername(username);
      if (!user) {
        throw Boom.unauthorized('Username atau password salah');
      }

      const isValid = await UserModel.verifyPassword(password, user.password);
      if (!isValid) {
        throw Boom.unauthorized('Username atau password salah');
      }

      // Set session cookie
      request.cookieAuth.set({
        id_user: user.id_user
      });

      delete user.password;

      return h
      .response({ message: 'Login berhasil', user })
      .state('credentials', { id_user: user.id, nama: user.nama }, {
        isSecure: false, // HARUS false jika localhost tanpa HTTPS
        isHttpOnly: true,
        path: '/',
        ttl: 24 * 60 * 60 * 1000 // 1 hari
      });

    } catch (error) {
      if (error.isBoom) throw error;
      console.error(error);
      throw Boom.internal('Terjadi kesalahan server');
    }
  }

  static async getProfile(request, h) {
    try {
      const { id_user } = request.auth.credentials;

      const user = await UserModel.findById(id_user);
      if (!user) {
        throw Boom.notFound('User tidak ditemukan');
      }

      delete user.password;

      return h.response({
        status: 'success',
        data: { user }
      });

    } catch (error) {
      if (error.isBoom) throw error;
      console.error(error);
      throw Boom.internal('Terjadi kesalahan server');
    }
  }
}

module.exports = AuthController;
