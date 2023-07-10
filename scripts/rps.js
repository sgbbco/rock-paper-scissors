// Map playerScoreboard, cpuScoreboard to update id='scoreboard'
const playerScoreboard = document.getElementById('playerScore');
const cpuScoreboard = document.getElementById('cpuScore');

// Map choices to image URLs
const imageUrls = {
  'rock': 'https://www.nicepng.com/png/detail/6-61708_rock-rock-paper-scissors-clipart.png',
  'paper': 'https://www.pngitem.com/pimgs/m/266-2667252_transparent-rock-paper-scissors-clipart-rock-paper-scissors.png',
  'scissors': 'https://www.seekpng.com/png/detail/111-1114370_rock-paper-scissors-rock-paper-scissors-clipart.png'
};

function playRound(playerSelection, computerSelection) {
  playerSelection = playerSelection.toLowerCase();
  if (playerSelection === computerSelection) {
    return 'It\'s a tie!';
  }
  if ((playerSelection === 'rock' && computerSelection === 'scissors') ||
    (playerSelection === 'paper' && computerSelection === 'rock') ||
    (playerSelection === 'scissors' && computerSelection === 'paper')) {
    return 'You Win! ' + playerSelection + ' beats ' + computerSelection + '.';
  } else {
    return 'You Lose! ' + computerSelection + ' beats ' + playerSelection + '.';
  }
}

function getComputerSelection() {
  const choices = ['rock', 'paper', 'scissors'];
  const randomIndex = Math.floor(Math.random() * choices.length);
  return choices[randomIndex];
}

function displayBattlefield(playerSelection, computerSelection) {
  var playerDiv = document.getElementById('playerChoice');
  var computerDiv = document.getElementById('computerChoice');

  // Remove any existing images
  while (playerDiv.firstChild) playerDiv.removeChild(playerDiv.firstChild);
  while (computerDiv.firstChild) computerDiv.removeChild(computerDiv.firstChild);

  // Create new images and add them to the battlefield divs
  var playerImg = document.createElement('img');
  var computerImg = document.createElement('img');
  playerImg.src = imageUrls[playerSelection]; // look up image URL based on player's choice
  computerImg.src = imageUrls[computerSelection]; // look up image URL based on computer's choice
  playerImg.alt = playerSelection;
  computerImg.alt = computerSelection;
  playerDiv.append(playerImg);
  computerDiv.append(computerImg);
}

let playerScore = 0;
let computerScore = 0;

const buttons = document.querySelectorAll('.choice');
const resultsDiv = document.querySelector('#results');

buttons.forEach((button) => {
  button.addEventListener('click', function () {
    const playerSelection = this.id;
    const computerSelection = getComputerSelection();
    const result = playRound(playerSelection, computerSelection);

    displayBattlefield(playerSelection, computerSelection);

    if (result && typeof result === 'string') {
      if (result.includes('Win')) {
        playerScore++;
      } else if (result.includes('Lose')) {
        computerScore++;
      }
    }

    resultsDiv.textContent = result;
    playerScoreboard.textContent = playerScore;
    cpuScoreboard.textContent = computerScore;

    if (playerScore == 5 || computerScore == 5) {
      resultsDiv.textContent += ' Game Over. ' + (playerScore > computerScore ? 'You are the winner!' : 'Computer is the winner!');
      playerScore = 0;
      computerScore = 0;
    }
  });
});
