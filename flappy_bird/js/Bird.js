function Bird() {
    this.x = game.canvas.width / 2;
    this.y = 100;
    this.step = 0;
    // 旋转角度
    this.r = 0.1;
    // 下落增量
    this.dy = 0.3;

    // 小鸟的xxyy
    this.x1 = this.x - 57.67 / 2;   // this.x是鸟心，而this.x1是小鸟左边线，所以要减去宽度一半
    this.x2 = this.x + 57.67 / 2;
    this.y1 = this.y - 20;          // 小鸟的高度是40,20就是高度的一半
    this.y2 = this.y + 20;
}

Bird.prototype.update = function () {

    this.dy += 0.3;

    // 扑腾翅膀
    if (game.f % 6 == 0) {
        this.step++;
        if (this.step > 2) {
            this.step = 0;
        }
    }

    this.y += this.dy;
    this.r += 0.05;

    // 小鸟的xxyy
    this.x1 = this.x - 57.67 / 2;
    this.x2 = this.x + 57.67 / 2;
    this.y1 = this.y - 20;
    this.y2 = this.y + 20;

    // 判断鸟是否坠地
    if (this.y2 > game.canvas.height - 80 - 20) {
        // console.log('坠地了');
        game.gameover();
    }
}

Bird.prototype.rander = function () {
    // 保存画布
    game.ctx.save();
    // 将圆点移动至鸟中心
    game.ctx.translate(this.x, this.y);
    // 旋转
    game.ctx.rotate(this.r);
    game.ctx.drawImage(game.R.bird, 56.67 * this.step, 0, 56.67, 40, -56.67 / 2, -40 / 2, 56.67, 40);
    // 恢复
    game.ctx.restore();
}

Bird.prototype.fly = function () {
    this.dy = -5;
    // 让开始飞的这一瞬间，鸟头一定是斜向上的
    this.r = -0.5;
    // 播放声音
    document.getElementById('BirdFly').load();
    document.getElementById('BirdFly').play();
}