const express = require('express');
const connect = require('./schemas')
const app = express();
const port = 3000;

connect();

const indexRouter = require("./routes/index");
const postsRouter = require("./routes/posts");
const commentsRouter = require("./routes/comments");

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use("/", indexRouter);
app.use("/posts",postsRouter);
app.use("/comments",commentsRouter);

app.listen(port, () => {
  console.log(port, '포트로 서버가 열렸어요!');
});