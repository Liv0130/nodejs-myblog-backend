const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
  user: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true
  },
  postId: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Comment', commentSchema);