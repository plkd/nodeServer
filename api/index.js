/**
 * Created by lijiliang on 2017/12/8.
 */
var User = require('../lib/mongo').User;
var Article = require('../lib/mongo').Article;
var Classify = require('../lib/mongo').Classify;

module.exports = {
  create(user){
    return User.create(user).exec();
  },
  getUserByName(name){
    return User.findOne({name: name}).exec();
  },
  createClass(data){
    return Classify.create(data).exec();
  },
  removeClass(classId){
    return Classify.remove({_id: classId}).exec();
  },
  updateClass(classId, data){
    return Classify.update({_id: classId}, {$set: data}).exec();
  },
  findAllClass(){
    return Classify.find().addCreatedAt().sort({_id: -1}).exec();
  },
  createArticle(data){
    return Article.create(data).exec();
  },
  getAllArticles(page, limit){
    if (page && limit) {
      var skip = (page - 1) * limit;
      return Promise.all([
        Article.find().addCreatedAt().sort({_id: -1}).skip(skip).limit(limit).exec(),
        Article.count().exec()
      ])
    } else {
      return Article.find().addCreatedAt().sort({_id: -1}).exec();
    }
  },
  getArticlesByClassify(param){
    return Article.find({param}).addCreatedAt().sort({_id: -1}).exec()
  },
  getOneArticle(postId){
    return Article.findOne({_id: postId}).addCreatedAt().exec();
  },
  removeArticle(postId){
    return Article.remove({_id: postId}).exec()
  },
  updateArticle(postId, data){
    return Article.update({_id: postId}, {$set: data}).exec()
  }

};