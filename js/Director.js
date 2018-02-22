//导演类，控制游戏主流程
import {DataStore} from './base/DataStore.js'
import {UpPencil} from './runtime/UpPencil.js'
import {DownPencil} from './runtime/DownPencil.js'

export class Director {
    constructor() {
        this.dataStore = DataStore.getInstance();
        this.moveSpeed = 2;
    }

    static getInstance() {
        if (!Director.instance) {
            Director.instance = new Director();
        }
        return Director.instance;
    }

    createPencil() {
        const minTop = window.innerHeight / 8;
        const maxTop = window.innerHeight / 2;
        const top = minTop + Math.random() * (maxTop - minTop);
        this.dataStore.get('pencils').push(new UpPencil(top));
        this.dataStore.get('pencils').push(new DownPencil(top));
    }

    //让鸟飞起来
    birdsEvent() {
        for (let i = 0; i <= 2; i++) {
            this.dataStore.get('birds').y[i] = this.dataStore.get('birds').birdsY[i];
        }
        this.dataStore.get('birds').time = 0;
    }

    //是否和铅笔撞击
    static isStrike(bird, pencil) {
        let s = false;
        if(bird.top>pencil.bottom || bird.bottom<pencil.top ||
            bird.right<pencil.left || bird.left>pencil.right){
            s = true;
        }
        return !s;
    }

    //实现撞击地面和铅笔判断
    check() {
        const birds = this.dataStore.get('birds');
        const land = this.dataStore.get('land');
        const pencils = this.dataStore.get('pencils');
        if (birds.birdsY[0] + birds.birdsHeight[0] >= land.y) {
            console.log('撞击地板');
            this.isGameOver = true;
        }

        //小鸟的边框
        const birdsBorder = {
            top: birds.y[0],
            right: birds.birdsX[0] + birds.birdsWidth[0],
            bottom: birds.y[0] + birds.birdsHeight[0],
            left: birds.birdsX[0],
        };
        //铅笔的边框
        const length = pencils.length;
        for (let i = 0; i < length; i++) {
            const pencil = pencils[i];
            const pencilBorder = {
                top: pencil.y,
                bottom: pencil.y + pencil.height,
                left: pencil.x,
                right: pencil.x + pencil.width,
            };

            if(Director.isStrike(birdsBorder, pencilBorder)){
                console.log('撞击到铅笔');
                this.isGameOver = true;
                return;
            }
        }
    }

    run() {
        this.check();
        if (!this.isGameOver) {
            this.dataStore.get("background").draw();
            const pencils = this.dataStore.get('pencils');
            if (pencils[0].x + pencils[0].width <= 0 && pencils.length === 4) {
                pencils.shift();
                pencils.shift();
            }
            if (pencils[0].x <= (window.innerWidth - pencils[0].width) / 2 && pencils.length === 2) {
                this.createPencil();
            }
            this.dataStore.get('pencils').forEach(function (value) {
                value.draw();
            });
            this.dataStore.get('land').draw();
            this.dataStore.get('birds').draw();
            let timer = requestAnimationFrame(() => this.run()); //用于动画，刷新率有浏览器决定，性能好
            this.dataStore.put('timer', timer);
        } else {
            console.log('GameOver');
            cancelAnimationFrame(this.dataStore.get('timer'));
            this.dataStore.destory();
        }
    }
}