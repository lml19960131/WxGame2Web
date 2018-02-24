/**
 * Created by 62354 on 2018/2/23.
 */
(function () {
    const http = require('http');
    http.createServer(function (request, response) {
        let body = '';
        request.on('data', function (chunk) {
            body += chunk;
        });
        //请求结束
        request.on('end', function () {
            response.end('这是服务端返回的');
            console.log(body);
        })
    }).listen(8181);
})();