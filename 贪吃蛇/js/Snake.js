/**
 * Snack类
 * arr 数组属性
 * direction 方向属性
 */
function Snake(pic_obj) {   //有图片，直接传递参数
    this.arr = [
        {row:4, col:4}, //蛇尾的位置
        {row:4, col:5},
        {row:4, col:6},
        {row:4, col:7},
        {row:4, col:8}  //蛇头的位置
    ];   //数组属性
    // 定义方向属性
    //左37 上38 有39 下40
    this.direction = 39;
    this.lock = true;
    
    this.head_pic = pic_obj.head_pic;
    this.body_pic = pic_obj.body_pic;
    this.tail_pic = pic_obj.tail_pic;
    
    // 定义头部和尾部图片的索引
    this.head_idx = 2;
    this.tail_idx = 0;
    // var oldLenght = this.arr.length;
    // console.log(oldLenght);
}

// 定义蛇移动的方法
Snake.prototype.move = function() {
    var newHead = {
        // 设置蛇的新的头，是数组的最后一项
        row : this.arr[this.arr.length-1].row,
        col: this.arr[this.arr.length-1].col
    }
    // 根据移动的方向，添加蛇的头的位置
    if(this.direction  == 37) {
        // 当前新蛇头的移动是：行不变，列--
        newHead.col --;
    }else if(this.direction  == 38) {
        // 列不变，行--
        newHead.row --;
    }else if(this.direction  == 39) {
        // 行不变，列--
        newHead.col ++;
    }else if(this.direction  == 40) {
        // 列不变，行++
        newHead.row ++;
    }
    // 将蛇头放入数组的最后一项中
    this.arr.push(newHead);

    // 去掉蛇尾，也就是第一项
    this.arr.shift();

    // 将尾巴与尾巴前一项进行比较，判断尾巴的转向
    var tail = this.arr[0];
    var pg = this.arr[1];
    if(tail.row === pg.row){
        this.tail_idx = (tail.col > pg.col) ? 2:0;
    }else if(tail.col === pg.col){
        this.tail_idx = (tail.row > pg.row) ? 3:1;
    }
    // 移动后，开锁
    this.lock = true;
}

// 定义蛇转向方法
Snake.prototype.change = function(direction) {
    if(!this.lock){
        return;
    }
    // 将锁关闭
    this.lock = false;
    var result = Math.abs(direction - this.direction);
    if(result == 2 || result == 0){
        return;
    }else{
        this.direction = direction;
    }
    // 利用方向键转换蛇头
    if(direction == 37){
        this.head_idx = 0; 
    }else if(direction == 38){
        this.head_idx = 1; 
    }else if(direction == 39){
        this.head_idx = 2; 
    }else {
        this.head_idx = 3; 
    }
}

Snake.prototype.group = function() {
    // 创建蛇的尾部
    var tail = this.arr[0];
    // 将tail放进数组
    this.arr.unshift(tail);
}
Snake.prototype.num = function() {
    var arr0 = [];
    var fenshu = this.arr.length;
    arr0.push(fenshu);
    var a= arr0.length-1;
    var b = arr0[0];
    console.log(b-a);
}
