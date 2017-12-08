/**
 * Created by lijiliang on 2017/12/8.
 */
let api = require('../api');
let express = require('express');
let router = express.Router();
let createToken = require('../middleware/createToken');
let sha1 = require('sha1');

router.post('/login', (req, res, next) => {
  let name = req.body.account;
  let password = req.body.checkPass;
  password = sha1(password);
  api.getUserByName(name).then((user) => {
    if (user && (user.password = password)) {
      res.json({
        code: 200,
        token: createToken(name)
      })
    } else {
      // 用户名或者密码错误没有通过验证，要么重新输入，要么点击注册()
      res.json({
        code: -200,
        message: '用户名或密码错误'
      })
    }
  }).catch(err => {
    next(err);
    return res.json({
      code: -200,
      message: err.toString()
    })
  })

});
module.exports = router;