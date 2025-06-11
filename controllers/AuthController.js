const Boom = require('@hapi/boom');
const UserModel = require('../models/UserModel');
const UmkmModel = require('../models/UmkmModel');
const { generateToken } = require('../helpers/auth');

class AuthController {
  static async register(request, h) {
    try {
      const { nama, no_telp, username, password, umkm } = request.payload;

      // Check if username already exists
      const existingUser = await UserModel.findByUsername(username);
      if (existingUser) {
        throw Boom.conflict('Username sudah digunakan');
      }

      // Create UMKM first
      const newUmkm = await UmkmModel.create(umkm);

      // Create User
      const userData = {
        id_umkm: newUmkm.id_umkm,
        nama,
        no_telp,
        username,
        password
      };

      const newUser = await UserModel.create(userData);

      // Remove password from response
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
      if (error.isBoom) {
        throw error;
      }
      throw Boom.internal('Terjadi kesalahan server');
    }
  }

  static async login(request, h) {
    try {
      const { username, password } = request.payload;

      // Find user
      const user = await UserModel.findByUsername(username);
      if (!user) {
        throw Boom.unauthorized('Username atau password salah');
      }

      // Verify password
      const isValidPassword = await UserModel.verifyPassword(password, user.password);
      if (!isValidPassword) {
        throw Boom.unauthorized('Username atau password salah');
      }

      // Generate token
      const tokenPayload = {
        id_user: user.id_user,
        id_umkm: user.id_umkm,
        username: user.username,
        nama: user.nama
      };

      const token = generateToken(tokenPayload);

      // Remove password from response
      delete user.password;

      return h.response({
        status: 'success',
        message: 'Login berhasil',
        data: {
          user,
          token
        }
      });

    } catch (error) {
      if (error.isBoom) {
        throw error;
      }
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
      if (error.isBoom) {
        throw error;
      }
      throw Boom.internal('Terjadi kesalahan server');
    }
  }
}

module.exports = AuthController;