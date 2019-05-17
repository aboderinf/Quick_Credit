// /* eslint-disable no-console */
import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import routes from './routes/index';
import cors from 'cors';
import morgan from 'morgan';
const Joi = require('joi');
// instantiate validator class Joi
dotenv.config();
// Instantiate express
const app = express();
// Set our port
const port = process.env.PORT || 8000;
// Configure app to user bodyParser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());
// logger
app.use(morgan('dev'));
// 3rd party middleware
app.use(cors());
// Register our routes in app
app.use('/api/v1', routes);
// Start our server
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
// Export our app for testing purposes
export default app;
