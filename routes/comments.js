const express = require("express");
const Comment = require("../schemas/comment");
const router = express.Router();

router.post("/:_postId", async (req, res) => {
  const postId = req.params._postId;
  const { user, password, content } = req.body;

  const createComment = await Comment.create({ postId, user, password, content });
  if (createComment) {
    return res.json({ message: "댓글을 생성하였습니다." });
  }
  res.json({ data: createComment });
});

router.get("/:_postId", async (req, res) => {
  const postId = req.params._postId;
  const [comments] = await Comment.find({ postId });
  if (!comments) {
    return res.status(400).json({ errorMessage: "댓글이 존재하지 않습니다."});
  } else {
  res.json({
    data:{
      commentId: comments._id,
      user: comments.user,
      content: comments.content,
      createdAt: comments.createdAt,
    },
  })
}
});

router.put("/:_commentId", async (req, res) => {
  const commentId  = req.params._commentId;
  const { password, content } = req.body;

  const presentComment = await Comment.find({ _id: commentId });
  if (presentComment.length) {
    await Comment.updateOne(
      { _id: commentId },
      { $set: { password, content } }
    );
  }
  res.json({ message: "댓글을 수정하였습니다." });
});

router.delete("/:_commentId", async (req, res) => {
  const commentId  = req.params._commentId;
  const { password } = req.body;

  const presentComment = await Comment.find({ _id: commentId });
  if (presentComment.password === password) {
    await Comment.deleteOne({ _id: commentId });
    return res.json({ message: "댓글을 삭제하였습니다." });
  }
});

module.exports = router;
