"use strict";

let flag = 0; // 連続投稿確認のためのflag flag=1:前の投稿が自分（投稿不可） flag=0:前の投稿が自分以外（投稿可能）
let publish_time = 0; // 前回投稿した時間
let cnt_message = 0;

// ユーザ名取得関数
function getUserName() {
    const userName = $("#userName").val();
    return userName;
}

// 入力されたメッセージ内容の取得関数
function getMessage() {
    const message = $("#message").val();
    return message;
}
// 投稿メッセージをサーバに送信する
function publish() {
    // ユーザ名を取得
    const userName = getUserName();
    // 入力されたメッセージを取得
    const message = getMessage();
    const check = message.replace(/\s+/g, "");
    const time = new Date();
    if (check === "") {
        alert("空では投稿できません。");
    } else {
        $("#message").val("");
        let now = new Date();
        // 投稿内容を送信
        if (
            flag === 0 &&
            (publish_time === 0 ||
                now.getTime() - publish_time.getTime() > 60000)
        ) {
            const today = `[${
                time.getMonth() + 1
            }月${time.getDate()}日${time.getHours()}時${time.getMinutes()}分${time.getSeconds()}秒]`;
            socket.emit("sendMessageEvent", [
                userName,
                message.replace(/\n+/g, "<br>&nbsp;"),
                today,
            ]);
            flag = 1;
            publish_time = new Date();
        } else if (flag === 1) {
            alert("連続の投稿はできません。");
        } else {
            alert("1分経ってから投稿してください。");
        }
    }
}
function publish_memo() {
    // ユーザ名を取得
    const userName = getUserName();
    // // 入力されたメッセージを取得
    const message = $("#memo-message").text();
    const check = message.replace(/\s+/g, "");
    const time = new Date();
    if (check === "") {
        alert("空では投稿できません。");
    } else {
        let now = new Date();
        // 投稿内容を送信
        if (
            flag === 0 &&
            (publish_time === 0 ||
                now.getTime() - publish_time.getTime() > 60000)
        ) {
            $(`#memo-delete`).remove();
            const today = `[${
                time.getMonth() + 1
            }月${time.getDate()}日${time.getHours()}時${time.getMinutes()}分${time.getSeconds()}秒]`;
            socket.emit("sendMessageEvent", [
                userName,
                message.replace(/\n+/g, "<br>&nbsp;"),
                today,
            ]);
            flag = 1;
            publish_time = new Date();
        } else if (flag === 1) {
            alert("連続の投稿はできません。");
        } else {
            alert("1分経ってから投稿してください。");
        }
    }
}
function delete_msg(msg) {
    // $(`#${msg.id}`).remove();
    socket.emit("deleteMessage", msg.id);
}

socket.on("deleteMessageEvent", function (data) {
    $(`#${data}`).remove();
});
// サーバから受信した投稿メッセージを画面上に表示する
socket.on("receiveMessageEvent", function (data) {
    if ($("#room-sort_button").val() === "古い順") {
        if (data[0] === getUserName()) {
            $("#thread").prepend(
                '<div class="thread-message self-message" id=' +
                    data[3] +
                    "><p>自分：" +
                    data[2] +
                    "<br>" +
                    data[1] +
                    "</b>　<input type=button id=" +
                    data[3] +
                    ' onclick="delete_msg(this)" value="削除"/></p><div>'
            );
        } else {
            $("#thread").prepend(
                '<div class="thread-message other-message" id=' +
                    data[3] +
                    "><p>" +
                    data[0] +
                    "さん：" +
                    data[2] +
                    "<br>" +
                    data[1] +
                    "</p><div>"
            );
            flag = 0;
        }
    } else {
        if (data[0] === getUserName()) {
            $("#thread").prepend(
                '<div class="thread-message self-message" id=' +
                    data[3] +
                    "><p>自分：" +
                    data[2] +
                    "<br>" +
                    data[1] +
                    "</b></p><div>"
            );
        } else {
            $("#thread").prepend(
                '<div class="thread-message other-message" id=' +
                    data[3] +
                    "><p>" +
                    data[0] +
                    "さん：" +
                    data[2] +
                    "<br>" +
                    data[1] +
                    "</p><div>"
            );
            flag = 0;
        }
    }
});
