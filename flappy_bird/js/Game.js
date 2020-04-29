function Game() {
    // 构造函数的this是实例
    // 得到画布。设置为实例的属性，即实例有一个属性叫做canvas
    this.canvas = document.getElementById('canvas');
    this.ctx = this.canvas.getContext('2d');

    // 图片加载完毕后，游戏在执行
    // 全部图片数组
    var allimages = [
        { 'alias': 'bird', 'path': 'images/bird.png' },
        { 'alias': 'bg', 'path': 'images/background.png' },
        { 'alias': 'pipe1', 'path': 'images/pipe1.png' },
        { 'alias': 'pipe2', 'path': 'images/pipe2.png' },
        { 'alias': 'land', 'path': 'images/ground.png' },
        { 'alias': '0', 'path': 'images/0.png' },
        { 'alias': '1', 'path': 'images/1.png' },
        { 'alias': '2', 'path': 'images/2.png' },
        { 'alias': '3', 'path': 'images/3.png' },
        { 'alias': '4', 'path': 'images/4.png' },
        { 'alias': '5', 'path': 'images/5.png' },
        { 'alias': '6', 'path': 'images/6.png' },
        { 'alias': '7', 'path': 'images/7.png' },
        { 'alias': '8', 'path': 'images/8.png' },
        { 'alias': '9', 'path': 'images/9.png' },
        { 'alias': 'gameover', 'path': 'images/gameover.png' },
        { 'alias': 'btn', 'path': 'images/btn.png' }
    ];
    // 图片资源对象，加载好一个就在里面添加一个属性
    this.R = {};
    // 备份
    var self = this;
    // 设置显示图片加载字样
    this.ctx.font = '30px 微软雅黑';
    this.ctx.textAlign = 'center';

    //遍历allimages数组，每遍历一个对象，就创建一个img对象，写着img的src和onload
    for (let i = 0; i < allimages.length; i++) {
        (function (i) {
            // 创建一个图片对象
            var img = new Image();
            // 监听图片onload
            img.onload = function () {
                // 加载好一个图片就给R对象设置一个和alias同名的属性
                self.R[allimages[i].alias] = img;
                // 清屏
                self.ctx.clearRect(0, 0, self.canvas.width, self.canvas.height);
                // 显示加载字样
                self.ctx.fillText(
                    '正在加载图片' + Object.keys(self.R).length + '/' + allimages.length,
                    self.canvas.width / 2,
                    self.canvas.height / 2
                );
                // 不知道图片的加载顺序，所有判断长度是否相同
                if (Object.keys(self.R).length == allimages.length) {
                    // 图片加载完毕开始定时器
                    self.start();
                }
            }
            // 设置图片的src属性
            img.src = allimages[i].path;
        })(i);
    }
}

Game.prototype.start = function () {
    // 备份
    var self = this;
    // 帧编号
    this.f = 0;
    this.ctx.font = '15px 宋体';

    // 实例化大地
    this.land = new Land();
    // 管子很多，需要数组
    this.pipeArr = [];
    // 实例化小鸟
    this.bird = new Bird();
    //小鸟添加监听
    this.canvas.onmousedown = function() {
        self.bird.fly();
    }
    // 实例化分数，Instance是实例的意思
    this.scoreInstance = new Score();
    // 过关分数
    this.score = 0;

    // 是否已经死亡
    this.isGameover = false;
    // 自己的死亡场景
    this.gameoverscene = null;

    // 添加监听
    this.canvas.onmousedown = function (e) {
        if (!self.isGameover) {
            self.bird.fly();
        } else {
            // 当已经死亡了，并且死亡超过了40帧，并且点击的位置也在按钮上
            if (self.gameoverscene.f > 40) {
                if (
                    e.offsetX > self.canvas.width / 2 - 58 && e.offsetX < self.canvas.width / 2 + 58
                    &&
                    e.offsetY > 280 && e.offsetY < 280 + 70
                ) {
                    // alert('你点击了按钮');
                    // 恢复游戏
                    self.score = 0;
                    self.bird = new Bird();
                    self.pipeArr = [];
                    self.isGameover = false;
                }
            }
        }
    }

    // 定时器
    setInterval(function () {
        // 清屏
        self.ctx.clearRect(0, 0, self.canvas.width, self.canvas.height);
        // 设置帧编号
        self.f++;
        self.ctx.fillText(self.f, 20, 15);

        // 渲染背景
        self.ctx.drawImage(self.R['bg'], 0, 0, self.canvas.width, self.canvas.height - 80);

        // 每一帧都要调用大地的更新和渲染方法
        !self.isGameover && self.land.update();
        self.land.rander();

        // 判断帧编号出现管子
        if (self.f % 150 == 0) {
            new Pipe();
        }
        // 遍历管子数组。调用方法
        for (var i = 0; i < self.pipeArr.length; i++) {
            !self.isGameover && self.pipeArr[i].update();
            self.pipeArr[i].rander();
        }

        // 调用小鸟
        !self.isGameover && self.bird.update();
        self.bird.rander();

        // 调用分数渲染
        self.scoreInstance.rander();

        // 渲染死亡场景
        if (self.isGameover) {
            self.gameoverscene.update();
            self.gameoverscene.rander();
        }
    }, 20);
}

// 死亡
Game.prototype.gameover = function(){
    this.isGameover =true;
    // 死亡后调用
    this.gameoverscene = new GameOverScene();
    document.getElementById('over').play();
}