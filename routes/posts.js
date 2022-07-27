const express = require("express");
const Post = require("../schemas/post");
const router = express.Router();

router.get("/", async (req, res) => {
  const posts = await Post.find();
  res.json({
    data: posts.map((post) => ({
      postId: post._id,
      user: post.user,
      title: post.title,
      createdAt: post.createdAt,
    })),
  });
});

router.get("/:_postId", async (req, res) => {
  const postId = req.params._postId;
  const [detail] = await Post.find({ _id: postId });
  res.json({
    data: {
      postId: detail.postId,
      user: detail.user,
      title: detail.title,
      content: detail.content,
      createdAt: detail.createdAt,
    },
  });
});

router.put("/:_postId", async (req, res) => {
  const postId = req.params._postId;
  const { password, title, content } = req.body;

  if (title.length < 1 || content.length < 1) {
    res.status(400).json({ errorMessage: "작성한 내용이 없습니다." });
    return;
  }

  const presentPost = await Post.find({ _id: postId });
  if (presentPost.length) {
    await Post.updateOne(
      { _id: postId },
      { $set: { password, title, content } }
    );
  }
  res.json({ message: "게시글을 수정하였습니다." });
});

router.post("/", async (req, res) => {
  const { user, password, title, content } = req.body;

  const createPosts = await Post.create({ user, password, title, content });
  if (createPosts) {
    res.status(201).send({ message: "게시글을 생성하였습니다." });
  }
  res.json({ data: createPosts });
});

router.delete("/:_postId", async (req, res) => {
  const postId = req.params._postId;
  const { password } = req.body;

  const presentPost = await Post.find({ _id: postId });
  if (presentPost.password === password) {
    await Post.deleteOne({ _id: postId });
    return res.json({ message: "게시글을 삭제하였습니다." });
  } else {
    return res.status(400).json({ errorMessage: "비밀번호가 일치하지 않습니다."});
  }
});

module.exports = router;
