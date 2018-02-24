/**
 * Created by 62354 on 2018/2/23.
 */
export class ApiExamples {
    getUserInfo() {
        const params = {
            success: function (res) {
                console.log(res);
            }
        };
        wx.getUserInfo(params)
    }

    login() {
        wx.login({
            success: function (res) {
                console.log(res);
            }
        })
    }

    getSetting() {
        wx.getSetting({
            success: function (res) {
                console.log(res);
            }
        })
    }

    httpExample() {
        wx.request({
            url: 'http://127.0.0.1:8181',//内部的回环地址8181端口号
            method: 'POST',
            data: 'myData',
            success: function (response) {
                console.log(response); //这里可以根据服务器的返回值来作相关操作
            }
        })
    };

    socketExample() {
        wx.connectSocket({
            url: 'ws://127.0.0.1:8888',
            success: function () {
                console.log('客户端连接成功');
            }
        });
        //发送数据必须使用wx.onSocketOpen()
        wx.onSocketOpen(function () {
            wx.sendSocketMessage({
                data: '这是来自客户端的消息'
            })
        })
    };

    download() {
        wx.downloadFile({
            url: '资源位置',
            success: function (temp) {
                console.log(JSON.stringify(temp));
            }
        })
    }
}