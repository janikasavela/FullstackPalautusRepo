const mongoose = require("mongoose");

const Blog = mongoose.model(
  "Blog",
  new mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number,
  })
);

exports.Blog = Blog;
