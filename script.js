const startBtn = document.getElementById('start-button');
const gameContainer = document.querySelector('.game');
const playerCharacter = document.querySelector('.player');
const chasingMonster = document.querySelector('.monster');
const scoreCounter = document.querySelector('.score');
let isPlaying = false;
let currentScore = 0;
let difficultyScore = 0;
let monsterSpeed = 1.5;
const playerSpeed = 5;
const keysPressed = {};
startBtn.addEventListener('click', startGame);
document.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
        startGame();
    }
});
document.addEventListener('keydown', e => {
    if (isPlaying) keysPressed[e.key] = true;
});
document.addEventListener('keyup', e => {
    if (isPlaying) keysPressed[e.key] = false;
});
function startGame() {
    gameContainer.style.display = 'block';
    startBtn.parentNode.style.display = 'none';
    isPlaying = true;
    playerCharacter.style.left = '0px';
    playerCharacter.style.bottom = '0px';
    chasingMonster.style.left = '500px';
    chasingMonster.style.bottom = '50px';
    currentScore = 0;
    scoreCounter.textContent = `Счёт: ${currentScore}`;
    monsterAI();
    gameLoop();
}
function movePlayer() {
    if (!isPlaying) return;
    const gameBounds = gameContainer.getBoundingClientRect();
    let x = parseFloat(playerCharacter.style.left) || 0;
    let y = parseFloat(playerCharacter.style.bottom) || 0;
    if (keysPressed.ArrowLeft) x = Math.max(x - playerSpeed, 0);
    if (keysPressed.ArrowRight) x = Math.min(x + playerSpeed, gameBounds.width - 50);
    if (keysPressed.ArrowUp) y = Math.min(y + playerSpeed, gameBounds.height - 50);
    if (keysPressed.ArrowDown) y = Math.max(y - playerSpeed, 0);
    playerCharacter.style.left = x + 'px';
    playerCharacter.style.bottom = y + 'px';
}
function monsterAI() {
    if (!isPlaying) return;
    const playerRect = playerCharacter.getBoundingClientRect();
    const monsterRect = chasingMonster.getBoundingClientRect();
    const gameRect = gameContainer.getBoundingClientRect(); 
    let monsterX = parseFloat(chasingMonster.style.left) || 0;
    let monsterY = parseFloat(chasingMonster.style.bottom) || 0;
    const deltaX = playerRect.left - monsterRect.left;
    const deltaY = playerRect.bottom - monsterRect.bottom;
    const angle = Math.atan2(deltaY, deltaX);
    const moveX = monsterSpeed * Math.cos(angle);
    const moveY = monsterSpeed * Math.sin(angle);
    monsterX += moveX;
    monsterY -= moveY;
    monsterX = Math.max(0, Math.min(monsterX, gameRect.width - 50));
    monsterY = Math.max(0, Math.min(monsterY, gameRect.height - 50));
    chasingMonster.style.left = monsterX + 'px';
    chasingMonster.style.bottom = monsterY + 'px';
    if (Math.abs(playerRect.left - monsterRect.left) < 50 &&
        Math.abs(playerRect.bottom - monsterRect.bottom) < 50) {
        gameOver();
    } else {
       requestAnimationFrame(monsterAI);
    }
}
function gameOver() {
    isPlaying = false;
    alert('АХАХХАХАХАХАХАХАХ ТЫ ПРОИГРАЛ');
    gameContainer.style.display = 'none';
    startBtn.parentNode.style.display = 'block';
    location.reload();
}
function gameLoop() {
    if (!isPlaying) return;
    movePlayer();
    currentScore += 5;
    difficultyScore += 5;
    scoreCounter.textContent = `Счёт: ${currentScore}`;
    requestAnimationFrame(gameLoop);
    if (difficultyScore > 1000){
      difficultyScore -= 1000;
      monsterSpeed += 1;
    }
    if (currentScore > 5000){
      alert('Ты смог сбежать........ Я устала');
      isPlaying = false;
    gameContainer.style.display = 'none';
    startBtn.parentNode.style.display = 'block';
    location.reload();
    }
}
