# webpro_06

## 挨拶その1

### ファイル一覧
ファイル名 | 説明
-|-
app5.js | プログラム本体
views/hello1.ejs | 挨拶その1の表示コード

### 使用手順
1. ターミナルでapp5.js を起動する(node app5.js)
1. 別のターミナルを開き8080のポートに対応させる(telnet localhost 8080)
1. 8080ポートに挨拶その1のプログラムを読み込ませる
(GET /hello1 HTTP/1.1
Host: localhost)
1. Webブラウザで[http://localhost:8080/hello1]にアクセスする

### フローチャート
```mermaid
flowchart TD;

start["開始"];
end1["終了"]
dainyuu1["変数1に挨拶1を代入する"]
dainyuu2["変数2に挨拶2を代入する"]
hennsuu1["変数1を表示"]
hennsuu2["変数2を表示"]

start --> dainyuu1
dainyuu1 --> dainyuu2
dainyuu2 --> hennsuu1
hennsuu1 --> hennsuu2
hennsuu2 --> end1
```


## 挨拶その2

### ファイル一覧
ファイル名 | 説明
-|-
app5.js | プログラム本体
views/hello2.ejs | 挨拶その2の表示コード

### 使用手順
1. ターミナルでapp5.js を起動する(node app5.js)
1. 別のターミナルを開き8080のポートに対応させる(telnet localhost 8080)
1. 8080ポートに挨拶その2のプログラムを読み込ませる
(GET /hello2 HTTP/1.1
Host: localhost)
1. Webブラウザで[http://localhost:8080/hello2]にアクセスする

### フローチャート
```mermaid
flowchart TD;

start["開始"];
end1["終了"]
aisatu1["挨拶1を表示"]
aisatu2["挨拶2を表示"]

start --> aisatu1
aisatu1 --> aisatu2
aisatu2 --> end1
```


## アイコン

### ファイル一覧
ファイル名 | 説明
-|-
app5.js | プログラム本体
views/icon.ejs | iconの表示コード
public/Apple_logo_black.svg | 表示させる画像ファイル

### 使用手順
1. ターミナルでapp5.js を起動する(node app5.js)
1. 別のターミナルを開き8080のポートに対応させる(telnet localhost 8080)
1. 8080ポートにアイコンのプログラムを読み込ませる
(GET /icon HTTP/1.1
Host: localhost)
1. Webブラウザで[http://localhost:8080/icon]にアクセスする

### フローチャート
```mermaid
flowchart TD;

start["開始"];
end1["終了"]
gazou["画像ファイルを読み込む"]
icon["読み込んだ画像ファイルを表示"]

start --> gazou
gazou --> icon
icon --> end1
```


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
1. ターミナルでapp5.js を起動する(node app5.js)
1. 別のターミナルを開き8080のポートに対応させる(telnet localhost 8080)
1. 8080ポートに複合ダイスのプログラムを読み込ませる
(GET /dice HTTP/1.1
Host: localhost)
1. Webブラウザで[http://localhost:8080/dice]にアクセスする
1. 振りたいダイスの個数と面数(出てくる数の最大値)を指定する

### フローチャート
```mermaid
flowchart TD;

start["開始"];
end1["終了"]
sitei["ダイスの数と面数を指定"]
roll["1から指定したダイスの面数までの間の整数からランダムにダイスの目を選ぶ"]
dice["出た目を配列に格納"]
dices["配列の中身の合計を計算する"]
for{"繰り返し処理"}
hyouji1["配列の中身(すべてのダイスの目)を表示"]
hyouji2["配列の中身の合計(ダイスの目の合計)を表示"]

start --> sitei
sitei --> for
for --> roll
roll --> dice
dice --> dices
dices -->|指定したダイスの個数回繰り返し| for
dices --> hyouji1
hyouji1 --> hyouji2
hyouji2 --> end1
```


## ルーレット

### ファイル一覧
ファイル名 | 説明
-|-
app5.js | プログラム本体
public/roulette.html | ルーレットの開始画面
views/roulette1.ejs | ルーレットの表示コード
views/roulette2.ejs | ルーレットのゲームオーバー表示コード

### 使用手順
1. ターミナルでapp5.js を起動する(node app5.js)
1. 別のターミナルを開き8080のポートに対応させる(telnet localhost 8080)
1. 8080ポートにルーレットのプログラムを読み込ませる
(GET /roulette HTTP/1.1
Host: localhost)
1. Webブラウザで[http://localhost:8080/roulette]にアクセスする
1. ルーレットで次に出てくる数字が偶数,奇数,51以上,51未満かを予想してコインを賭ける
1. 予想があたったら賭けたコインが倍になって返ってくる
1. コインを全て無くしたらゲームオーバー(再びやりたい場合はリセットボタンを押す)

### フローチャート
```mermaid
flowchart TD;

start["開始"];
end1["終了"]
kake["選ばれる数字を予測する"]
roulette["1から100までの間の整数からランダムに選ぶ"]
syori["予想があたった場合はコインを増やし，ハズレた場合は減らす"]
if{"持ちコインが1枚以上あるか"}
over["ゲームオーバー画面を表示"]

start --> kake
kake --> roulette
roulette --> syori
syori --> if
if --> |yes| kake
if --> |no| over
over --> |ゲームをリセット| kake
over --> end1
```