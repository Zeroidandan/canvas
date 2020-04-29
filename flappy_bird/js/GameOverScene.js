function GameOverScene() {
    // 死亡场景，在游戏结束后调用
    // 帧编号，在调用后开始
    this.f = 0;
}

GameOverScene.prototype.update = function () {
    this.f++;
    // 帧编号大致在40时，调用
    if (this.f < 40) {
        this.gameY = this.f * 6 - 54;
    }
}

GameOverScene.prototype.rander = function () {
    // 渲染图片
    game.ctx.drawImage(game.R['gameover'], game.canvas.width / 2 - 204 / 2, this.gameY);
    // 死亡之后40帧之后，显示按钮
    if(this.f > 40) {
        game.ctx.drawImage(game.R['btn'], game.canvas.width / 2 - 116 / 2, 280);
    }
}