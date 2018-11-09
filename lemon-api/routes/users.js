var express = require('express');
var router = express.Router();

var userApi = require('./user');
/* 添加 用户名 */
router.post('/api/add', userApi.addUser);

// 注销用户

// 用户详情
module.exports = router;
