//小鸟类
import {Sprite} from '../base/Sprite.js'
export class Birds extends Sprite {
    constructor() {
        const image = Sprite.getImage('birds');
        super(image,
            0, 0,
            image.width,
            image.height,
            0, 0, image.width,
            image.height);
        this.clippingX = [9, 9 + 34 + 18, 9 + 34 + 18 + 34 + 18]; //左右单边距9 鸟宽34
        this.clippingY = [10, 10, 10]; //上下单边距10
        this.clippingWidht = [34, 34, 34]; //小鸟宽度34
        this.clippingHeight = [24, 24, 24]; //鸟高度24
        const birdX = window.innerWidth / 4;
        this.birdsX = [birdX, birdX, birdX];
        const birdY = window.innerHeight / 2;
        this.birdsY = [birdY, birdY, birdY];
        const birdWidth = 34;
        this.birdsWidth = [birdWidth, birdWidth, birdWidth];
        const birdHeight = 24;
        this.birdsHeight = [birdHeight, birdHeight, birdHeight];
        this.y = [birdY, birdY, birdY];
        this.index = 0;
        this.count = 0;
        this.time = 0;
    }

    draw() {
        const speed = 0.2;
        const g = 0.98 / 2.5; //假设重力加速度
        const offsetUp = 30; //向上偏移
        this.count += speed;
        if (this.index >= 2) {
            this.count = 0;
        }
        this.index = Math.floor(this.count);//减速器
        const offsetY = (g * this.time * (this.time - offsetUp)) / 2; //自由落体
        for (let i = 0; i <= 2; i++) {
            this.birdsY[i] = this.y[i] + offsetY;
        }
        this.time++;
        super.draw(
            this.img,
            this.clippingX[this.index], this.clippingY[this.index],
            this.clippingWidht[this.index], this.clippingHeight[this.index],
            this.birdsX[this.index], this.birdsY[this.index],
            this.birdsWidth[this.index], this.birdsHeight[this.index]
        )
    }
}