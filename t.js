$(document).ready(()=>{
  initGame()
})
initGame=()=>{
  let can = $(".can")[0];
  ctx = can.getContext("2d");
  let snake = [],cell=10,length=5,d="right",score=0,canDim=500;

  for(i=0 ; i<length; i++){snake.push({x:5,y:i})}
 
  food={
    x:Math.floor(Math.random()*(canDim/cell)),
    y:Math.floor(Math.random()*(canDim/cell))
  }
  paintCell=(x,y,strokeColor,fillColor)=>{
    ctx.fillStyle=fillColor;
    ctx.fillRect(x*cell,y*cell,cell,cell);
    ctx.strokeStyle=strokeColor;
    ctx.strokeRect(x*cell,y*cell,cell,cell);
    };



  playGame=()=>{
    function check_collision(head, budy){
      for(let i = 0;i < budy.length; i++){
       if(head.x == budy[i].x && head.y == budy[i].y){
        return true
       }
      }
    }
    function appendLoose() {
      var para = document.createElement("P");
      var t = document.createTextNode("you lost, press the button to play again.");
      para.appendChild(t);
      document.querySelector(".header").appendChild(para); 
      para.setAttribute("class", "loose")
  }
    // canvas
    ctx.fillStyle = "lightgreen";
    ctx.fillRect(0,0,canDim,canDim);

    snakex=snake[0].x;
    snakey=snake[0].y;
   
    if(snakex==food.x && snakey==food.y){
      food={
        x:Math.floor(Math.random()*(canDim/cell)),
        y:Math.floor(Math.random()*(canDim/cell))
      }
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

    let snakeBudy = snake.slice(1,snake.length)

    snake.unshift(newHead);

    // paint snake
    snake.forEach((el)=>{paintCell(el.x,el.y,"black","red")})
    // paint food
    paintCell(food.x,food.y,"black","yellow");
    // restart
    $(".btn").click(()=>{
      $( ".loose" ).remove();
      clearInterval(game)
      initGame()})
    // game fails
    if(snakex>=(canDim/cell)||snakex<0||snakey>=(canDim/cell)||snakey<0|| check_collision(newHead,snakeBudy)){
    
    appendLoose()
      clearInterval(game)
    }
    $(".scoreValue").text(score)
  }
  
  game = setInterval(playGame,100)
  $(document).keypress(()=>{location.reload()})
  
}


