/**
 * Created by lijiliang on 2017/12/8.
 */
let jwt = require('jsonwebtoken');
module.exports = function (name) {
  let expiry = new Date();
  expiry.setDate(expiry.getDate() + 7);
  const token = jwt.sign({
    name: name,
    exp: parseInt(expiry.getTime() / 1000)
  }, process.env.JWT_SECRET)
  return token
}