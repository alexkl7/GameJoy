
const levels = {
    easy: 6,
    medium: 12,
    hard: 18
};
let gameBoard;
let flippedSquares = [];
let matchedSquares = [];
let selectedLevel = '';
function createGameBoard(level) {
    const colors = generateColors(level);
    const shuffledColors = shuffleArray(colors);
    gameBoard = shuffledColors.concat(shuffledColors);
    const gameContainer = document.querySelector('.game-container .game-board');
    gameContainer.innerHTML = '';
    gameBoard.forEach((color, index) => {
        const square = document.createElement('div');
        square.classList.add('square');
        const squareFront = document.createElement('div');
        squareFront.classList.add('square-front');
        const frontLabel = document.createElement('span');
        frontLabel.classList.add('square-label');
        frontLabel.textContent = 'GameJoy';
        squareFront.appendChild(frontLabel);
        const squareBack = document.createElement('div');
        squareBack.classList.add('square-back');
        squareBack.style.backgroundColor = color;
        square.appendChild(squareFront);
        square.appendChild(squareBack);
        square.dataset.index = index;
        square.addEventListener('click', flipSquare);
        gameContainer.appendChild(square);
    });
}

function generateColors(level) {
    const colorCount = levels[level] / 2;
    const colors = [];

    for (let i = 0; i < colorCount; i++) {
        const randomColor = getRandomColor();
        colors.push(randomColor, randomColor);
    }

    return colors;
}

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';

    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }

    return color;
}

function shuffleArray(array) {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
        const randomIndex = Math.floor(Math.random() * (i + 1));
        [shuffledArray[i], shuffledArray[randomIndex]] = [shuffledArray[randomIndex], shuffledArray[i]];
    }
    return shuffledArray;
}
function flipSquare() {
    const square = this;
    const index = square.dataset.index;
    if (matchedSquares.includes(index) || flippedSquares.length === 2) {
        return;
    }
    square.classList.add('flip');
    flippedSquares.push(square);
    if (flippedSquares.length === 2) {
        const [square1, square2] = flippedSquares;
        const index1 = square1.dataset.index;
        const index2 = square2.dataset.index;
        if (gameBoard[index1] === gameBoard[index2]) {
            matchedSquares.push(index1, index2);
            flippedSquares = [];
            if (matchedSquares.length === gameBoard.length) {
                setTimeout(() => {
                    alert('Поздравляем! Вы отгадали все пары!');
                    restartGame();
                }, 500);
            }
        } else {
            setTimeout(() => {
                square1.classList.remove('flip');
                square2.classList.remove('flip');
                flippedSquares = [];
            }, 1000);
        }
    }
}

function restartGame() {
    flippedSquares = [];
    matchedSquares = [];
    createGameBoard(selectedLevel);
    const difficultySection = document.querySelector('.difficulty');
    const coupleBlock = document.querySelector('.coupleBlock');
    difficultySection.style.display = 'block';
    coupleBlock.style.display = 'none';
    window.location.reload();
}
function startGame(level) {
    selectedLevel = level;
    createGameBoard(level);
    const difficultySection = document.querySelector('.difficulty');
    const coupleBlock = document.querySelector('.coupleBlock');
    difficultySection.style.display = 'none';
    coupleBlock.style.display = 'block';
}

document.addEventListener('DOMContentLoaded', () => {
    const difficultyButtons = document.querySelectorAll('.difficulty-btn');
    const restartButton = document.getElementById('restart-btn');

    difficultyButtons.forEach(button => {
        button.addEventListener('click', () => {
            startGame(button.dataset.level);
        });
    });

    restartButton.onclick = restartGame;
});