/*
*Block 障碍物
*
*/

function Block(img) {
    this.img = img;
    this.arr = [
        {row:2,col:2},
        {row:2,col:3},
        {row:2,col:4},
        {row:3,col:2},
        {row:4,col:2},

        {row:2,col:17},
        {row:2,col:16},
        {row:2,col:15},
        {row:3,col:17},
        {row:4,col:17},

        {row:15,col:2},
        {row:16,col:2},
        {row:17,col:2},
        {row:17,col:3},
        {row:17,col:4},

        {row:15,col:17},
        {row:16,col:17},
        {row:17,col:17},
        {row:17,col:16},
        {row:17,col:15}
    ];
}