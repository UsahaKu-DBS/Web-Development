const UserController = require('../controllers/UserController');

const userRoutes = [
  {
    method: 'PUT',
    path: '/api/users/{id_user}/connect-umkm',
    handler: UserController.connectUmkm,
    options: {
      auth: false,
      cors: true
    }
  }
];

module.exports = userRoutes;
