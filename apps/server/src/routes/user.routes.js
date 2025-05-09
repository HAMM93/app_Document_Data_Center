const express = require('express');
const router = express.Router();
const { getAllUsers } = require('../controllers/user.controller');
const { verifyToken, checkRole } = require('../meddlewares/auth.middleware');

router.get('/list', verifyToken, checkRole('admin'), getAllUsers);

module.exports = router;
