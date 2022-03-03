'use strict'

var express = require('express');
var ArticleController = require('../controllers/article');

var router = express.Router();
const multer  = require('multer');
const upload = multer({ dest: 'uploads/articles' });


// router.get('/test-article', ArticleController.test);

router.post('/save', ArticleController.save);
router.get('/articles/:filter', ArticleController.getArticles);
router.get('/article/:id', ArticleController.getArticle);
router.get('/search/:searchParam?', ArticleController.searchArticles);
router.put('/article/:id', ArticleController.update);
router.delete('/article/:id', ArticleController.delete);

router.post('/upload-image/:id', upload.single('articleImg'), ArticleController.uploadImage);
router.get('/get-image/:image', ArticleController.getImage);



module.exports = router;