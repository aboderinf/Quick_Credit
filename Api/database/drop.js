// Manage Table creation
import dotenv from 'dotenv';
import db from './connect';

dotenv.config();

db.query(`
DROP TABLE IF EXISTS "public"."users"`).then((res) => {
  console.log('tables dropped');
  db.end();
})
  .catch(error => console.log(error));
