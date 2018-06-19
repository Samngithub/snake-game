$(document).ready(()=>{
  let can = $(".can")[0];
  ctx = can.getContext("2d");

  let snake = [],cell=10,length=5,d="right",score=0,canDim=500;

  for(i=0;i<length;i++){
    snake.push({x:i,y:25});
  };
  food={
    x:Math.floor(Math.random()*(canDim/cell)),
    y:Math.floor(Math.random()*(canDim/cell))
  }
  paintCell=(x,y,strokeColor,fillColor)=>{
    // ctx.fillStyle="red";
    ctx.fillStyle=fillColor;
    ctx.fillRect(x*cell,y*cell,cell,cell);
    ctx.strokeStyle=strokeColor;
    // ctx.strokeStyle="black";
    ctx.strokeRect(x*cell,y*cell,cell,cell);
    };

  paintSnake=()=>{
    // canvas
    ctx.fillStyle="lightgreen";
    ctx.fillRect(0,0,canDim,canDim);

    snakex=snake[0].x;
    snakey=snake[0].y;
   
  
    if(snakex==food.x && snakey==food.y){
      food={
        x:Math.floor(Math.random()*(canDim/cell)),
        y:Math.floor(Math.random()*(canDim/cell))
      }
      console.log("food been eaten")
      score += 1;
    }else {
      snake.pop();
    }

    if(d=="right"){
      snakex++
    }else if(d=="up"){
      snakey--
    }else if(d=="down"){
      snakey++
    }else if(d=="left"){
      snakex--
    }
    
    $(document).keydown((eve)=>{
      key=eve.which;
      if(key==37 && d!="right"){
        d="left"
      }else if(key==38 && d!="down"){
        d="up"
      }else if(key==39 && d!="left"){
        d="right"
      }else if(key==40 && d!="up"){
        d="down"
      };
    })
    
  
    newHead = {x:snakex,y:snakey};
    snake.unshift(newHead);
 
    // paint snake
    snake.forEach((el)=>{paintCell(el.x,el.y,"black","red")})
    // paint food
    paintCell(food.x,food.y,"black","yellow");
    // restart
    $(".btn").click(()=>{location.reload()})
    // game fails
    if(snakex>=(canDim/cell)||snakex<0||snakey>=(canDim/cell)||snakey<0){
      clearInterval(game)
    }
    $(".scoreValue").text(score)
    checkcolition=()=>{}
  }
  game = setInterval(paintSnake,100)
  $(document).keypress(()=>{location.reload()})
  
})