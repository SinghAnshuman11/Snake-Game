const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const gameOverScreen = document.getElementById("gameOverScreen");
const finalScore = document.getElementById("finalScore");
const restartBtn = document.getElementById("restartBtn");

const scoreElement = document.getElementById('score');

const box = 20;

let snake = [];
snake[0] = { x: 10 * box, y: 10 * box };

let food = {
    x: Math.floor(Math.random() * 20) * box,
    y: Math.floor(Math.random() * 20) * box
};

let score = 0;
let d;

document.addEventListener("keydown", direction);

function direction(event) {
    
    if (event.key == "ArrowLeft" && d != "RIGHT") {
        d = "LEFT";
    } else if (event.key == "ArrowUp" && d != "DOWN") {
        d = "UP";
    } else if (event.key == "ArrowRight" && d != "LEFT") {
        d = "RIGHT";
    } else if (event.key == "ArrowDown" && d != "UP") {
        d = "DOWN";
    }
}

function collision(head, array) {
    for (let i = 0; i < array.length; i++) {
        if (head.x == array[i].x && head.y == array[i].y) {
            return true;
        }
    }
    return false;
}

function resetGame() {
    
    snake = [{ x: 10 * box, y: 10 * box }];
    food = {
        x: Math.floor(Math.random() * 20) * box,
        y: Math.floor(Math.random() * 20) * box
    };
    score = 0;
    d = undefined;

    scoreElement.innerText = score;
    
    gameOverScreen.style.display = "none";
    
    game = setInterval(draw, 120);
}

function draw() {
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    
    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = (i == 0) ? "green" : "lightgreen"; 
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
        ctx.strokeStyle = "black";
        ctx.strokeRect(snake[i].x, snake[i].y, box, box);
    }

    
    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, box, box);

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if (d == "LEFT") snakeX -= box;
    if (d == "UP") snakeY -= box;
    if (d == "RIGHT") snakeX += box;
    if (d == "DOWN") snakeY += box;

    if (snakeX == food.x && snakeY == food.y) {
        score++;
        scoreElement.innerText = score;
        food = { 
            x: Math.floor(Math.random() * 20) * box,
            y: Math.floor(Math.random() * 20) * box
        };
    } else {
        snake.pop();
    }

    let newHead = {
        x: snakeX,
        y: snakeY
    };

    if (snakeX < 0 || snakeX >= canvas.width || snakeY < 0 || snakeY >= canvas.height || collision(newHead, snake)) {
        clearInterval(game); 
        finalScore.innerText = score;
        gameOverScreen.style.display = "flex";  
        return; 
    }

    snake.unshift(newHead);
}

let game = setInterval(draw, 120);

//Mobile-Logic 

const controlsContainer = document.querySelector(".controls-container");

function handleMobileInput(event) {
    
    const newDirection = event.target.dataset.direction;
    if (!newDirection) return; 

    if (newDirection == "UP" && d != "DOWN") d = "UP";
    if (newDirection == "DOWN" && d != "UP") d = "DOWN";
    if (newDirection == "LEFT" && d != "RIGHT") d = "LEFT";
    if (newDirection == "RIGHT" && d != "LEFT") d = "RIGHT";
}

controlsContainer.addEventListener("click", handleMobileInput);

restartBtn.addEventListener("click", resetGame);

