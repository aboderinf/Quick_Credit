// Manage Table creation
import client from './connect';

client.query(`
DROP TABLE IF EXISTS users
`).then((res) => {
    console.log('tables dropped')
  client.end();
})
  .catch((error) => {
    client.end();
  });