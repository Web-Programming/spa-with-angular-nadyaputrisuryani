// Basic requires
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

// Load MongoDB connection
require('./app_server/models/db');

// Load Models (WAJIB agar schema ter-register)
require('./app_server/models/user');
require('./app_server/models/housing');

// Load Routes
const indexRouter = require('./app_server/routes/index');
const housingRouter = require('./app_server/routes/housing');
const authRouter = require('./app_server/routes/auth');

const app = express();

// =======================
// VIEW ENGINE SETUP
// =======================
app.set('views', path.join(__dirname, 'app_server', 'views'));
app.set('view engine', 'ejs');

// =======================
// MIDDLEWARE
// =======================
app.use(logger('dev'));

// CORS - allow all domains
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  // Handle preflight OPTIONS requests
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }

  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// =======================
// ROUTES
// =======================
app.use('/', indexRouter);
app.use('/housing', housingRouter);
app.use('/api/auth', authRouter);

// =======================
// 404 HANDLER
// =======================
app.use(function(req, res, next) {
  next(createError(404));
});

// =======================
// ERROR HANDLER
// =======================
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

// =======================
// START SERVER (IMPORTANT)
// =======================
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});

module.exports = app;
