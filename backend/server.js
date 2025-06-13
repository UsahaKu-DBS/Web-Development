const Hapi = require('@hapi/hapi');
const Jwt = require('@hapi/jwt');
const Cookie = require('@hapi/cookie');
const { verifyToken } = require('./helpers/auth');
require('dotenv').config();

// Import routes
const authRoutes = require('./routes/auth');
const produkRoutes = require('./routes/produk');
const kategoriTransaksiRoutes = require('./routes/kategoriTransaksi');
const transaksiRoutes = require('./routes/transaksi');
const laporanRoutes = require('./routes/laporan');
const dashboardRoutes = require('./routes/dashboard');
const umkmRoutes = require('./routes/umkm');
const usersRoutes = require('./routes/users');

const init = async () => {
  const server = Hapi.server({
    port: process.env.PORT || 3001,
    host: 'localhost',
    routes: {
      cors: {
        origin: ['http://localhost:5173'],
        credentials: true,
        headers: ['Accept', 'Authorization', 'Content-Type', 'If-None-Match'],
        additionalHeaders: ['X-Requested-With']
      }
    }
  });

  // Register plugins
  await server.register([Jwt, Cookie]);

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

  // Cookie authentication strategy
  server.auth.strategy('session', 'cookie', {
    cookie: {
      name: 'credentials',
      password: process.env.COOKIE_PASSWORD || 'a-very-strong-password-that-is-at-least-32-characters',
      isSecure: false, // Should be true in production with HTTPS
      isHttpOnly: true,
      path: '/',
      ttl: 24 * 60 * 60 * 1000 // 1 day
    },
    redirectTo: false,
    validate: async (request, session) => {
      // Optionally validate session here
      return { valid: true, credentials: session };
    }
  });

  // Optionally set default auth strategy
  // server.auth.default('jwt');

  // Add routes
  server.route([
    ...authRoutes,
    ...produkRoutes,
    ...kategoriTransaksiRoutes,
    ...transaksiRoutes,
    ...laporanRoutes,
    ...dashboardRoutes,
    ...umkmRoutes,
    ...usersRoutes,
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