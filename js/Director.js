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

    run() {
        if(!this.isGameOver){
            this.dataStore.get("background").draw();
            const penclis = this.dataStore.get('pencils');
            if (penclis[0].x + penclis[0].width <= 0 && penclis.length ===4) {
                penclis.shift();
                penclis.shift();
            }
            if(penclis[0].x<=(window.innerWidth-penclis[0].width)/2&& penclis.length ===2) {
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
            cancelAnimationFrame(this.dataStore.get('timer'));
            this.dataStore.destory();
        }
    }
}