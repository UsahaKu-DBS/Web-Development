const db = require('../config/database');

class UmkmModel {
  static async create(data) {
    const [id] = await db('umkm').insert(data);
    return await this.findById(id);
  }

  static async findById(id) {
    return await db('umkm').where('id_umkm', id).first();
  }

  static async findAll() {
    return await db('umkm').select('*');
  }

  static async update(id, data) {
    await db('umkm').where('id_umkm', id).update(data);
    return await this.findById(id);
  }

  static async delete(id) {
    return await db('umkm').where('id_umkm', id).del();
  }
}

module.exports = UmkmModel;