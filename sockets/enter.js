'use strict';

let id = 0;

module.exports = function (socket, db) {
    // 入室メッセージをクライアントに送信する
    socket.on('sendEnterEvent', function (data) {
        socket.broadcast.emit('receiveEnterEvent', [id, data]);
        socket.emit('sendIdEvent', id);
        db.all("select * from users", (err, row) => {
            if (err) {
                console.error(err.message);
            }
            let userList = "";
            row.forEach(person => {
                userList += "<p class ='username' id=list" + person.name + person.id + ">" + person.name + "</p>";
            });
            socket.emit('makeUserListEvent', userList)
            db.run('insert into users values(' + id++ + ', "' + data + '")')
        });
    });

    socket.on('userNameJudge', function(data){
        let check = 0;
        db.all("select * from users", (err, row) => {
            if (err) {
                console.error(err.message);
            }
            row.forEach(person => {
                if (data === person.name){
                    check = 1;
                }
            })
            socket.emit('receiveUserJudege', check);
        });
    });
};
