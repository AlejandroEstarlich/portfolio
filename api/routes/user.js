'use strict'

var express = require('express');
var UserController = require('../controllers/user');

const router = express.Router();
const multer  = require('multer');
const mdAuth = require('../middlewares/authenticated');
const upload = multer({ dest: 'uploads/users' });


// router.get('/test-article', ArticleController.test);

router.get('/user/:id', mdAuth.ensureAuth, UserController.getUser);
router.get('/users/:last?', mdAuth.ensureAuth, UserController.getUsers);

router.post('/register', UserController.saveUser);
router.post('/login', UserController.loginUser);

router.put('/user/:id', mdAuth.ensureAuth, UserController.updateUser);

router.post('/user-image/:id', upload.single('userImg'), UserController.uploadImage);
router.get('/user-image/:image', UserController.getImage);

module.exports = router;