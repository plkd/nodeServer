/**
 * Created by lijiliang on 2017/12/8.
 */
var jwt = require('jsonwebtoken')
module.exports = (req, res, next) => {
  if (req.headers['authorization']) {
    let token = req.headers['authorization'].split(' ')[1];
    let decoded = jwt.decode(token, process.env.JWT_SECRET);
    // 如果过期了就重新登录
    if (token && decoded.exp <= Date.now() / 1000) {
      return res.send({
        code:401,
        message:'授权已过期,请重新登录！'
      })
    }
  }
  next()
}