'use strict';

module.exports = function (server) {

    const socketIo = require('socket.io')(server, { wsEngine: 'ws' });
    const io = socketIo.listen(server);

    const sqlite3 = require("sqlite3");
    const db = new sqlite3.Database("./db/database.db");

    io.sockets.on('connection', function (socket) {
        // 投稿モジュールの呼出
        require('./publish')(socket, io);

        // 入室モジュールの呼出
        require('./enter')(socket, db, io);

        // 退室モジュールの呼出
        require('./exit')(socket, db);

    });
};
