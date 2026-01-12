const express = require("express");
const Blog = require("../models/Blog");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

/* CREATE BLOG (Protected) */
router.post("/", authMiddleware, async (req, res) => {
  const blog = await Blog.create({
    title: req.body.title,
    content: req.body.content,
    author: req.user.id
  });
  res.json(blog);
});

/* GET ALL BLOGS (Public) */
router.get("/", async (req, res) => {
  const blogs = await Blog.find().populate("author", "name");
  res.json(blogs);
});

/* UPDATE BLOG (Protected) */
router.put("/:id", authMiddleware, async (req, res) => {
  const blog = await Blog.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(blog);
});

/* DELETE BLOG (Protected) */
router.delete("/:id", authMiddleware, async (req, res) => {
  await Blog.findByIdAndDelete(req.params.id);
  res.json({ message: "Blog deleted" });
});

module.exports = router;