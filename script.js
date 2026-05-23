const btnStart = document.getElementById('start');
const btnRestart = document.getElementById('restart');
let div2 = document.getElementById('div2');
//canvas
let canvas;
let boardWidth = 600;
let boardHeight = 700;
let context;
//airplane
let turn = 0;
let toUp = 0;
let airplaneWidth = 60;
let airplaneHeight = 80;
let airplaneX = boardWidth / 2 - 30 + turn;
let airplaneY = 700 - airplaneHeight;
let airplaneImg;
let airplane = {
    x: airplaneX, y: airplaneY, width: airplaneWidth, height: airplaneHeight
};
//airplane end
//ball
let balls = [];
let ball;
let ballTurn = 0;
let ballWidth = 50;
let ballHeight = 50;
let ballX;
let ballY = 0;
let ballImg;
let animation = null;
//end ball
//bullet
let bullets = [];
let bullet;
let bulletWidth = 30;
let bulletHeight = 30;
let bulletY = 300;
let bulletX = 300;
let bulletImg;
//end bullet
//bom
let bomImg;
let bom1Img;
//bom end

//moving
let toDownY = 8; //توپ ها وقتی میخان بیان پایین
let toHorizLeft = 0; //سرعت چپ رفتن
let toHorizRight = 0; // سرعت راست رفتن
//moving end
//gameover and score
let gameover = false;
let score = 0;
//gameover and score end
//canvas end

window.onload = function () {
    canvas = document.getElementById('canvas');
    canvas.width = boardWidth;
    canvas.height = boardHeight;
    context = canvas.getContext('2d'); //برای نقاشی کشیدن توی canvas
    ballImg = new Image();
    ballImg.src = './images/bomb.png';
    airplaneGenerator();
    document.addEventListener('keydown', moveplane);
    bulletImg = new Image();
    bulletImg.src = './images/bullet.png';
    // bomgenerator()
    // bomgenerator1()




};

function start() {
    btnStart.classList.add('clicked-start');
    btnStart.disabled = true;
    div2.style.display = 'none';
    requestAnimationFrame(update);
    setInterval(ballGenerator, 1000);

}


//AIRPLANE IMAGE
function airplaneGenerator() {
    airplaneImg = new Image();
    airplaneImg.src = './images/airplane.png';
    airplaneImg.onload = function () {
        context.drawImage(airplaneImg, airplane.x, airplane.y, airplane.width, airplane.height);
    };

}

// airplaneGenerator()

//AIRPLANE GENERATED
//start
btnRestart.addEventListener('click', restart);
btnStart.addEventListener('click', start);
//start
//UPDATE DATAS
function update() {
    requestAnimationFrame(update);
    if (gameover) {
        return;
    }
    //پاک کردن کنواس برای جلوگیری از اسپم
    context.clearRect(0, 0, canvas.width, canvas.height);
    //airplane
    context.drawImage(airplaneImg, airplane.x, airplane.y, airplane.width, airplane.height);
    //bombs
    handleAllCollisions();
    for (let i = 0; i < balls.length; i++) {
        ball = balls[i];
        if (ball.y < 800) {
            // ball.y += toDownY
            ball.y += ball.speed;
            // console.log(ball.y);
            // console.log(ball);
            if (ball.y == 700 || ball.y == 699 || ball.y == 698 || ball.y == 697 || ball.y == 696 || ball.y == 696 || ball.y == 695 || ball.y == 694) {
                // console.log("helli");
                score -= 5;

            }

            // console.log(ball.y);
        }
        context.drawImage(ball.img, ball.x, ball.y, ball.width, ball.height);
        moving();
        drawbullet();
        // shooting()

        // if (ball.y == airplane.y){
        //     console.log("hey");
        // }                           //my way
        if (detectCollision(airplane, balls[i])) {
            gameEnd();
            bomgenerator()
        }
        context.font = '30px Arial';

        context.fillText(score, 10, 30);
        if(score >= 0 ){
            context.fillStyle = 'white';
        }else{
            context.fillStyle = "red"
        }
    }


}

