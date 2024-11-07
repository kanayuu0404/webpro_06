# webpro_06
2024/10/29


## じゃんけん

### ファイル一覧
ファイル名 | 説明
-|-
app5.js | プログラム本体
public/janken.html | じゃんけんの開始画面
views/janken.ejs | じゃんけんの表示コード

### 使用手順
1. ターミナルでapp5.js を起動する(node app5.js)
1. 別のターミナルを開き8080のポートに対応させる(telnet localhost 8080)
1. 8080ポートにじゃんけんのプログラムを読み込ませる
(GET /janken HTTP/1.1
Host: localhost)
1. Webブラウザで[http://localhost:8080/janken]にアクセスする
1. 自分の手を入力する

### フローチャート
```mermaid
flowchart TD;

start["開始"];
end1["終了"]
cpu["cpuの手をランダムに決定"]
hito["プレイヤーの手を決定"]
if{"プレイヤーの手はcpuの手に勝ったか"}
win["勝ち"]
loose["負け"]
winsuu["勝利数を1増やす"]
total["試合数を1増やす"]

start --> cpu
cpu --> hito
hito --> if
if -->|yes| win
win --> winsuu
winsuu --> total
if -->|no| loose
loose --> total
total --> end1
```


## 複合ダイス

### ファイル一覧
ファイル名 | 説明
-|-
app5.js | プログラム本体
public/dice.html | 複合ダイスの開始画面
views/dice.ejs | 複合ダイスの表示コード

### 使用手順
2. ターミナルでapp5.js を起動する(node app5.js)
2. 別のターミナルを開き8080のポートに対応させる(telnet localhost 8080)
2. 8080ポートに複合ダイスのプログラムを読み込ませる
(GET /dice HTTP/1.1
Host: localhost)
2. Webブラウザで[http://localhost:8080/dice]にアクセスする
2. 振りたいダイスの個数と面数(出てくる数の最大値)を指定する

### フローチャート
```mermaid
flowchart TD;

start["開始"];
end1["終了"]
sitei["ダイスの数と面数を指定"]
roll["1から指定したダイスの面数を最大値までの間の整数からランダムに数字を選ぶ"]
dice["出た値を配列に格納"]
dices["配列の中身の合計を計算する"]
if{"指定したダイスの数だけ行われたか"}

start --> sitei
sitei --> roll
roll --> dice
dice --> dices
dices --> if
if -->|yes| end1
if -->|no| roll
```