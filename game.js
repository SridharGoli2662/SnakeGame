//game constants
let inputdir = { x: 0, y: 0 };
const foodSound = new Audio("music/food.mp3");
const gameoverSound = new Audio("music/gameover.mp3");
const moveSound = new Audio("music/move.mp3");
const musicSound = new Audio("music/music.mp3");
let speed = 4;
let score=0;
let lastPaintTime = 0;
let snakeArray = [{ x: 15, y: 5}]  
foodobj = { x: 10, y: 9 };   
//game functions
// game loop......
function main(fps) {
   
    window.requestAnimationFrame(main);
    // if(score>5)
    // {
    //      speed=10;
    // }   
    if ((fps - lastPaintTime) / 1000 < 1 / speed) {
        return;
    }
    lastPaintTime = fps;
    gameEngine();
}
function gameover(snkarr)
{   //self kill
    for(let i=1;i<snakeArray.length;i++)
    {
        if(snkarr[0].x===snkarr[i].x && snkarr[0].y===snkarr[i].y)
        {
            return true;
        }
    }
    // box collide
    if(snkarr[0].x>=18 || snkarr[0].x<=0 || snkarr[0].y>=18 || snkarr[0].y<=0)
    {
        return true;
    }
    return false;
}
function gameEngine() {
    
//collidial state
 if(gameover(snakeArray))
 {
    
    gameoverSound.play();
    // musicSound.pause();
    console.log(score)
    inputdir = { x: 0, y: 0 };
    alert("Game Over Press any key to Continue.....")
    // let ans=confirm("do you want to continue")
    // if(ans)
    // {
    //     location.reload();
    // }
    snakeArray = [{ x: 15, y: 5}];
    // musicSound.play();
    score = 0; 
    document.getElementById('scoree').innerHTML="score:"+score;

    // speed=4;
 }
    // part1:: updating the snake array and food
    if(snakeArray[0].x===foodobj.x && snakeArray[0].y===foodobj.y)
    {
        foodSound.play();
        score+=1;
        // hiscoreval=localStorage.getItem('hiscore')
        if(score>hiscore)
        {
            hiscoreval=score;
            localStorage.setItem("hiscore",JSON.stringify(hiscoreval))
            highscorebox.innerHTML="HighScore: "+hiscoreval;
        }
        document.getElementById('scoree').innerHTML="score:"+score;
        snakeArray.unshift({x: snakeArray[0].x + inputdir.x, y: snakeArray[0].y + inputdir.y});
        let a = 2;
        let b = 16;
        foodobj = {x: Math.round(a + (b-a)* Math.random()), y: Math.round(a + (b-a)* Math.random())}
    }
    for(let i=snakeArray.length-2;i>=0;i--)
    {
        snakeArray[i+1]= {...snakeArray[i]};
    }
    snakeArray[0].x += inputdir.x;
    snakeArray[0].y += inputdir.y;
    //part2:: display the snake and food
    //creating of head and body
    box.innerHTML = "";
    snakeArray.forEach((e, index) => {
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if (index === 0) {
            snakeElement.classList.add('head');
        }
        else {
            snakeElement.classList.add('body');
        }
        box.appendChild(snakeElement);
    });
    // creating of food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = foodobj.y;
    foodElement.style.gridColumnStart = foodobj.x;
    foodElement.classList.add('food');
    box.appendChild(foodElement);
}
//game execution starts from here
// prompt("enter your name")
window.requestAnimationFrame(main);

//highscore
let hiscore=localStorage.getItem("hiscore");
if(hiscore==null)
{
    hiscoreval=0;
    localStorage.setItem("hiscore",JSON.stringify(hiscoreval));
}
else{
    hiscoreval=JSON.parse(hiscore);
    highscorebox.innerHTML="HighScore: "+hiscore;
}

//code for keys
window.addEventListener('keydown', e => {
    inputdir={x:0,y:0};
    moveSound.play();
    switch (e.key) {
        case 'ArrowUp':
            console.log("ArrowUp");
            inputdir.x=0;
            inputdir.y=-1;
            break;
        case 'ArrowDown':
            console.log("ArrowDown");
            inputdir.x=0;
            inputdir.y=1;
            break;
        case 'ArrowLeft':
            console.log("ArrowLeft");
            inputdir.x=-1;
            inputdir.y=0;
            break;
        case 'ArrowRight':
            console.log("ArrowRight");
            inputdir.x=1;
            inputdir.y=0;
            break;
        default:
            break;
    }
})
