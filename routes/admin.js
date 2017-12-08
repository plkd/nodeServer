/**
 * Created by lijiliang on 2017/12/8.
 */
let express = require('express');
let checkToekn = require('../middleware/checkToken');
let router = express.Router();
router.get('/admin', checkToekn, (req, res, next) => {
  res.send({
    type:true,
    name:'prismo'
  })
});
module.exports = router;