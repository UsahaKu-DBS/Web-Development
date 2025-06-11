const TransaksiController = require('../controllers/TransaksiController');
const { transaksiSchema, updateTransaksiSchema } = require('../validations/schemas');

const transaksiRoutes = [
  {
    method: 'POST',
    path: '/api/transaksi',
    handler: TransaksiController.create,
    options: {
      auth: 'jwt',
      validate: {
        payload: transaksiSchema
      }
    }
  },
  {
    method: 'GET',
    path: '/api/transaksi',
    handler: TransaksiController.getAll,
    options: {
      auth: 'jwt'
    }
  },
  {
    method: 'GET',
    path: '/api/transaksi/{id}',
    handler: TransaksiController.getById,
    options: {
      auth: 'jwt'
    }
  },
  {
    method: 'PUT',
    path: '/api/transaksi/{id}',
    handler: TransaksiController.update,
    options: {
      auth: 'jwt',
      validate: {
        payload: updateTransaksiSchema
      }
    }
  },
  {
    method: 'DELETE',
    path: '/api/transaksi/{id}',
    handler: TransaksiController.delete,
    options: {
      auth: 'jwt'
    }
  }
];

module.exports = transaksiRoutes;