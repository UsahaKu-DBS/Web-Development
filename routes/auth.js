const AuthController = require('../controllers/AuthController');
const { registerSchema, loginSchema } = require('../validations/schemas');

const authRoutes = [
  {
    method: 'POST',
    path: '/api/auth/register',
    handler: AuthController.register,
    options: {
      auth: false, 
      validate: {
        payload: registerSchema
      }
    }
  },
  {
    method: 'POST',
    path: '/api/auth/login',
    handler: AuthController.login,
    options: {
      validate: {
        payload: loginSchema
      }
    }
  },
  {
    method: 'GET',
    path: '/api/auth/profile',
    handler: AuthController.getProfile,
    options: {
      auth: 'jwt'
    }
  }
];

module.exports = authRoutes;