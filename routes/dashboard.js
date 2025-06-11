const DashboardController = require('../controllers/DashboardController');

const dashboardRoutes = [
  {
    method: 'GET',
    path: '/api/dashboard/summary',
    handler: DashboardController.getSummary,
    options: {
      auth: 'jwt'
    }
  },
  {
    method: 'GET',
    path: '/api/dashboard/analytics',
    handler: DashboardController.getAnalytics,
    options: {
      auth: 'jwt'
    }
  }
];

module.exports = dashboardRoutes;
