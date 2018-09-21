const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Lesson = require('./models/lesson')

const postsRoutes = require('./Routes/posts');
const userRoutes = require('./Routes/user');

const app = express();

mongoose.Promise = global.Promise;
// mongoose.connect('mongodb://localhost:27017/MEAN')
mongoose.connect(`mongodb+srv://kneitukas:${process.env.MONGO_ATLAS_PW}@cluster0-roebh.mongodb.net/node-angular?retryWrites=true`)
.then(() => {
  console.log("Connected to database")
}).catch((e) => {
  console.log('conection failed',e);
})

// HrfbWQGhPSdn6nJs

app.use(bodyParser.json());

app.use((req,res,next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
     "Origin,X-Requested-With,Content-Type, Accept, Authorization"
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PATCH, DELETE, OPTIONS, PUT"
  );
  next();
});

app.post("/api/lessons", (req,res,next) => {
  const lesson = new Lesson({
    title: req.body.title,
    content: req.body.content
  });
  lesson.save().then((result) => {
    console.log(result)
    res.status(201).json({
      message: 'lesson added succesfully',
      lessonId: result._id
    });
  });
});

app.use('/api/posts', postsRoutes);
app.use('/api/user', userRoutes);

module.exports = app;

// Note
// Change the ip address in the MongoDb Atlas
