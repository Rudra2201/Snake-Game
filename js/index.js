// VARIABLES

let inputDir = { x: 0, y: 0 };
let lastPaintTime = 0; // last time the screen got painted/rendered
let speed = 5;
let score = 0;

let snakeArr = [{ x: 14, y: 5 }];
let food = { x: 5, y: 9 }; // food is not an array


//Sounds
const foodSound = new Audio('music/food.mp3');
const gameOverSound = new Audio('music/gameover.mp3');
const moveSound = new Audio('music/move.mp3');
const musicSound = new Audio('music/music.mp3');


//GAME FUNCTIONS

function main(ctime) // ctime -  print time of the console
{
    window.requestAnimationFrame(main);

    if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
        return;
    }
    lastPaintTime = ctime;
    // console.log(ctime);
    gameEngine();
}

function isCollide(snakeArr) {
    // if the snake bumps in itself

    for (let i = 1; i < snakeArr.length; i++) {
        if (snakeArr[i].x === snakeArr[0].x && snakeArr[i].y === snakeArr[0].y)
            return true;
    }

    // if the snake runs into a wall

    if (snakeArr[0].x <= 0 || snakeArr[0].x >= 18 ||
        snakeArr[0].y <= 0 || snakeArr[0].y >= 18)

        return true;
}

function gameEngine() {
    //Part-1: Updating the snake array and Food
    if (isCollide(snakeArr)) {
        inputDir = { x: 0, y: 0 };
        score = 0;
        scoreBox.innerHTML = "Score: " + score;
        speed = 5;
        Speed.innerHTML = "Speed: " + speed;
        gameOverSound.play();
        alert("Game over. Press any key to play again!")
        snakeArr = [{ x: 14, y: 5 }];
    }

    // If you have eaten the food, increment the score and regenerate the food

    if (snakeArr[0].y == food.y && snakeArr[0].x == food.x) // if head co-ordinates matches the food co-ordinates
    {
        snakeArr.unshift({ x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y });
        //adds the snakebody element in the direction of the food eaten

        let a = 2;
        let b = 16;
        food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) }; // relocates food element

        score++;
        if (score % 2 == 0 && speed < 30)
            speed += 1;

        Speed.innerHTML = "Speed: " + speed;
        // console.log(speed);
        scoreBox.innerHTML = "Score: " + score;
        // console.log(score);

        foodSound.play();

        if (score > hiscoreval) {
            hiscoreval = score;
            localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
            hiscoreBox.innerHTML = "Hi-Score: " + hiscoreval;
        }
    }


    // Moving The Snake

    for (let i = snakeArr.length - 2; i >= 0; i--) {
        snakeArr[i + 1] = { ...snakeArr[i] };
    }

    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;


    //Part-2: 
    // Display the snake 
    board.innerHTML = ""; // clears the board
    snakeArr.forEach((e, index) => {
        snakeElement = document.createElement('div');

        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;

        if (index === 0) {
            snakeElement.classList.add('head');
        } // classList returns the classes of the element -  classList.add adds a class in the list of classes of an element
        else {
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    });

    // Display the  food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);

}






// MAIN LOGIC

let hiscore = localStorage.getItem("hiscore");
if (hiscore === null) {
    let hiscoreval = 0;
    localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
}
else {
    hiscoreval = JSON.parse(hiscore);
    hiscoreBox.innerHTML = "Hi-Score: " + hiscore;
}
window.requestAnimationFrame(main);
window.addEventListener('keydown', e => {

    if (inputDir.x === 0 && inputDir.y === 0) {
        inputDir = { x: 0, y: 1 }
        musicSound.play();
    } // Start the game

    moveSound.play();


    switch (e.key) {
        case "ArrowUp":
            // console.log("ArrowUp");

            if (inputDir.y != 1 || snakeArr.length == 1) {
                inputDir.x = 0;
                inputDir.y = -1;
            }
            break;

        case "ArrowDown":
            // console.log("ArrowDown")
            if (inputDir.y != -1 || snakeArr.length == 1) {
                inputDir.x = 0;
                inputDir.y = 1;
            }
            break;
        case "ArrowLeft":
            // console.log("ArrowLeft")

            if (inputDir.x != 1 || snakeArr.length == 1) {
                inputDir.x = -1;
                inputDir.y = 0;
            }
            break;
        case "ArrowRight":
            // console.log("ArrowRight")
            if (inputDir.x != -1 || snakeArr.length == 1) {
                inputDir.x = 1;
                inputDir.y = 0;
            }

            break;
        default:
            break;
    }
})