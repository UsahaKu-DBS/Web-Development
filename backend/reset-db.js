const knex = require('knex');
const config = require('./knexfile').development;

const db = knex(config);

async function resetDatabase() {
  try {
    // Ambil semua tabel di database
    const [tables] = await db.raw(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = ? AND table_type = 'BASE TABLE';
    `, [config.connection.database]);

    // Disable foreign key check (penting untuk drop tabel yang punya relasi)
    await db.raw('SET FOREIGN_KEY_CHECKS = 0;');

    // Drop semua tabel satu per satu
    for (const row of tables) {
      const tableName = row.TABLE_NAME || row.table_name;
      console.log(`Dropping table: ${tableName}`);
      await db.raw(`DROP TABLE IF EXISTS \`${tableName}\`;`);
    }

    // Enable kembali foreign key check
    await db.raw('SET FOREIGN_KEY_CHECKS = 1;');

    console.log('All tables dropped.');
  } catch (err) {
    console.error('Error dropping tables:', err);
  } finally {
    await db.destroy();
  }
}

resetDatabase();
