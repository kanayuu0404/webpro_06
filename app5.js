const express = require("express");
const app = express();
const path = require("path");

app.set('view engine', 'ejs');
app.use("/public", express.static(__dirname + "/public"));

app.get("/hello1", (req, res) => {
  const message1 = "Hello world";
  const message2 = "Bon jour";
  res.render('show', { greet1:message1, greet2:message2});
});

app.get("/hello2", (req, res) => {
  res.render('show', { greet1:"Hello world", greet2:"Bon jour"});
});

app.get("/icon", (req, res) => {
  res.render('icon', { filename:"./public/Apple_logo_black.svg", alt:"Apple Logo"});
});

app.get("/luck", (req, res) => {
  const num = Math.floor( Math.random() * 6 + 1 );
  let luck = '';
  if( num==1 ) luck = '大吉';
  else if( num==2 ) luck = '中吉';
  console.log( 'あなたの運勢は' + luck + 'です' );
  res.render( 'luck', {number:num, luck:luck} );
});

app.get("/janken", (req, res) => {
  let hand = req.query.hand;
  let win = Number( req.query.win );
  let total = Number( req.query.total );
  console.log( {hand, win, total});

  if (!hand) {
    return res.sendFile(path.join(__dirname, "public", "janken.html"));
  }

  const num = Math.floor( Math.random() * 3 + 1 );
  let cpu = '';
  if( num==1 ) cpu = 'グー';
  else if( num==2 ) cpu = 'チョキ';
  else cpu = 'パー';

  let judgement = ''; // 判定を初期化

  // ここに勝敗の判定を入れる
  if( hand=='グー'){
    total += 1;//ゲームカウントを増やす
    if( cpu=='グー'){
      judgement = '引き分け';
    }
    else if( cpu=='チョキ'){
      judgement = '勝ち';
      win += 1;
    }
    else{
      judgement = '負け';
    }
  }
  if( hand=='チョキ'){
    total += 1;//ゲームカウントを増やす
    if( cpu=='グー'){
      judgement = '負け';
    }
    else if( cpu=='チョキ'){
      judgement = '引き分け';
    }
    else{
      judgement = '勝ち';
      win += 1;
    }
  }
  if( hand=='パー'){
    total += 1;//ゲームカウントを増やす
    if( cpu=='グー'){
      judgement = '勝ち';
      win += 1;
    }
    else if( cpu=='チョキ'){
      judgement = '負け';
    }
    else{
      judgement = '引き分け';
    }
  }

  const display = {
    your: hand,
    cpu: cpu,
    judgement: judgement,
    win: win,
    total: total
  }
  res.render( 'janken', display );
});

app.get("/dice", (req, res) => {
  let kosuu = Number(req.query.kosuu);  // サイコロを振る回数
  let men = Number(req.query.men);      // サイコロの目の最大値

  if (!kosuu && !men) {
    return res.sendFile(path.join(__dirname, "public", "dice.html"));
  }

  let dice = 0;   // サイコロの目の合計
  let dices = [];
  console.log({kosuu, men, dice});
  for (let i = 0; i < kosuu; i++) {    // サイコロを 'kosuu' 回振る
    let roll = Math.floor(Math.random() * men) + 1;  // サイコロの目をランダムに生成
    dice += roll  // 出た目を加算
    dices.push(roll); //配列にそれぞれのサイコロの目を格納
  }
  res.render('dice', {dice: dice, dices: dices, kosuu: kosuu, men: men});
});

app.get("/roulette", (req, res) => {
  let guusuu = Number(req.query.guusuu);    // 偶数に賭けたコインの枚数
  let kisuu = Number(req.query.kisuu);      // 奇数に賭けたコインの枚数
  let ijyou = Number(req.query.ijyou);      // 51以上に賭けたコインの枚数
  let miman = Number(req.query.miman);      // 51未満に賭けたコインの枚数
  let get = Number(req.query.get);          // 増減したコインの枚数
  let have = Number(req.query.have);        // 持っているコインの枚数

  if (!guusuu && !kisuu && !ijyou && !miman) {
    return res.sendFile(path.join(__dirname, "public", "roulette.html"));
  }

  const num = Math.floor( Math.random() * 100 + 1 );

  if (num % 2 == 0 ) {
    get = get + guusuu*2;
  }
  else{
    get = get + kisuu*2;
  }
  if (num >= 51 ) {
    get = get + ijyou*2;
  }
  else{
    get = get + miman*2;
  }
  
  get = get - guusuu - kisuu - ijyou - miman;
  have = have + get;

  res.render( 'roulette', {get:get, have:have, num:num} );
});

app.listen(8080, () => console.log("Example app listening on port 8080!"));
