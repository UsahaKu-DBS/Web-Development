const db = require('../config/database');
const bcrypt = require('bcryptjs');

class UserModel {
  static async create(data) {
    // Hash password
    data.password = await bcrypt.hash(data.password, 10);
    
    const [id] = await db('users').insert(data);
    return await this.findById(id);
  }

  static async findById(id) {
    return await db('users')
      .select('users.*', 'umkm.nama_umkm')
      .leftJoin('umkm', 'users.id_umkm', 'umkm.id_umkm')
      .where('users.id_user', id)
      .first();
  }

  static async findByUsername(username) {
    return await db('users')
      .select('users.*', 'umkm.nama_umkm')
      .leftJoin('umkm', 'users.id_umkm', 'umkm.id_umkm')
      .where('users.username', username)
      .first();
  }

  static async findAll() {
    return await db('users')
      .select('users.*', 'umkm.nama_umkm')
      .leftJoin('umkm', 'users.id_umkm', 'umkm.id_umkm');
  }

  static async update(id, data) {
    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }
    
    await db('users').where('id_user', id).update(data);
    return await this.findById(id);
  }

  static async delete(id) {
    return await db('users').where('id_user', id).del();
  }

  static async verifyPassword(plainPassword, hashedPassword) {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }
}

module.exports = UserModel;
