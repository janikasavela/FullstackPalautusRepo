const express = require("express");
const router = express.Router();
const { Blog } = require("../models/blog");

router.get("/", async (req, res, next) => {
  Blog.find()
    .sort("name")
    .then((blogs) => res.send(blogs))
    .catch((err) => next(err));
});

router.post("/", async (req, res, next) => {
  const { title, author, url, likes } = req.body;
  if (!title || !author || !url || !likes)
    return res
      .status(400)
      .send("Title, author, url and likes are all required information");

  const blog = new Blog({
    title,
    author,
    url,
    likes,
  });

  await blog
    .save()
    .then((result) => {
      res.status(201).send(result);
    })
    .catch((err) => next(err));
});

module.exports = router;
