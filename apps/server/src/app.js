const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');

const app = express();

// Middlewares básicos
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json()); // JSON body parser

// Rutas
app.get('/', (req, res) => {
  res.send('API Documental operativa ✅');
});

// Exportamos app
module.exports = app;