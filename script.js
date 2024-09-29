let inputDir={x:0,y:0};
let score=0;
let speed=10;
let lastpainttime=0;
let snake_arr=[{x:10,y:10}];
let food={x:6,y:7};
function main(ctime){
    window.requestAnimationFrame(main);
    if((ctime-lastpainttime)/1000 < 1/speed){
        return;
    }
    lastpainttime=ctime;
    game_play();
}
function collision(snake){
    for(let i=1;i<snake.length;i++){
     if(snake[i].x===snake[0].x && snake[i].y===snake[0].y){
        return true;
    }
    }
     if(snake[0].x >= 25 || snake[0].x <=0 || snake[0].y >= 25 || snake[0].y <=0){
        return true;
    }
    return false;
}

function game_play(){
    if(collision(snake_arr)){
        inputDir={x:0,y:0};
        alert("Game Over. Press any key for New Game");
        snake_arr=[{x:10,y:10}];
        score=0;
    }
    if(snake_arr[0].x===food.x && snake_arr[0].y===food.y){
        score=score+1;
        if(score>highscoreval){
            highscoreval=score;
            localStorage.setItem("highscore",JSON.stringify(highscoreval));
            document.getElementById("highscore").innerHTML="Highscore : " + highscoreval;
        }
        document.getElementById("score").innerHTML ="Score : "+ score;
        snake_arr.unshift({x: snake_arr[0].x +inputDir.x , y: snake_arr[0].y+ inputDir.y});
        let a = 0;
        let b = 25;
        food = {x: Math.round(a + (b-a)* Math.random()), y: Math.round(a + (b-a)* Math.random())}
    }
    for(let i=snake_arr.length-2;i>=0;i--){
        snake_arr[i+1]={...snake_arr[i]};
    }      
    snake_arr[0].x+=inputDir.x;
    snake_arr[0].y+=inputDir.y;
    board.innerHTML="";
    snake_arr.forEach((e,index)=>{
        snakeElement=document.createElement('div');
        snakeElement.style.gridRowStart=e.y;
        snakeElement.style.gridColumnStart=e.x;
        if(index===0){
            snakeElement.classList.add('head');
        }
        else{
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    });
    foodElement=document.createElement('div');
    foodElement.style.gridRowStart=food.y;
    foodElement.style.gridColumnStart=food.x;
    foodElement.classList.add("food");
    board.appendChild(foodElement);
}
let highscore=localStorage.getItem("highscore");
if(highscore===null){
    highscoreval=0;
    localStorage.setItem("highscore",JSON.stringify(highscoreval));
}
else{
    highscoreval=JSON.parse(highscore);
    document.getElementById("highscoreval").innerHTML="Highscore :" + highscoreval;
}
window.requestAnimationFrame(main);
window.addEventListener('keydown',e=>{
    inputDir={x:0,y:1};
    switch(e.key){
        case "ArrowUp":
        inputDir.x=0;
        inputDir.y=-1;
        p=1;
        break;

        case "ArrowDown":
            inputDir.x=0;
            inputDir.y=1;
            break;

        case "ArrowLeft":  
            inputDir.x=-1;
            inputDir.y=0;
            break;

        case "ArrowRight":
            inputDir.x=1;
            inputDir.y=0;
            p=2;
            break;

        default:
            break;
    }
});
