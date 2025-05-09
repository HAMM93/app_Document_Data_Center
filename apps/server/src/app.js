const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const path = require('path');

const app = express();

const port = process.env.PORT || 3001

//importRutas
const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');

// Middlewares globales
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas
app.get('/', (req, res) => {
  res.send('API DDC operativa ✅');
});
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);


// Middleware de errores
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({
    status: 'error',
    message: err.message || 'Error interno del servidor'
  });
});

module.exports = app;
