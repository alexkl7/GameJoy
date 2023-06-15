let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
function makeMove(index) {
    if (board[index] === '') {
        board[index] = currentPlayer;
        renderBoard();
        checkWin();
        switchPlayer();

        // Ход компьютера
        if (currentPlayer === 'O') {
            makeComputerMove();
        }
    }
}
function switchPlayer() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

// Функция для проверки условия победы
function checkWin() {
    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    for (let combination of winningCombinations) {
        const [a, b, c] = combination;
        if (board[a] !== '' && board[a] === board[b] && board[a] === board[c]) {
            alert(`Игрок ${board[a]} выиграл!`);
            resetGame();
            return;
        }
    }
    if (board.every(cell => cell !== '')) {
        alert('Ничья!');
        resetGame();
        return;
    }
}

// Функция для отрисовки игрового поля
function renderBoard() {
    const cells = document.querySelectorAll('.cell');
    cells.forEach((cell, index) => {
        cell.textContent = board[index];
    });
}

// Функция для сброса игры
function resetGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    renderBoard();
}

// Функция для хода компьютера
function makeComputerMove() {
    for (let i = 0; i < board.length; i++) {
        if (board[i] === '') {
            makeMove(i);
            return;
        }
    }
}

// Инициализация игры
renderBoard();