"use strict";

let number = 0;
const bbs = document.querySelector('#bbs');

// 新規投稿の処理
document.querySelector('#post').addEventListener('click', () => {
    const name = document.querySelector('#name').value;
    const message = document.querySelector('#message').value;
    const color = document.querySelector('#color').value;  // 色の取得

    const params = {
        method: "POST",
        body: `name=${name}&message=${message}&color=${color}`,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    };

    const url = "/post";
    fetch(url, params)
    .then((response) => {
        if (!response.ok) {
            throw new Error('Error');
        }
        return response.json();
    })
    .then((response) => {
        console.log(response);
        document.querySelector('#message').value = "";
        document.querySelector('#name').value = "";
    });
});

// 投稿チェック（新規投稿があるか確認）
document.querySelector('#check').addEventListener('click', () => {
    const params = {
        method: "POST",
        body: '',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    };

    const url = "/check";
    fetch(url, params)
    .then((response) => {
        if (!response.ok) {
            throw new Error('Error');
        }
        return response.json();
    })
    .then((response) => {
        let value = response.number;
        if (number !== value) {
            const params = {
                method: "POST",
                body: `start=${number}`,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            };

            const url = "/read";
            fetch(url, params)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Error');
                }
                return response.json();
            })
            .then((response) => {
                number += response.messages.length;
                response.messages.forEach((mes) => {
                    let cover = document.createElement('div');
                    cover.className = 'cover';

                    // 番号表示部分
                    let number_area = document.createElement('span');
                    number_area.className = 'number';
                    number_area.innerText = `${mes.number}:`;  // 番号を表示

                    // メンション機能（番号をクリックで >番号 の形式でメッセージ入力）
                    number_area.addEventListener('click', () => {
                        document.querySelector('#message').value += ` >${mes.number}`;  // メンション形式を >番号 に変更
                    });

                    // 名前表示部分
                    let name_area = document.createElement('span');
                    name_area.className = 'name';
                    name_area.innerText = mes.name;
                    name_area.style.color = mes.color;  // 名前の色を設定

                    // メッセージ部分
                    let mes_area = document.createElement('span');
                    mes_area.className = 'mes';

                    // メッセージ内のメンション部分を水色にする
                    let messageText = mes.message;
                    const mentionPattern = />(\d+)/g;  // メンションのパターン（>番号）
                    messageText = messageText.replace(mentionPattern, (match, number) => {
                        return `<span class="mention">${match}</span>`;  // メンション部分を<span>でラップ
                    });

                    mes_area.innerHTML = messageText;

                    // 削除ボタン
                    let delete_btn = document.createElement('button');
                    delete_btn.innerText = '削除';
                    delete_btn.addEventListener('click', () => {
                        const deleteParams = {
                            method: 'DELETE',
                            body: `id=${mes.number}`,
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded'
                            }
                        };
                        fetch('/delete', deleteParams)
                            .then(response => response.json())
                            .then(data => {
                                console.log('削除成功:', data);
                                // 削除後、ページを再読み込みして更新
                                location.reload();
                            })
                            .catch(err => console.error('削除エラー:', err));
                    });

                    // HTMLに追加
                    cover.appendChild(number_area);  // 番号を先に追加
                    cover.appendChild(name_area);
                    cover.appendChild(mes_area);
                    cover.appendChild(delete_btn); // 削除ボタン

                    bbs.appendChild(cover);
                });
            });
        }
    });
});
