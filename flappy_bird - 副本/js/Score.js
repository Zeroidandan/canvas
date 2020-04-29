function Score() {

}

// 居中显示
Score.prototype.rander = function () {
    // 将分数转化为字符串
    var scoreStr = game.score.toString();
    // // 分数位数是奇数还是偶数
    if (scoreStr.length % 2 == 1) {
        // 计算左基准线，比如是5位数，那么减去2个30，和半个12。
        var baseY = game.canvas.width /2- parseInt(scoreStr.length / 2) * 30 - 12;
    } else {
        var baseY = game.canvas.width /2- scoreStr.length / 2 * 30 + 3;
    }

    // 渲染分数
    for (let i = 0; i < scoreStr.length; i++) {
        game.ctx.drawImage(game.R[scoreStr[i]], baseY + i * 30, 100);
    }
}