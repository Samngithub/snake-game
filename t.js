$(document).ready(()=>{
  let can = $(".can")[0];
  ctx = can.getContext("2d");

  let snake = [],cell=10,length=5;

  for(i=0;i<length;i++){
    snake.push({x:i,y:25});
  };

  paintCell=(x,y)=>{
    ctx.fillStyle="red";
    ctx.fillRect(x*cell,y*cell,cell,cell);
    ctx.strokeStyle="black";
    ctx.strokeRect(x*cell,y*cell,cell,cell);
    };

  paintSnake=()=>{
    // canvas
    ctx.fillStyle="yellow";
    ctx.fillRect(0,0,500,500);

    snakex=snake[0].x;
    snakey=snake[0].y;
    d="right";
    if(d=="right"){
      snakex++
    }
    newHead = {x:snakex,y:snakey};
    snake.unshift(newHead);
    snake.pop();
    // paint snake
    snake.forEach((el)=>{paintCell(el.x,el.y)})
  }
  game = setInterval(paintSnake,100)


})