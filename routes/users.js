var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a user');
});

router.get('/:id', function(req, res, next) {
  res.json(req.params);
});

module.exports = router;
