const UmkmController = require('../controllers/UmkmController');

const umkmRoutes = [
  {
    method: 'POST',
    path: '/api/umkm',
    handler: UmkmController.create,
    options: {
      auth: false
    }
  }
];

module.exports = umkmRoutes;
