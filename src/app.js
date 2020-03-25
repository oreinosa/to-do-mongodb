const express = require('express');
const path = require('path');
const logger = require('morgan');
const swagger = require('swagger-ui-express');
const swaggerConfig = require('./swagger.json');
const Ddos = require('ddos');
const ddos = new Ddos({ burst: 10, limit: 15 });
const cors = require('cors');
require('dotenv').config();

// init mongoose Singleton
require('./config/mongoose');

// main router to import all routes
const mainRouter = require('./routes/routes');
// init express app
const app = express();
// add logging
app.use(logger('dev'));
// add json support
app.use(express.json());
// adding cors
app.use(cors({
  origin: process.env.CLIENT_HOSTNAME
}));
app.all('*', function (req, res, next) {
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});
// add ddos 
app.use(ddos.express);
//swagger config
app.use('/swagger', swagger.serve, swagger.setup(swaggerConfig));

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
// using router in /api/v1 route
app.use('/api/v1', mainRouter);

module.exports = app;
