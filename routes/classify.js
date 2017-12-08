/**
 * Created by lijiliang on 2017/12/8.
 */
let express = require('express')
let checkToken = require('../middleware/checkToken')
let api = require('../api')
let router = express.Router()

router.post('/classify/create', checkToken, (req, res, next) => {
  api.createClass(req.body).then(({result: {ok, n}}) => {
    if (ok && n > 0) {
      res.send({
        code: 200,
        message: 'created successfully!'
      })
    } else {
      throw new Error('create failed!')
    }
  }).catch(err => {
    res.send({
      code: -200,
      message: err.toString()
    })
  })
});
// 删除分类
router.post('/classify/remove', checkToken, (req, res, next) => {
  let {id} = req.body;
  api.createClass(id).then(({result: {ok, n}}) => {
    if (ok && n > 0) {
      res.send({
        code: 200,
        message: 'removed successfully!'
      })
    } else {
      throw new Error('remove failed!')
    }
  }).catch(err => {
    res.send({
      code: -200,
      message: err.toString()
    })
  })
});

//编辑分类
router.post('/classify/update', checkToken, (req, res, next) => {
  let {id, classify} = req.body;
  api.updateClass(id, {classify}).then(({result: {ok, n}}) => {
    if (ok && n > 0) {
      res.send({
        code: 200,
        message: 'update successfully!'
      })
    } else {
      throw new Error('update failed!')
    }
  }).catch(err => {
    res.send({
      code: -200,
      message: err.toString()
    })
  })
});

// 获取所有分类(后台)
router.post('/classify/lists', checkToken, (req, res, next) => {
  api.findAllClass().then(lists => {
    res.send({
      code: 200,
      lists
    })
  }).catch(err => {
    res.send({
      code: -200,
      message: err.toString()
    })
  })
});

//查找一个分类
router.post('/classify/oneClass', checkToken, (req, res, next) => {
  let {id} = req.body;
  api.findOneClass(id).then(data => {
    if (data) {
      res.send({
        code: 200,
        data
      })
    } else {
      throw new Error('class not found!')
    }
  }).catch(err => {
    res.send({
      code: -200,
      message: err.toString()
    })
  })
});

//在前台查询所有分类，(不需要权限)
router.post('/classify/noAuthList', (req, res, next) => {
  api.findAllClass().then(list => {
    res.send({
      code: 200,
      list
    })
  }).catch(err => {
    res.send({
      code: -200,
      message: err.toString()
    })
  })
});
module.exports = router;