//UPDATE DATAS
//FOR LEFT AND RIGHT
function moveplane(event) {
    if (gameover) {
        return;
    }
    // turn = 0
    if ((event.key == 'ArrowLeft' || event.key == 'a')) {
        //left
        turn = -15;
        airplane.x += turn;
        // console.log(airplane.x);
        if (airplane.x <= 0) {
            airplane.x = 0;
        }
    } else if (event.key == 'ArrowRight' || event.key == 'd') {
        turn = 15;
        airplane.x += turn;
        // console.log(airplane.x);
        if (airplane.x >= 540) {
            airplane.x = 540;
        }
    } else if (event.key == 'ArrowUp') {
        console.log(airplane.y);
        toUp = -10;
        airplane.y += toUp;
        if (airplane.y <= 10) {
            airplane.y = 10;
        }
    } else if (event.key == 'ArrowDown') {
        console.log(airplane.y);
        toUp = +10;
        airplane.y += toUp;
        if (airplane.y >= 620) {
            airplane.y = 620;
        }
    }
}

//DONE
//BALL GENARATION

function ballGenerator() {
    // if(gameover){return;}
    ballX = Math.floor(Math.random() * 550);
    // ballX = 250
    let ball = {
        img: ballImg, x: ballX, y: ballY, width: ballWidth, height: ballHeight, speed: 5 + Math.floor(Math.random() * 3)
    };
// console.log(ball.y);
    balls.push(ball);
    if (balls.length > 10) {
        balls.shift();  //حذف اولین المنت balls
    }


}

//BALL GENERATED
function detectCollision(a, b) {
    return (a.x < b.x + b.width && a.x + a.width > b.x && a.y < b.y + b.height && a.y + a.height > b.y);
}

function gameEnd() {
    // context.fillStyle
    gameover = true;
    context.font = 'bold 34px Arial';
    context.fillStyle = 'red';
    context.fillText('GAMEOVER', 200, 350);
    clearInterval(ballGenerator);
    balls.length = 0;
    console.log(balls);
    bullets.length = 0;
    div2.style.display = 'block';


}

function restart() {
    balls.length = 0;
    score = 0;
    airplane.x = boardWidth / 2 - 30;
    if (gameover === true) {
        gameover = false;
    }
    div2.style.display= "none"
}

document.addEventListener('keypress', function (w) {
    if (w.key == 'w' || w.code == 'Space') {
        // console.log("Ctrl")
        shooting();
        // drawbullet()
        console.log(boardHeight);
        // bomgenerator1()
    }
});

function shooting() {
    if (gameover === false) {
        bullet = {
            x: airplane.x,
            y: boardHeight - airplaneHeight,
            height: bulletHeight,
            width: bulletWidth,
            speed: 1,
            img: bulletImg
        };
        bullets.push(bullet);
        console.log(bullets);
        drawbullet();
        console.log();
    }
}

function drawbullet() {
    if (gameover === false) {
        for (let o = 0; o < bullets.length; o++) {
            let currentBullet = bullets[o];
            context.drawImage(currentBullet.img, bullets[o].x, bullets[o].y, bullets[o].width, bullets[o].height);

            // check(currentBullet , ball[o])
        }
    }
}

function moving() {
    for (let i = 0; i < bullets.length; i++) {
        bullets[i].y -= bullets[i].speed;
    }
}

function handleAllCollisions() {
    for (let k = bullets.length - 1; k >= 0; k--) {
        for (let n = balls.length - 1; n >= 0; n--) {
            if (check(bullets[k], balls[n])) {
                bullets.splice(k, 1);
                balls.splice(n, 1);
                score += 5;
            }
        }
    }

}

function test(){

}

function check(bullets, balls) {
    return (
        bullets.x < balls.x + balls.width &&
        bullets.x + bullets.width > balls.x &&
        bullets.y < balls.y + balls.height &&
        bullets.y + bullets.height > balls.y);

}

function bomgenerator() {
    bomImg = new Image();
    bomImg.src = './images/bom.png';
    bomImg.onload = function (){
        context.drawImage(bomImg,airplane.x, airplane.y, airplane.width, airplane.height);
    }
}