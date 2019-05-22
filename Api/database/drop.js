// Manage Table creation
import db from './connect';
import dotenv from 'dotenv';

dotenv.config();

db.query(`
DROP TABLE IF EXISTS "public"."users"`).then((res) => {
    console.log('tables dropped')
  db.end();
})
  .catch((error) => {
    db.end();
  });