const KategoriTransaksiController = require('../controllers/KategoriTransaksiController');
const { kategoriTransaksiSchema } = require('../validations/schemas');

const kategoriTransaksiRoutes = [
  {
    method: 'POST',
    path: '/api/kategori-transaksi',
    handler: KategoriTransaksiController.create,
    options: {
      auth: 'jwt',
      validate: {
        payload: kategoriTransaksiSchema
      }
    }
  },
  {
    method: 'GET',
    path: '/api/kategori-transaksi',
    handler: KategoriTransaksiController.getAll,
    options: {
      auth: 'jwt'
    }
  },
  {
    method: 'GET',
    path: '/api/kategori-transaksi/{id}',
    handler: KategoriTransaksiController.getById,
    options: {
      auth: 'jwt'
    }
  },
  {
    method: 'PUT',
    path: '/api/kategori-transaksi/{id}',
    handler: KategoriTransaksiController.update,
    options: {
      auth: 'jwt',
      validate: {
        payload: kategoriTransaksiSchema
      }
    }
  },
  {
    method: 'DELETE',
    path: '/api/kategori-transaksi/{id}',
    handler: KategoriTransaksiController.delete,
    options: {
      auth: 'jwt'
    }
  },
  {
    method: 'POST',
    path: '/api/kategori-transaksi/default',
    handler: KategoriTransaksiController.createDefaultCategories,
    options: {
      auth: 'jwt'
    }
  }
];

module.exports = kategoriTransaksiRoutes;