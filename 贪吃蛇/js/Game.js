/**
 * Game 游戏类
 * map: 地图类
 * food： 食物类
 * snack： 蛇类
 * block： 障碍物类
 */



function Game(map,food,snake,block,score) {
    this.map = map;
    this.food = food;
    this.snake = snake;
    this.block = block;
    this.score = score;
    this.timer = null;
    this.flag = null;
    this.init();

}

// 初始化方法
Game.prototype.init = function() {
    // 渲染地地图
    this.renderMap();
    // 渲染食物
    this.renderFood();
    // 运动方法
    this.start();
    // 蛇的运动方向
    this.bindEvent();
    // 重置食物
    this.resetFood();
    // 渲染蛇
    this.renderSnake();
    // 障碍物
    this.renderBlock();
    
}

// 渲染地图
Game.prototype.renderMap = function() {
    this.map.fill();
}

// 渲染食物
Game.prototype.renderFood = function() {
    var row  = this.food.row;
    var col = this.food.col;
    // this.map.arr[row][col].style.backgroundColor = "red";
    this.map.arr[row][col].style.backgroundImage = "url("+this.food.img+")";
    this.map.arr[row][col].style.backgroundSize = "cover";
}

// 渲染蛇类
Game.prototype.renderSnake = function() {
    // 设置蛇的头部
    var head = this.snake.arr[this.snake.arr.length-1];
    this.map.arr[head.row][head.col].style.backgroundImage = "url("+ this.snake.head_pic[this.snake.head_idx]+")";
    
    // 渲染蛇就是渲染蛇的每一节身体的坐标的背景颜色
    for(var i=1; i<=this.snake.arr.length - 2; i++){
        // 得到舍得每一节身体
        var row = this.snake.arr[i].row;
        var col = this.snake.arr[i].col;
        // this.map.arr[row][col].style.backgroundColor = "orange";
        this.map.arr[row][col].style.backgroundImage = "url("+ this.snake.body_pic[0]+")";
    }
    // 设置蛇的尾部
    var tail = this.snake.arr[0];
    this.map.arr[tail.row][tail.col].style.backgroundImage = "url("+ this.snake.tail_pic[this.snake.tail_idx]+")";
}

// 游戏开始
Game.prototype.start = function() {
    this.flag = true;
    // 备份this
    var me = this;
    this.timer = setInterval(function() {
        me.snake.move();
        me.checkMap();
        me.checkFood();  //是否吃到食物   
        me.checkSnake();    //检测蛇是不是已经吃到了自己
        me.checkBlock();     //判断蛇是否碰到障碍物
        me.getScore();
        if(me.flag){
            me.map.clear();     //进行清屏
            me.renderFood();    //渲染食物
            me.renderSnake();      //渲染蛇 
            me.renderBlock();     //障碍物
        }
    },200)
}

// 绑定事件，根据按下键盘的数值判断蛇的运动方向
Game.prototype.bindEvent = function() {
    // 备份
    var me = this;
    document.onkeydown = function(e) {
        var code = e.keyCode;
        if((code == 37) || (code == 38) || (code == 39) || (code == 40)){
            me.snake.change(code);
        }
    }
}

Game.prototype.gameOver = function() {
    this.flag = false;
    clearInterval(this.timer);
}

// 检测是否撞墙
Game.prototype.checkMap = function() {
    var head = this.snake.arr[this.snake.arr.length-1];
    // 用蛇的头部的位置与墙进行判断
    if(head.row<0 || head.row>=this.map.row || head.col<0 || head.col>=this.map.col){
        alert("游戏结束，蛇撞到墙了");
        this.gameOver();
    }
}

// 检测是否吃到食物
Game.prototype.checkFood = function() {
    // 获取头的头部
    var head =this.snake.arr[this.snake.arr.length-1];
    // 获取食物的坐标
    var food = this.food;
    // 比较头的row/col和头的row/col，是否相等
    if((head.row == food.row)&&(head.col == food.col)){
        console.log("已经吃到食物了");
        // 调用蛇的生长方法
        this.snake.group();
        this.resetFood();
    }
}

// 设置重置食物的方法
Game.prototype.resetFood = function() {
    // 随机生成食物的坐标
    var row = parseInt(Math.random() * this.map.row);
    var col = parseInt(Math.random() * this.map.col);
    // 判断食物与蛇是否重合
    for(var i=0; i<this.snake.arr.length; i++){
        var one = this.snake.arr[i];
        if(one.row == row && one.col == col ) {
            console.log("食物与蛇重合了");
            this.resetFood();
            return;
        }
    }
    this.food.resetFood(row,col);

    // 判断食物与障碍物是否重合
    for(var i=0; i<this.block.arr.length; i++){
        var one = this.block.arr[i];
        if(one.row == row && one.col == col ) {
            console.log("食物与障碍物重合了");
            this.resetFood();
            return;
        }
    }
    this.food.resetFood(row,col);
}
// 检测蛇是不是已经吃到了自己
Game.prototype.checkSnake = function() {
    // 获取蛇的头部
    var head = this.snake.arr[this.snake.arr.length-1];
    // 用蛇的头部与蛇的身体进行比较
    for(var i=0; i<this.snake.arr.length-1; i++){
        var one = this.snake.arr[i];
        if(one.row == head.row && one.col == head.col){
            alert("游戏结束，蛇已经吃到了自己");
            this.gameOver();
        }
    }
}

// 定义渲染障碍物
Game.prototype.renderBlock = function() {
    for(var i=0; i<this.block.arr.length; i++){
        var row = this.block.arr[i].row;
        var col = this.block.arr[i].col;
        // this.map.arr[row][col].style.backgroundColor = "red";
        this.map.arr[row][col].style.backgroundImage = "url("+this.block.img+")";
        this.map.arr[row][col].style.backgroundSize = "cover";
    }
}

// 判断蛇是否碰到障碍物
Game.prototype.checkBlock = function() {
    var head = this.snake.arr[this.snake.arr.length-1];
    for(var i=0; i<this.block.arr.length; i++){
        var one = this.block.arr[i];
        if(head.row === one.row && head.col === one.col){
            alert("蛇已经碰到障碍去了，游戏结束,");
            this.gameOver();
        }
    }
}

// 创建得到分数的方法
Game.prototype.getScore = function() {
    2911941619    

}
