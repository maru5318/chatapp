'use strict';

// 入室メッセージをサーバに送信する
function getUserName(){
    const userName = $('#userName').val();
    return userName
}
// 入力されたユーザ名を取得する
const userName = getUserName();
// 入室メッセージイベントを送信する
socket.emit('sendEnterEvent', userName);

socket.on('makeUserListEvent', function (data) {
    $('#users').prepend(data);
    $('#users').prepend('<p class="username"><b>' + userName + '(自分)</b></p>');
})

// サーバから受信した入室メッセージを画面上に表示する
socket.on('receiveEnterEvent', function (data) {
    // data[0] = id, data[1] = name
    let enterTime = new Date();
    const enterTimeMessage = `[${enterTime.getMonth()+1}月${enterTime.getDate()}日${enterTime.getHours()}時${enterTime.getMinutes()}分${enterTime.getSeconds()}秒]`
    $('#users').append('<p class="username" id=list' + data[1] + data[0] + '>' + data[1] + '</p>');
    if ($('#room-sort_button').val() === '古い順'){
        $('#thread').prepend('<p style="color: #666666;">' + data[1] + 'さんが入室しました' + enterTimeMessage + '</p>');
    }else{
        $('#thread').append('<p style="color: #666666;">' + data[1] + 'さんが入室しました' + enterTimeMessage + '</p>');
    }

});

//Shift+Enterで投稿
let form = document.getElementById('message');
form.addEventListener('keypress', event_key);
function event_key(e) {
  	if (e.keyCode === 13 && e.shiftKey === true) {
        e.preventDefault();
        publish();
	}  
		return false;
}

