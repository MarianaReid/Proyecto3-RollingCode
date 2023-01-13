const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const dotenv = require('dotenv');
const cors = require('cors');
const dbConnect = require('./config/db');
const userRoutes = require('./routes/users');
const productRoutes = require('./routes/products');
const categoriesRoutes = require('./routes/categories');
const ordersRoutes = require('./routes/orders');
const cartsRoutes = require('./routes/carts');
dotenv.config();
const app = express();

dbConnect();
app.use(logger('dev'));
app.use(express.json());
//Para que nuestra APP sea un poco más segura, que no todos los dominios puedan consultar nuestros datos.
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', process.env.ORIGIN_URL);
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, OPTIONS, PUT, PATCH, DELETE'
  );
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-Requested-With,content-type'
  );
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});
app.use(cors({ origin: process.env.ORIGIN_URL }));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', userRoutes);
app.use('/api', productRoutes);
app.use('/api', categoriesRoutes);
app.use('/api', ordersRoutes);
app.use('/api', cartsRoutes);

module.exports = app;
