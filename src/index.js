import Paddle from "./Paddle.js"
import Ball from "./Ball.js";
import InputHandler from "./input.js"

let canvas = document.getElementById("myCanvas");       // obiekt canvas
let ctx = canvas.getContext("2d");                      // odniesienie do context2D obiektu canvas

let leftScore = document.getElementById("leftScore");
let rightScore = document.getElementById("rightScore");
let gamePause = false;

let gameDims = {
    width: canvas.width,
    height: canvas.height
}
let velocity = {
    dx: 2,
    dy: -2
}
let paddlesSpeed = 5;
let ballRadius = 10;
let imageBall = document.getElementById("img_ball");

let leftPaddle = new Paddle(10, 100, gameDims, paddlesSpeed, "left");
let rightPaddle = new Paddle(10, 100, gameDims, paddlesSpeed, "right");
let ball = new Ball(imageBall, ballRadius, gameDims, velocity);

let moveButtons = document.getElementsByClassName("movement-button");

for (let i = 0; i < moveButtons.length; i++) {
    moveButtons[i].addEventListener("mousedown", mouseDown);
    moveButtons[i].addEventListener("mouseup", mouseUp);
    moveButtons[i].addEventListener("touchstart", mouseDown);
    moveButtons[i].addEventListener("touchend", mouseUp);
}

let inputHandler = new InputHandler(leftPaddle, rightPaddle);

function mouseDown() {
    if (this.id === "movement-button1") leftPaddle.moveUp();
    if (this.id === "movement-button2") leftPaddle.moveDown();
    if (this.id === "movement-button3") rightPaddle.moveUp();
    if (this.id === "movement-button4") rightPaddle.moveDown();
}

function mouseUp() {
    if (this.id === "movement-button1") leftPaddle.speed = 0;
    if (this.id === "movement-button2") leftPaddle.speed = 0;
    if (this.id === "movement-button3") rightPaddle.speed = 0;
    if (this.id === "movement-button4") rightPaddle.speed = 0;
}

function keyDownHandler(e) {
    if (e.key == "Up" || e.key == "ArrowUp") {
        UpPressed = true;
    }
    else if (e.key == "Down" || e.key == "ArrowDown") {
        DownPressed = true;
    }
    if (e.key == "w") {
        WPressed = true;
    }
    else if (e.key == "s") {
        SPressed = true;
    }
    if (!gamePause) {
        if (e.key == "p") {
            alert("Pause");
            gamePause = true;
        }
    }

}

function keyUpHandler(e) {
    if (e.key == "Up" || e.key == "ArrowUp") {
        UpPressed = false;
    }
    else if (e.key == "Down" || e.key == "ArrowDown") {
        DownPressed = false;
    }
    if (e.key == "w") {
        WPressed = false;
    }
    else if (e.key == "s") {
        SPressed = false;
    }
    if (e.key == "p") {
        gamePause = false;
    }
}

function movePaddles() {
    if (rightPaddle.speed > 0) {
        if (rightPaddle.position.y < canvas.height - rightPaddle.height) {
            rightPaddle.position.y += rightPaddle.speed;
        }
    }
    if (rightPaddle.speed < 0) {
        if (rightPaddle.position.y > 0) {
            rightPaddle.position.y += rightPaddle.speed;
        }
    }
    if (leftPaddle.speed > 0) {
        if (leftPaddle.position.y < canvas.height - leftPaddle.height) {
            leftPaddle.position.y += leftPaddle.speed;
        }
    }
    if (leftPaddle.speed < 0) {
        if (leftPaddle.position.y > 0) {
            leftPaddle.position.y += leftPaddle.speed;
        }
    }
}

function moveBall() {
    ball.position.x += ball.velocity.dx;
    ball.position.y += ball.velocity.dy;
}


function checkWalls() {
    if (ball.position.x + ball.velocity.dx > canvas.width - ball.radius) {
        if (ball.position.y > rightPaddle.position.y - ball.radius && ball.position.y < rightPaddle.position.y + rightPaddle.height + ball.radius) {

            calcHit("right");

        } else {
            scoreCheck(leftScore);
        }

    }
    if (ball.position.x + ball.velocity.dx < ball.radius) {
        if (ball.position.y > leftPaddle.position.y - ball.radius && ball.position.y < leftPaddle.position.y + leftPaddle.height + ball.radius) {

            calcHit("left");

        } else {
            scoreCheck(rightScore);
        }

    }
    if (ball.position.y + ball.velocity.dy > canvas.height - ball.radius || ball.position.y + ball.velocity.dy < ball.radius) {
        ball.velocity.dy = -ball.velocity.dy;
    }
}

function calcHit(hitter) {
    if (hitter == "left") {
        ball.velocity.dy = (ball.position.y - leftPaddle.position.y) / ((leftPaddle.height + 2 * ball.radius) / 4) - 2;
    }
    if (hitter == "right") {
        ball.velocity.dy = (ball.position.y - rightPaddle.position.y) / ((rightPaddle.height + 2 * ball.radius) / 4) - 2;
    }

    ball.velocity.dx = Math.sqrt(ball.velocityValue - (ball.velocity.dy * ball.velocity.dy));
    if (isNaN(ball.velocity.dx)) { ball.velocity.dx = 1; }

    if (hitter == "left") {
        if (ball.velocity.dx < 0) { ball.velocity.dx = -ball.velocity.dx; }
    }
    if (hitter == "right") {
        if (ball.velocity.dx > 0) { ball.velocity.dx = -ball.velocity.dx; }
    }

    ball.velocityValue = ball.velocityValue + 2;
}

function scoreCheck(scorer) {
    ball.position.x = canvas.width / 2;
    ball.position.y = canvas.height / 2;
    ball.velocity.dx = 0;
    ball.velocity.dy = 0;
    ball.velocityValue = ball.startVelocity;
    if (scorer == leftScore) {
        leftScore.innerHTML = parseInt(leftScore.innerHTML) + 1;
        leftPaddle.height = leftPaddle.height - 10;
        setTimeout(function () { ball.velocity.dx = -2; ball.velocity.dy = 0 }, 2000);
    }
    if (scorer == rightScore) {
        rightScore.innerHTML = parseInt(rightScore.innerHTML) + 1;
        rightPaddle.height = rightPaddle.height - 10;
        setTimeout(function () { ball.velocity.dx = 2; ball.velocity.dy = 0 }, 2000);
    }
}


function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    leftPaddle.draw(ctx);
    rightPaddle.draw(ctx);
    ball.draw(ctx);


    checkWalls();
    movePaddles();
    moveBall();


    if (rightPaddle.height == 0) {
        window.clearInterval(gameLoop);
        alert("Right Wins!!!")
    }
    if (leftPaddle.height == 0) {
        window.clearInterval(gameLoop);
        alert("Left Wins!!!")
    }



}
setTimeout(function () { alert("Enjoy the game :)"); }, 50);
let gameLoop = setInterval(draw, 10);