
let difficultySelection = document.getElementById('difficulty-selection');
let gameContainer = document.getElementById('game-container');
let gameCanvas = document.getElementById('game-canvas');
let gameOverElement = document.getElementById('game-over');
let scoreElement = document.getElementById('score');
let recordElement = document.getElementById('record');
function startGame(difficulty) {
    difficultySelection.style.display = 'none';
    gameContainer.style.display = 'flex';
    if (window.innerWidth < 820) {
        if (difficulty === 'easy') {
            gameCanvas.width = 235;
            gameCanvas.height = 485;
        } else if (difficulty === 'medium') {
            gameCanvas.width = 240;
            gameCanvas.height = 370;
        } else if (difficulty === 'hard') {
            gameCanvas.width = 200;
            gameCanvas.height = 270;
        }
    } else {
        if (difficulty === 'easy') {
            gameCanvas.width = 600;
            gameCanvas.height = 600;
        } else if (difficulty === 'medium') {
            gameCanvas.width = 500;
            gameCanvas.height = 500;
        } else if (difficulty === 'hard') {
            gameCanvas.width = 350;
            gameCanvas.height = 350;
        }
    }

    let savedRecord = localStorage.getItem('record');
    if (savedRecord !== null) {
        recordElement.textContent = 'Record: ' + savedRecord;
    }
    let context = gameCanvas.getContext('2d');
    let gridSize = 20;
    let tileCountX = gameCanvas.width / gridSize;
    let tileCountY = gameCanvas.height / gridSize;
    let snake = [];
    let snakeLength = 1;
    let snakeDirection = 'right';
    let food = { x: 0, y: 0 };
    function updateGame() {
        let snakeX = snake[0].x;
        let snakeY = snake[0].y;
        if (snakeDirection === 'right') snakeX += gridSize;
        if (snakeDirection === 'left') snakeX -= gridSize;
        if (snakeDirection === 'up') snakeY -= gridSize;
        if (snakeDirection === 'down') snakeY += gridSize;
        if (snakeX >= gameCanvas.width) snakeX = 0;
        if (snakeX < 0) snakeX = gameCanvas.width - gridSize;
        if (snakeY >= gameCanvas.height) snakeY = 0;
        if (snakeY < 0) snakeY = gameCanvas.height - gridSize;
        for (let i = 1; i < snake.length; i++) {
            if (snakeX === snake[i].x && snakeY === snake[i].y) {
                endGame();
                return;
            }
        }
        if (snakeX === food.x && snakeY === food.y) {
            snakeLength++;
            generateFood();
        } else {
            snake.pop();
        }
        let newHead = { x: snakeX, y: snakeY };
        snake.unshift(newHead);
        context.clearRect(0, 0, gameCanvas.width, gameCanvas.height);
        for (let i = 0; i < snake.length; i++) {
            drawSnakePart(snake[i].x, snake[i].y);
        }
        drawFood(food.x, food.y);
        scoreElement.textContent = 'Score: ' + (snakeLength - 1);
        setTimeout(updateGame, 1000 / 10);
    }
    function drawSnakePart(x, y) {
        context.fillStyle = '#00FF00';
        context.fillRect(x, y, gridSize, gridSize);
        context.strokeStyle = '#000000';
        context.strokeRect(x, y, gridSize, gridSize);
    }
    function drawFood(x, y) {
        context.fillStyle = '#FF0000';
        context.fillRect(x, y, gridSize, gridSize);
        context.strokeStyle = '#000000';
        context.strokeRect(x, y, gridSize, gridSize);
    }
    function generateFood() {
        let maxX = tileCountX - 1;
        let maxY = tileCountY - 1;
        food.x = Math.floor(Math.random() * maxX) * gridSize;
        food.y = Math.floor(Math.random() * maxY) * gridSize;
    }
    function endGame() {
        if (snakeLength > parseInt(localStorage.getItem('record'))) {
            localStorage.setItem('record', snakeLength);
            recordElement.textContent = 'Record: ' + snakeLength;
        }
        gameContainer.style.display = 'none';
        gameOverElement.style.display = 'flex';
        returnToDifficultySelection();
    }
    function returnToDifficultySelection() {
        location.reload();
    }
    document.addEventListener('keydown', changeSnakeDirection);
    function changeSnakeDirection(event) {
        let keyPressed = event.keyCode;
        if (keyPressed === 37 && snakeDirection !== 'right') snakeDirection = 'left';
        if (keyPressed === 38 && snakeDirection !== 'down') snakeDirection = 'up';
        if (keyPressed === 39 && snakeDirection !== 'left') snakeDirection = 'right';
        if (keyPressed === 40 && snakeDirection !== 'up') snakeDirection = 'down';
    }
    snake.push({ x: 0, y: 0 });
    generateFood();
    updateGame();
}





