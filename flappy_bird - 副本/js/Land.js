function Land() {
    // 大地图片的第一个小图
    this.x = 0;
}

Land.prototype.update = function () {
    this.x--;
    // 拉回图片
    if (this.x < -23.125) {
        this.x = 0;
    }
};

Land.prototype.rander = function () {
    // 画满整个画布
    for (var i = 0; i < 22; i++) {
        game.ctx.drawImage(game.R['land'], 23.125 * i + this.x, game.canvas.height - 80, 23.125, 80);
    }
};