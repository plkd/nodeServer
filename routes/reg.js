/**
 * Created by lijiliang on 2017/12/8.
 */
require('dotenv').config()
let api = require('../api');
let express = require('express');
let router = express.Router();
let sha1 = require('sha1');
let createToken = require('../middleware/createToken');
router.post('/reg', (req, res, next) => {
  let name = req.body.account;
  let password = req.body.checkPass;
  password = sha1(password);
  let user = {
    name: name,
    password: password
  }

  api.create(user).then(() => {
    res.send({
      code: 200,
      token: createToken(name)
    })
  }).catch(err => {
    if (err.message.match('E11000 duplicate key')) {
      return res.json({
        code: -200,
        message: '用户名重复'
      })
    }
    return res.json({
      code: -200,
      message: err.toString()
    })
  })
});
module.exports = router;
