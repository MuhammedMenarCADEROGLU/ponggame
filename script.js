const leftPaddle = document.getElementById('leftPaddle');
const rightPaddle = document.getElementById('rightPaddle');
const ball = document.getElementById('ball');
const gameContainer = document.querySelector('.game-container');
const startVsComputerButton = document.getElementById('startVsComputerButton');
const startVsFriendButton = document.getElementById('startVsFriendButton');

let ballX = 400;
let ballY = 200;
let ballSpeedX = 0;
let ballSpeedY = 0;

let leftScore = 0;
let rightScore = 0;

const paddleSpeed = 10;
const resetDelay = 1000;

let isMovingUp = false;
let isMovingDown = false;
let isMovingW = false;
let isMovingS = false;
let gameStarted = false;
let playWithFriend = false;

startVsComputerButton.addEventListener('click', startVsComputer);
startVsFriendButton.addEventListener('click', startVsFriend);

document.addEventListener('touchstart', handleTouchStart, false);
document.addEventListener('touchend', handleTouchEnd, false);

document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowUp') {
        isMovingUp = true;
    }
    if (event.key === 'ArrowDown') {
        isMovingDown = true;
    }
    if (event.key === 'w' || event.key === 'W') {
        isMovingW = true;
    }
    if (event.key === 's' || event.key === 'S') {
        isMovingS = true;
    }
});

document.addEventListener('keyup', (event) => {
    if (event.key === 'ArrowUp') {
        isMovingUp = false;
    }
    if (event.key === 'ArrowDown') {
        isMovingDown = false;
    }
    if (event.key === 'w' || event.key === 'W') {
        isMovingW = false;
    }
    if (event.key === 's' || event.key === 'S') {
        isMovingS = false;
    }
});

function startVsComputer() {
    playWithFriend = false;
    startGame();
}

function startVsFriend() {
    playWithFriend = true;
    startGame();
}

function handleTouchStart(e) {
    const touchY = e.touches[0].clientY;
    isMovingUp = touchY < window.innerHeight / 2;
    isMovingDown = touchY >= window.innerHeight / 2;
}

function handleTouchEnd() {
    isMovingUp = false;
    isMovingDown = false;
}

function update() {
    if (gameStarted) {
        if (isMovingUp && rightPaddle.offsetTop > 0) {
            rightPaddle.style.top = `${rightPaddle.offsetTop - paddleSpeed}px`;
        }
        if (isMovingDown && rightPaddle.offsetTop + rightPaddle.clientHeight < 400) {
            rightPaddle.style.top = `${rightPaddle.offsetTop + paddleSpeed}px`;
        }

        if (playWithFriend) {
            if (isMovingW && leftPaddle.offsetTop > 0) {
                leftPaddle.style.top = `${leftPaddle.offsetTop - paddleSpeed}px`;
            }
            if (isMovingS && leftPaddle.offsetTop + leftPaddle.clientHeight < 400) {
                leftPaddle.style.top = `${leftPaddle.offsetTop + paddleSpeed}px`;
            }
        } else {
            const targetY = ballY - leftPaddle.clientHeight / 2;
            const deltaY = targetY - leftPaddle.offsetTop;
            leftPaddle.style.top = `${leftPaddle.offsetTop + deltaY * 0.05}px`;
        }

        ballX += ballSpeedX;
        ballY += ballSpeedY;

        if (ballX < 0) {
            rightScore++;
            resetGame();
        }
        if (ballX > 780) {
            leftScore++;
            resetGame();
        }

        if (ballY < 0 || ballY > 380) {
            ballSpeedY = -ballSpeedY;
        }

        if (
            (ballX <= 20 && ballY >= leftPaddle.offsetTop && ballY <= leftPaddle.offsetTop + 100) ||
            (ballX >= 760 && ballY >= rightPaddle.offsetTop && ballY <= rightPaddle.offsetTop + 100)
        ) {
            ballSpeedX = -ballSpeedX;
        }

        ball.style.left = `${ballX}px`;
        ball.style.top = `${ballY}px`;

        document.getElementById('leftScore').innerText = leftScore;
        document.getElementById('rightScore').innerText = rightScore;

        ballSpeedX += ballSpeedX > 0 ? 0.02 : -0.02;
        ballSpeedY += ballSpeedY > 0 ? 0.02 : -0.02;
    }

    requestAnimationFrame(update);
}

function startGame() {
    gameStarted = true;
    startVsComputerButton.style.display = 'none';
    startVsFriendButton.style.display = 'none';
    ballSpeedX = 5;
    ballSpeedY = 2;
}

function resetGame() {
    gameStarted = false;
    startVsComputerButton.style.display = 'block';
    startVsFriendButton.style.display = 'block';
    ballX = 400;
    ballY = 200;
    ballSpeedX = 0;
    ballSpeedY = 0;

    gameContainer.style.backgroundColor = 'red';

    setTimeout(() => {
        gameContainer.style.backgroundColor = '#121212';
    }, resetDelay);
}

update();
