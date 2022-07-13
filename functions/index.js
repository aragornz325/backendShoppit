const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const {
  logErrors,
  errorHandler,
  boomErrorHandler,
  error404Handler,
} = require('./src/middlewares/error.handler');
const routerApi = require('./src/routers/index');
const UserController = require('./src/controllers/user.controller');
const userController = new UserController();
const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const morgan = require('morgan');
const helmet = require('helmet');
const swaggerEdit = require('./src/utils/swaggerSpec');
const swaggerSpec = swaggerEdit;

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(morgan('dev'));
app.use(helmet());
app.use(cors({ origin: true }));

app.use(
  '/api-doc',
  swaggerUI.serve,
  swaggerUI.setup(swaggerJsDoc(swaggerSpec))
);
app.get('/status', (req, res) => {
  res.status(200).end('ok');
});
app.head('/status', (req, res) => {
  res.status(200).end();
});
routerApi(app);

exports.setCustomerClaim = functions.auth
  .user()
  .onCreate((user) => userController.setCustomerClaimToNewUser(user));

app.use(error404Handler);
app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

exports.api = functions.https.onRequest(app);
