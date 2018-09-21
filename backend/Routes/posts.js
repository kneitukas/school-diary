const express = require('express');
const checkAuth = require('../middleware/check-auth')
const router = express.Router();
const PostsController = require('../controllers/posts')

router.post("", checkAuth, PostsController.newPost);

router.put("/:id", PostsController.editPost);

router.get('', PostsController.getPosts);

router.get('/:id', PostsController.getPosts)

router.delete("/:id", checkAuth, PostsController.deletePost );

module.exports = router;
