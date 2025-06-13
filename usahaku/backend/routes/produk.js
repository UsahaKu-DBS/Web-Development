const ProdukController = require('../controllers/ProdukController');
const { produkSchema } = require('../validations/schemas');

const produkRoutes = [
  {
    method: 'POST',
    path: '/api/produk',
    handler: ProdukController.create,
    options: {
      auth: 'jwt',
      validate: {
        payload: produkSchema
      }
    }
  },
  {
    method: 'GET',
    path: '/api/produk',
    handler: ProdukController.getAll,
    options: {
      auth: 'jwt'
    }
  },
  {
    method: 'GET',
    path: '/api/produk/{id}',
    handler: ProdukController.getById,
    options: {
      auth: 'jwt'
    }
  },
  {
    method: 'PUT',
    path: '/api/produk/{id}',
    handler: ProdukController.update,
    options: {
      auth: 'jwt',
      validate: {
        payload: produkSchema
      }
    }
  },
  {
    method: 'DELETE',
    path: '/api/produk/{id}',
    handler: ProdukController.delete,
    options: {
      auth: 'jwt'
    }
  }
];

module.exports = produkRoutes;