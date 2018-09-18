const mongoose = require('mongoose');

const lessonSchema = mongoose.Schema({
  title: {type:String, required:true},
  content: {type:String, required: true}
});

module.exports = mongoose.model('Lesson', lessonSchema);
