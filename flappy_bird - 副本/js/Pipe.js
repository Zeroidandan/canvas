function Pipe() {
    // 管子的坐标
    this.x = game.canvas.width;
    // 随机一个上管子高度
    this.pipe2H = parseInt(Math.random() * 300) + 40;
    // 空隙
    this.kong = 200;
    this.pipe1H = game.canvas.height - this.pipe2H - 80 - this.kong;

    // 判断撞击
    this.x1 = this.x;
    this.x2 = this.x + 90;
    this.y1 = this.pipe2H;                  //上管子高
    this.y2 = this.pipe2H + this.kong;      //上管子高+空

    // 管子是否被加分
    this.isaddScore = false;

    // 加入管子数组
    game.pipeArr.push(this);
}

Pipe.prototype.update = function () {
    this.x -= 2;
    // 管子出画布。删除
    if (this.x < -80) {
        for (let i = 0; i < game.pipeArr.length; i++) {
            if (game.pipeArr[i] == this) {
                game.pipeArr.splice(i, 1);
            }
        }
    }
    // 更新管子的xxyy
    this.x1 = this.x;
    this.x2 = this.x + 90;
    this.y1 = this.pipe2H;
    this.y2 = this.pipe2H + this.kong;

    // 判断撞击，判断管子撞鸟，一个管子撞鸟，不是鸟撞无数管子
    if (
        (this.y1 > game.bird.y1 && this.x1 < game.bird.x2 && this.x2 > game.bird.x1)
        ||
        (this.y2 < game.bird.y2 && this.x1 < game.bird.x2 && this.x2 > game.bird.x1)
    ) {
        // console.log('撞击管子，Game Over！');
        game.gameover();
    }

    // 判断管子加分
    if (!this.isaddScore && game.bird.x1 > this.x2) {
        // 加分
        game.score++;
        this.isaddScore = true;
        // 播放得分声音
        document.getElementById('getscore').play();
    }

}

Pipe.prototype.rander = function () {
    // game.ctx.drawImage(game.R['pipe1'], 100, 100);
    // 上管子
    game.ctx.drawImage(game.R['pipe1'], 0, 517 - this.pipe2H, 90, this.pipe2H, this.x, 0, 90, this.pipe2H);
    // 下管子
    game.ctx.drawImage(game.R['pipe2'], 0, 0, 90, this.pipe1H, this.x, this.pipe2H + this.kong, 90, this.pipe1H);
}