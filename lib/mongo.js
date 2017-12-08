/**
 * Created by lijiliang on 2017/12/8.
 */
var Mongolass = require('mongolass');
var mongolass = new Mongolass();
mongolass.connect('mongodb://localhost:27017/myBlog');
var momment = require('moment');
var objectIdToTimestamp = require('objectid-to-timestamp');

mongolass.plugin('addCreatedAt', {
  afterFind(result){
    result.forEach((item) => {
      item.created_at = item.created_at = momment(objectIdToTimestamp(item._id).format('YYYY-MM-DD HH:mm:ss'))
    })
  },
  afterFindOne(result){
    if (result) {
      result.created_at = momment(objectIdToTimestamp(result._id).format('YYYY-MM-DD HH:mm:ss'))
    }
    return result;
  }
});

exports.User = mongolass.model('User', {
  name: {type: 'string'},
  password: {type: 'string'}
});
exports.User.index({name: 1}, {unique: true}).exec();

exports.Classify = mongolass.model('Classify', {
  classify: {type: 'string'}
});
exports.Classify.index({_id: 1}).exec();

exports.Article = mongolass.model('Article', {
  classify: {type: 'string'},
  title: {type: 'string'},
  content: {type: 'string'},
  contentToMark: {type: 'string'}
});
exports.Article.index({_id:1,classify:-1}).exec();

