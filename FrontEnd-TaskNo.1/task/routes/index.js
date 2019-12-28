var express = require('express');
var router = express.Router();
//express的Router类可以实例化出路由对象，可以挂载很多路由节点

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});


module.exports = router;