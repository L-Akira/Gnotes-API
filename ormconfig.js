require('dotenv').config();

module.exports = {
  type: 'postgres',
  host: process.env.DB_DEV_HOST,
  username: process.env.DB_DEV_USER,
  password: process.env.DB_DEV_PASSWORD,
  database: process.env.DB_DEV_DATABASE,
  logging: ['query', 'error'],
  migrations: ['./src/database/typeorm/migrations/**.ts'],
  entities: ['./src/models/index.ts'],
  cli: {
    migrationsDir: './src/database/typeorm/migrations',
  },
};
