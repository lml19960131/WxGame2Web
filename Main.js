//初始化游戏的精灵，作为整个游戏的入口
import {ResourceLoader} from './js/base/ResourceLoader.js'
import {BackGround} from './js/runtime/BackGround.js'
import {DataStore} from './js/base/DataStore.js'
import {Director} from './js/Director.js'
import {Land} from './js/runtime/Land.js'
import {Birds} from './js/player/Birds.js'
import {StartButton} from './js/player/StartButton.js'
import {Score} from './js/player/Score.js'
import {ApiExamples} from './js/ApiExample.js'

export class Main {
    constructor() {
        this.canvas = wx.createCanvas();
        this.ctx = this.canvas.getContext('2d');
        this.dataStore = DataStore.getInstance();
        this.director = Director.getInstance();
        const loader = ResourceLoader.create();
        loader.onLoaded(map => this.onResourceFirstLoaded(map));
        // let image = wx.createCanvas();
        // image.src = './res/background.png';
    }

    //创建bgm
    createBackgroundMusic() {
        const bgm = wx.createInnerAudioContext();
        bgm.autoplay = true;
        bgm.loop = true;
        bgm.src = 'bgm/bgm.mp3';
    }

    onResourceFirstLoaded(map) {
        this.dataStore.canvas = this.canvas;
        this.dataStore.ctx = this.ctx;
        this.dataStore.res = map;
        // this.createBackgroundMusic();
        const example = new ApiExamples();
        // example.getUserInfo(); 获取用户信息
        // example.login(); 获取登陆时的信息如code用于转第三方或者支付
        // example.getSetting(); 获取个人配置信息
        // example.httpExample(); 获取HTTP请求数据
        // example.socketExample();
        example.download();
        this.init();
    }


    init() {
        this.director.isGameOver = false;

        this.dataStore
            .put('pencils', [])
            .put('background', BackGround) //ES6中的类是以function存在的
            .put('land', Land)
            .put('birds', Birds)
            .put('score', Score)
            .put('startButton', StartButton);
        this.registerEvent();
        this.director.createPencil();
        this.director.run()
    }

    registerEvent() {
        // this.canvas.addEventListener('touchstart', e => {
        //     e.preventDefault();
        //     if (this.director.isGameOver) {
        //         console.log('游戏开始');
        //         this.init();
        //     } else {
        //         this.director.birdsEvent();
        //     }
        // });
        wx.onTouchStart(() => {
            if (this.director.isGameOver) {
                console.log('游戏开始');
                this.init();
            } else {
                this.director.birdsEvent();
            }
        })
    }
}