# webpro_06
2024/10/29
## このプログラムについて

## ファイル一覧


### じゃんけん
ファイル名 | 説明
-|-
app5.js | プログラム本体
public/janken.html | じゃんけんの開始画面
views/janken.ejs | じゃんけんの表示コード

```javascript
console.log( 'Hello' );
```

1. ターミナルでapp5.js を起動する(node app.js)
1. 別のターミナルを開き8080のポートに対応させる(telnet localhost 8080)
1. 8080ポートにじゃんけんのプログラムを読み込ませる
(GET /janken HTTP/1.1
Host: localhost)
1. Webブラウザで[http://localhost:8080/janken]にアクセスする
1. 自分の手を入力する

```mermaid
flowchart TD;

start["開始"];
end1["終了"]
cpu["cpuの手をランダムに決定"]
hito["プレイヤーの手を決定"]
if{"プレイヤーの手はcpuの手に勝ったか"}
win["勝ち"]
loose["負け"]

start --> cpu
cpu --> hito
start --> if
if -->|yes| win
win --> end1
if -->|no| loose
loose --> end1
```

GET /dice HTTP/1.1
Host: localhost