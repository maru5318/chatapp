'use strict';

// ユーザ名取得関数
function getUserName(){
    const userName = $('#userName').val();
    return userName
}

let id = 0;

socket.on('sendIdEvent', (data) => {
    id = data;
})

// 退室メッセージをサーバに送信する
function exit() {
    // ユーザ名取得
    const userName = getUserName();
    // 退室メッセージイベントを送信する
    socket.emit('sendExitEvent', [id, userName]);
    // 退室
    location.href = '/';
}

// サーバから受信した退室メッセージを画面上に表示する
socket.on('receiveExitEvent', function (data) {
    let exitTime = new Date();
    const exitTimeMessage = `[${exitTime.getMonth()+1}月${exitTime.getDate()}日${exitTime.getHours()}時${exitTime.getMinutes()}分${exitTime.getSeconds()}秒]`
    $(`#list${data[1] + data[0]}`).remove();
    if ($('#room-sort_button').val() === '古い順'){
        $('#thread').prepend('<p style="color: #666666;">' + data[1] + 'さんが退室しました' + exitTimeMessage + '</p>');
    }else{
        $('#thread').append('<p style="color: #666666;">' + data[1] + 'さんが退室しました' + exitTimeMessage + '</p>');
    }

});
