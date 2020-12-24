const express = require('express');

const router = express.Router();

router.use('/user', require('./users'));
// router.use('/recommend', require('./recommend'));
// router.use('/like', require('./like'));
router.use('/auth', require('./auth'));

/* GET home page. */
router.get('/', (req, res) => {
  res.render('index', { title: 'Express' });
});

module.exports = router;
