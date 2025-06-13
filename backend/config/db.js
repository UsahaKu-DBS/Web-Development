// backend/config/db.js
const mysql = require('mysql2/promise');

const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '', // sesuaikan
  database: 'usahaku_db' // sesuaikan
});

module.exports = db;
