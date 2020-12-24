const express = require('express');

const router = express.Router();
const authController = require('../../controller/authController');

router.get('/', authController.auth);

module.exports = router;
