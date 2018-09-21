const Post = require('../models/post');

exports.newPost = (req,res,next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
    creator: req.userData.userId
  });
  post.save().then((result) => {
    res.status(201).json({
      message: 'post added succesfully',
      postId: result._id
    });
  });
}

exports.editPost = (req,res,next) => {
  const post = new Post({
    _id: req.body.id,
    title: req.body.title,
    content: req.body.content,
    creator: req.userData.userId
  })
  Post.updateOne({_id: req.params.id }, post ).then(result => {
    console.log(result);
    res.status(200).json({message: 'Update successful'})
  }).catch((err) => {
    console.log(err)
  })
}

exports.getPosts = (req,res,next) => {
  Post.find()
  .then((documents) => {
    res.status(200).json({
      message: 'Posts fetched succesfully',
      posts: documents
    });
  }).catch((e) => {
    console.log(e)
  })
}

exports.getPost = (req,res,next) => {
  Post.findById(req.params.id).then(post => {
    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({message: 'Post Not Found!'})
    }
  })
}

exports.deletePost = (req,res,next) => {
  Post.deleteOne({_id: req.params.id, creator: req.userData.userId}).then(result => {
    if (result.n > 0) {
    console.log(result);
    res.status(200).json({message: 'Update successful!'})
    } else {
      res.status(401).json({message:'Not authorized!'})
    }
  })
}
