"use strict";
const express = require("express");
const app = express();

let bbs = [];  // 本来はDBMSを使用するが，今回はこの変数にデータを蓄える

app.set('view engine', 'ejs');
app.use("/public", express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));

// 以下のルートはそのまま残す
app.get("/hello1", (req, res) => {
  const message1 = "Hello world";
  const message2 = "Bon jour";
  res.render('show', { greet1: message1, greet2: message2 });
});

app.get("/hello2", (req, res) => {
  res.render('show', { greet1: "Hello world", greet2: "Bon jour" });
});

app.get("/icon", (req, res) => {
  res.render('icon', { filename: "./public/Apple_logo_black.svg", alt: "Apple Logo" });
});

app.get("/luck", (req, res) => {
  const num = Math.floor(Math.random() * 6 + 1);
  let luck = '';
  if (num == 1) luck = '大吉';
  else if (num == 2) luck = '中吉';
  console.log('あなたの運勢は' + luck + 'です');
  res.render('luck', { number: num, luck: luck });
});

app.get("/janken", (req, res) => {
  let hand = req.query.hand;
  let win = Number(req.query.win);
  let total = Number(req.query.total);
  console.log({ hand, win, total });
  const num = Math.floor(Math.random() * 3 + 1);
  let cpu = '';
  if (num == 1) cpu = 'グー';
  else if (num == 2) cpu = 'チョキ';
  else cpu = 'パー';
  let judgement = '勝ち';
  win += 1;
  total += 1;
  const display = {
    your: hand,
    cpu: cpu,
    judgement: judgement,
    win: win,
    total: total
  }
  res.render('janken', display);
});

app.get("/get_test", (req, res) => {
  res.json({
    answer: 0
  })
});

app.get("/add", (req, res) => {
  console.log("GET");
  console.log(req.query);
  const num1 = Number(req.query.num1);
  const num2 = Number(req.query.num2);
  console.log(num1);
  console.log(num2);
  res.json({ answer: num1 + num2 });
});

app.post("/add", (req, res) => {
  console.log("POST");
  console.log(req.body);
  const num1 = Number(req.body.num1);
  const num2 = Number(req.body.num2);
  console.log(num1);
  console.log(num2);
  res.json({ answer: num1 + num2 });
});

// BBS関連
app.post("/check", (req, res) => {
  res.json({ number: bbs.length });
});

app.post("/read", (req, res) => {
  const start = Number(req.body.start);
  console.log("read -> " + start);
  if (start === 0) {
    res.json({ messages: bbs });
  } else {
    res.json({ messages: bbs.slice(start) });
  }
});

app.post("/post", (req, res) => {
  const name = req.body.name;
  const message = req.body.message;
  const color = req.body.color || '#000000';  // 色が指定されていない場合は黒色
  const number = bbs.length + 1;  // メッセージの番号は配列の長さ + 1
  console.log([name, message, color, number]);
  bbs.push({ name, message, color, number });  // メッセージと番号を保存
  res.json({ number: bbs.length });
});

app.delete("/delete", (req, res) => {
  const id = Number(req.body.id);  // メッセージの番号を取得
  console.log("削除 -> メッセージID: " + id);
  bbs = bbs.filter((message) => message.number !== id);
  res.json({ message: "削除成功" });
});

app.get("/bbs", (req, res) => {
  console.log("GET /BBS");
  res.json({ test: "GET /BBS" });
});

app.listen(8080, () => console.log("Example app listening on port 8080!"));
