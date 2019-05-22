import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'foluke',
    port: process.env.DB_PORT ||  5432,
    database: process.env.DB_DATABASE || 'postgres',
    host: process.env.DB_HOST || 'localhost',
});


pool.on('connect', () => {
  console.log('connected to db');
});

pool.connect();

export default pool;