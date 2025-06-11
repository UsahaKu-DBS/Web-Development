const LaporanController = require('../controllers/LaporanController');
const { laporanQuerySchema } = require('../validations/schemas');

const laporanRoutes = [
  {
    method: 'GET',
    path: '/api/laporan/arus-kas',
    handler: LaporanController.arusKas,
    options: {
      auth: 'jwt',
      validate: {
        query: laporanQuerySchema
      }
    }
  },
  {
    method: 'GET',
    path: '/api/laporan/laba-rugi',
    handler: LaporanController.labaRugi,
    options: {
      auth: 'jwt',
      validate: {
        query: laporanQuerySchema
      }
    }
  },
  {
    method: 'GET',
    path: '/api/laporan/penjualan',
    handler: LaporanController.laporanPenjualan,
    options: {
      auth: 'jwt',
      validate: {
        query: laporanQuerySchema
      }
    }
  },
  {
    method: 'GET',
    path: '/api/laporan/pengeluaran',
    handler: LaporanController.laporanPengeluaran,
    options: {
      auth: 'jwt',
      validate: {
        query: laporanQuerySchema
      }
    }
  }
];

module.exports = laporanRoutes;