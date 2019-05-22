import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

let connectionString, db;

if(process.env.NODE_ENV === 'development') {
  connectionString = 'postgres://minztlpc:884XcE0ybQDtQLQ-GcZ9k7-s0SKxAMZF@raja.db.elephantsql.com:5432/minztlpc';
} else if(process.env.NODE_ENV === 'test') {
  connectionString = 'postgres://xvapmzgq:ZaLoF6HbrUK6WJ0p4blWu0_gZFtJ7VLm@raja.db.elephantsql.com:5432/xvapmzgq';
} else {
  connectionString = 'postgres://lexkcvmk:4aql30ElY7FLz53IUlVWA2uhat7d7VZv@raja.db.elephantsql.com:5432/lexkcvmk';
}

db = new Pool({
  connectionString, 
});

db &&  console.log('connected to db');
export default db;
