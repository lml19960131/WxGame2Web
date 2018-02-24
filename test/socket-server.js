/**
 * Created by 62354 on 2018/2/24.
 */
(function () {
    const webSocketServer = require('ws').Server;
    const ws = new webSocketServer({
        port: 8888
    });
    ws.on('connection', function (ws) {
        console.log('假设连接了客户端');
        ws.on('message', function (message) {
            console.log(message);
        })
    })
})();