export default class InputHandler {

    constructor(leftPaddle, rightPaddle) {
        this.gamePause = false;
        document.addEventListener("keydown", e => {
            if (e.key == "Up" || e.key == "ArrowUp") {
                rightPaddle.moveUp();
            }
            else if (e.key == "Down" || e.key == "ArrowDown") {
                rightPaddle.moveDown();
            }
            if (e.key == "w") {
                leftPaddle.moveUp();
            }
            else if (e.key == "s") {
                leftPaddle.moveDown();
            }
            if (!this.gamePause) {
                if (e.key == "p") {
                    alert("Pause");
                    this.gamePause = true;
                }
            }
        });
        document.addEventListener("keyup", e => {
            if (e.key == "Up" || e.key == "ArrowUp") {
                rightPaddle.speed = 0;
            }
            else if (e.key == "Down" || e.key == "ArrowDown") {
                rightPaddle.speed = 0;
            }
            if (e.key == "w") {
                leftPaddle.speed = 0;
            }
            else if (e.key == "s") {
                leftPaddle.speed = 0;
            }
            if (e.key == "p") {
                this.gamePause = false;
            }
        });
    }
}