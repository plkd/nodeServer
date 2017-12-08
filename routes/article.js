/**
 * Created by lijiliang on 2017/12/8.
 */
let express = require('express');
let checkToekn = require('../middleware/checkToken');
let api = require('../api')
let router = express.Router();

//创建一篇文章
router.post('/article/create', checkToekn, (req, res, next) => {
    api.createArticle(req.body).then(({result: {ok, n}}) => {
      if (ok && n > 0) {
        res.send({
          code: 200,
          message: '发布成功'
        })
      } else {
        throw new Error('发布失败')
      }
    }).catch(err => {
      res.send({
        code: -200,
        message: err.toString()
      })
    })
  }
);

//获取所有文章(带分页获取,需要验证权限)
router.post('/article/lists', checkToekn, (req, res, next) => {
  let {page, limit} = req.body;
  api.getAllArticles(page, limit).then((result) => {
    let articleLists = result[0], total = result[1];
    articleLists.forEach((article) => {
      delete article.content
      delete article.contentToMark
    });
    res.send({
      code: 200,
      articleLists,
      total
    })
  }).catch(err => {
    res.send({
      code: -200,
      message: err.toString()
    })
  })
});

// 根据classify获取文章列表(前台使用没有权限)
router.post('/article/noAuthArtilcelists', (req, res, next) => {
  let {classify} = req.body;
  api.getArticlesByClassify(classify).then((articleLists) => {
    articleLists.forEach(article => {
      delete article.content
      article.contentToMark = article.contentToMark.match(/<p>([\s\S]*?<\/p>)/g)[0]
    });
    res.send({
      code: 200,
      articleLists
    })
  }).catch(err => {
    res.send({
      code: -200,
      message: err.toString()
    })
  })
});

// 获取所有文章(每次返回10个)前台使用
router.post('/article/articleLists', (req, res, next) => {
  let {limit, page} = req.body;
  api.getAllArticles(page, limit).then(result => {
    let articleLists = result[0],
      total = result[1],
      totalPage = Math.ceil(total / limit),
      hasNext = totalPage > page ? 1 : 0,
      hasPrev = page > 1;
    articleLists.forEach(article => {
      delete article.content
      article.contentToMark = article.contentToMark.match(/<p>([\s\S]*?<\/p>)/g)[0]
    })
    res.send({
      code: 200,
      articleLists,
      hasNext,
      hasPrev
    })
  }).catch(err => {
    res.send({
      code: -200,
      message: err.toString()
    })
  })
});

// 根据postId获取其中一篇文章（有权限）
router.post('/article/adminGetOnePost', checkToekn, (req, res, next) => {
  let {id} = req.body;
  api.getOneArticle(id).then(post => {
    if (post) {
      res.send({
        code: 200,
        post
      })
    } else {
      throw new Error('Article not found!')
    }
  }).then(err => {
    res.send({
      code: -200,
      message: err.toString()
    })
  })
});

// 根据postId获取其中一篇文章（没有权限）
router.post('/article/onePost', (req, res, next) => {
  let {id} = req.body;
  api.getOneArticle(id).then(post => {
    if (post) {
      res.send({
        code: 200,
        post
      })
    } else {
      throw new Error('Article not found!')
    }
  }).then(err => {
    res.send({
      code: -200,
      message: err.toString()
    })
  })
});

// 删除一篇文章
router.post('/article/remove', checkToekn, (req, res, next) => {
  let {id} = req.body;
  api.removeArticle(id).then(({result: {ok, n}}) => {
    if (ok && n > 0) {
      res.send({
        code: 200,
        message: 'delete successfully!'
      })
    } else {
      throw new Error('article not found!')
    }
  }).catch(err => {
    res.send({
      code: -200,
      message: err.toString()
    })
  })
});

// 编辑文章
router.post('/article/update', checkToekn, (req, res, next) => {
  let {id, title, classify, content, contentToMark} = req.body;
  api.updateArticle(id, {title, classify, content, contentToMark}).then(({result: {ok, n}}) => {
    if (ok && n > 0) {
      res.send({
        code: 200,
        message: 'update successfully!'
      })
    } else {
      throw new Error('update fail!')
    }
  }).catch(err => {
    res.send({
      code:-200,
      message:err.toString()
    })
  })
});
module.exports = router;
