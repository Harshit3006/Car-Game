const score = document.querySelector('.score');
const startScreen = document.querySelector('.startScreen');
const gameArea = document.querySelector('.gameArea');

// console.log(gameArea);

//jaise he apan startscreen pe click krenge game start ho jayega
//ek start naam ka function invoke hoga
startScreen.addEventListener('click', start);

//apan ne ek empty object banaya
let player = { speed: 10, score: 0};

//keys ki apni car move kaise kregi
let keys = {ArrowUp: false , ArrowDown: false , ArrowRight: false , ArrowLeft: false};

document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);

function keyDown(e) {
    e.preventDefault();
    keys[e.key] = true;
    // console.log(e.key);
    // console.log(keys);
}
function keyUp(e) {
    e.preventDefault();
    keys[e.key] = false;
    // console.log(keys);
}
//keys END!!


function isColide(a, b) {
    aRect = a.getBoundingClientRect();
    bRect = b.getBoundingClientRect();


    return !((aRect.bottom < bRect.top) || (aRect.top > bRect.bottom) || (aRect.right < bRect.left) || (aRect.left > bRect.right));
}

//lines ko move karane ka function 
//isme apan ne pahle sari line select kri h fir foreach loop ki madat se lines ke top ko move kra h
function moveLines() {
    let lines = document.querySelectorAll('.lines');

    lines.forEach(function(item){

        if(item.y >= 1300){
            item.y -= 1350
        }
        item.y += player.speed;
        item.style.top =  item.y + "px";
    })
}

function endGame() {
    player.start = false;
    startScreen.classList.remove('hide');

    startScreen.innerHTML = "Game Over <br> Your Final Score is: " + (player.score + 1) + "<br> Press again to restart the game"

}


//enemy ko move karana
function moveEnemy(car) {
    let enemy = document.querySelectorAll('.enemy');

    enemy.forEach(function(item){

        if(isColide(car, item)){
            console.log("BOOM HITT!!!!!");
            endGame();
        }

        if(item.y >= 1100){
            item.y = -100
            item.style.left =   Math.floor(Math.random() * 350) + "px";

        }
        item.y += player.speed;
        item.style.top =  item.y + "px";
    })
}

function gamePlay() {
    // console.log('Hey i am Clicked!!!');
    let car = document.querySelector('.car'); 
    
    //isse apan ne road banaya or uski parameters liye 
    let road = gameArea.getBoundingClientRect();
    // console.log(road);

    

    if(player.start){
        
        //lines and enemy ko move krana 
        moveLines();
        moveEnemy(car);
        
        //car ko move krana 
        if(keys.ArrowUp && player.y > (road.top + 140)) { player.y -= player.speed}
        if(keys.ArrowDown && player.y < (road.bottom - 70)) { player.y += player.speed}
        if(keys.ArrowLeft && player.x > 0) { player.x -= player.speed}
        if(keys.ArrowRight && player.x < road.width - 50) { player.x += player.speed}
        
        car.style.top = player.y + "px";
        car.style.left = player.x + "px";
        //car ko move karana ENDS!!!!


        window.requestAnimationFrame(gamePlay);

        // console.log(player.score++);
        player.score++
        score.innerHTML = "Score: " + player.score;
    }

}

function start() {

    // gameArea.classList.remove('hide');
    startScreen.classList.add('hide');
    gameArea.innerHTML = "";

    player.start = true;
    player.score = 0;
    window.requestAnimationFrame(gamePlay);

    //roadline bhi apna ne javascript se banai h 
    //jaise apn ne pahle banaya tha html ki jagah JS se he apn ne nya di with class lines 
    //or phir apan ne loops ka use kiya h roadline ko copy krne ke liye 
    for(x=0;x<10;x++){
        let roadLine = document.createElement('div');
        roadLine.setAttribute('class', 'lines');
        roadLine.y = (x*150);
        roadLine.style.top =  roadLine.y + "px";
        gameArea.appendChild(roadLine);

    }


    //abb game start ho chuka h
    //apan ne div naam ka section banaya h usme car naam diya h class ko or usme kuch text likha h
    let car = document.createElement('div');
    car.setAttribute('class','car');
    // car.innerText = "Hey I am your car";

    //isse car attribute apne gamearea ke andr chla gaya 
    gameArea.appendChild(car);


    player.x = car.offsetLeft;
    player.y = car.offsetTop;

    // console.log(car.offsetTop);
    // console.log(car.offsetLeft);


    //hmne ek div banaya or usko class di enemy 
    for(x=0;x<3;x++){
        let enemyCar = document.createElement('div');
        enemyCar.setAttribute('class', 'enemy');
        // enemyCar.innerText = x+1;
        enemyCar.y = ((x+1) * 350) * -1;
        enemyCar.style.top =  enemyCar.y + "px";

        enemyCar.style.backgroundColor = randomColor();
        //enemy ka color change kr diya
        // enemyCar.style.backgroundColor = 'blue';

        //enemy ki position change kr diya 
        //* 350 islie kra h kyoki random function sirf 1 se chhoto value deta h random is liye pahle * 350 krke floor kra
        enemyCar.style.left =   Math.floor(Math.random() * 350) + "px";

        gameArea.appendChild(enemyCar);

    }
}

function randomColor() {
    function c() {

        //apan ne tostring isliye add kiya kyoki ye number ko hexadecimal string me convert krta  h 
        let hex = (Math.floor(Math.random()*256)).toString(16);

        //substr(-2) se last ke 2 digit he aayenge
        return ("0" + String(hex)).substr(-2);
        
    }
    return ('#'+ c() + c() + c());
}