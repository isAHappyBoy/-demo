/**
 * Map 定义地图类
 * row、col width、height
 * 
 */
function Map(row,col,width,height) {
    this.row = row;
    this.col = col;
    this.width = width;
    this.height = height;
    this.arr = [];
    // 借助dom将元素渲染页面中
    this.dom = document.createElement("div");

}

// 定义填充方法
Map.prototype.fill = function() {
    // 利用循环遍历创建每一行
    for(var i=0; i<this.row; i++){
        // 创建行容器
        var row_dom = document.createElement("div");
        // 创建行数组
        var row_arr = [];
        // 为row_dom添加类名
        row_dom.className = "row";
        // 利用循环遍历将每一行填满小方格
        for(var j=0; j<this.col; j++){
            // 创建小方格容器
            var col_dom = document.createElement("span");
            col_dom.className = "grid";
            // 将创建的方格追加到行中
            row_dom.appendChild(col_dom);
            // 将小方格追加到行数组中
            row_arr.push(col_dom);
        }
        // 利用创建的行元素将地图填满
        this.dom.appendChild(row_dom);
        // 将row_arr放到自身的数组中
        this.arr.push(row_arr);
        // 给dom添加类名
        this.dom.className = "box";
    }
    // 上树
    document.body.appendChild(this.dom);
}

// 清屏
Map.prototype.clear = function() {
    for(var i=0; i< this.arr.length; i++){
        for(var j=0; j<this.arr[i].length; j++){
            // this.arr[i][j].style.backgroundColor = "white";
            this.arr[i][j].style.backgroundImage = "none";
        }
    }
}
