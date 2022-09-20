'use strict';

let cnt_message = 0;

module.exports = function (socket, io) {
    // 投稿メッセージを送信する
    socket.on('sendMessageEvent', function (data) {
        data.push(cnt_message++)
        io.sockets.emit('receiveMessageEvent', data);
    });
    socket.on('deleteMessage', function (data) {
        io.sockets.emit('deleteMessageEvent', data);
    });
};
