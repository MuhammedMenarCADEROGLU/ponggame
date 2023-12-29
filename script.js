const leftPaddle = document.getElementById('leftPaddle');
const rightPaddle = document.getElementById('rightPaddle');
const ball = document.getElementById('ball');
const gameContainer = document.querySelector('.game-container');
const startButton = document.getElementById('startButton');

let ballX = 400;
let ballY = 200;
let ballSpeedX = 0; // Initial speed is set to 0
let ballSpeedY = 0;

let leftScore = 0;
let rightScore = 0;

const paddleSpeed = 10;
const resetDelay = 1000; // 1 second delay after losing a point

let isMovingUp = false;
let isMovingDown = false;
let gameStarted = false;

startButton.addEventListener('click', startGame);

// Add touch events for mobile devices
document.addEventListener('touchstart', handleTouchStart, false);
document.addEventListener('touchend', handleTouchEnd, false);

function startGame() {
    gameStarted = true;
    startButton.style.display = 'none'; // Hide the start button
    ballSpeedX = 5; // Start the ball movement
    ballSpeedY = 2;
}

document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowUp') {
        isMovingUp = true;
    }
    if (event.key === 'ArrowDown') {
        isMovingDown = true;
    }
});

document.addEventListener('keyup', (event) => {
    if (event.key === 'ArrowUp') {
        isMovingUp = false;
    }
    if (event.key === 'ArrowDown') {
        isMovingDown = false;
    }
});

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
        // Move paddles
        if (isMovingUp && rightPaddle.offsetTop > 0) {
            rightPaddle.style.top = `${rightPaddle.offsetTop - paddleSpeed}px`;
        }
        if (isMovingDown && rightPaddle.offsetTop + rightPaddle.clientHeight < 400) {
            rightPaddle.style.top = `${rightPaddle.offsetTop + paddleSpeed}px`;
        }

        // AI for the left paddle (basic tracking)
        const targetY = ballY - leftPaddle.clientHeight / 2;
        const deltaY = targetY - leftPaddle.offsetTop;
        leftPaddle.style.top = `${leftPaddle.offsetTop + deltaY * 0.05}px`;

        // Ball movement
        ballX += ballSpeedX;
        ballY += ballSpeedY;

        // Ball collision with walls
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

        // Ball collision with paddles
        if (
            (ballX <= 20 && ballY >= leftPaddle.offsetTop && ballY <= leftPaddle.offsetTop + 100) ||
            (ballX >= 760 && ballY >= rightPaddle.offsetTop && ballY <= rightPaddle.offsetTop + 100)
        ) {
            ballSpeedX = -ballSpeedX;
        }

        // Update ball position
        ball.style.left = `${ballX}px`;
        ball.style.top = `${ballY}px`;

        // Update scores
        document.getElementById('leftScore').innerText = leftScore;
        document.getElementById('rightScore').innerText = rightScore;

        // Increase ball speed over time
        ballSpeedX += ballSpeedX > 0 ? 0.02 : -0.02;
        ballSpeedY += ballSpeedY > 0 ? 0.02 : -0.02;
    }

    // Repeat the update function
    requestAnimationFrame(update);
}

function resetGame() {
    gameStarted = false;
    startButton.style.display = 'block'; // Show the start button
    ballX = 400;
    ballY = 200;
    ballSpeedX = 0; // Reset ball speed
    ballSpeedY = 0;

    // Change background color
    gameContainer.style.backgroundColor = 'red';

    // Display try again message
    setTimeout(() => {
        gameContainer.style.backgroundColor = '#121212'; // Reset background color
    }, resetDelay);
}

// Start the game loop
update();
