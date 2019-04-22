/**
 * Food定义食物类
 * x:食物的X位置
 * y:食物的Y位子
*/
function Food(x,y,img) {
    // 食物的x,y位置
    this.row = x;
    this.col = y;
    this.img = img;
}
Food.prototype.resetFood = function(row,col) {
    this.row = row;
    this.col = col;
}