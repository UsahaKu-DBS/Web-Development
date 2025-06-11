const Hapi = require('@hapi/hapi');
const Jwt = require('@hapi/jwt');
const { verifyToken } = require('./helpers/auth');
require('dotenv').config();

// Import routes
const authRoutes = require('./routes/auth');
const produkRoutes = require('./routes/produk');
const kategoriTransaksiRoutes = require('./routes/kategoriTransaksi');
const transaksiRoutes = require('./routes/transaksi');
const laporanRoutes = require('./routes/laporan');
const dashboardRoutes = require('./routes/dashboard');

const init = async () => {
  const server = Hapi.server({
    port: process.env.PORT || 3000,
    host: 'localhost',
    routes: {
      cors: {
        origin: ['*'],
        headers: ['Accept', 'Authorization', 'Content-Type', 'If-None-Match'],
        additionalHeaders: ['X-Requested-With']
      }
    }
  });

  // Register JWT plugin
  await server.register(Jwt);

  // JWT authentication strategy
  server.auth.strategy('jwt', 'jwt', {
    keys: process.env.JWT_SECRET,
    verify: {
      aud: false,
      iss: false,
      sub: false,
      nbf: false,
      exp: false,
      maxAgeSec: 14400, // 4 hours
      timeSkewSec: 15
    },
    validate: async (artifacts, request) => {
      try {
        const payload = verifyToken(artifacts.token);
        return {
          isValid: true,
          credentials: payload
        };
      } catch (error) {
        return {
          isValid: false
        };
      }
    }
  });

//   server.auth.default('jwt');

  // Add routes
  server.route([
    ...authRoutes,
    ...produkRoutes,
    ...kategoriTransaksiRoutes,
    ...transaksiRoutes,
    ...laporanRoutes,
    ...dashboardRoutes,
    // Root endpoint
    {
      method: 'GET',
      path: '/',
      handler: (request, h) => {
        return {
          message: 'Usahaku API Server',
          version: '1.0.0',
          status: 'running',
          endpoints: {
            auth: '/api/auth/*',
            produk: '/api/produk/*',
            kategori_transaksi: '/api/kategori-transaksi/*',
            transaksi: '/api/transaksi/*',
            laporan: '/api/laporan/*',
            dashboard: '/api/dashboard/*'
          }
        };
      },
      options: {
        auth: false
      }
    }
  ]);

  await server.start();
  console.log(`Server running on ${server.info.uri}`);
};

process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
});

init();