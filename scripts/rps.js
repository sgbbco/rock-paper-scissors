
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

let playerScore = 0;
let computerScore = 0;

const buttons = document.querySelectorAll('.choice');
const resultsDiv = document.querySelector('#results');

buttons.forEach((button) => {
  button.addEventListener('click', function () {
    const playerSelection = this.id;
    const computerSelection = getComputerSelection();
    const result = playRound(playerSelection, computerSelection);

    if (result && typeof result === 'string') {
      if (result.includes('Win')) {
        playerScore++;
      } else if (result.includes('Lose')) {
        computerScore++;
      }
    }

    resultsDiv.textContent = result + ' Score: ' + playerScore + ' - ' + computerScore;

    if (playerScore == 5 || computerScore == 5) {
      resultsDiv.textContent += ' Game Over. ' + (playerScore > computerScore ? 'You are the winner!' : 'Computer is the winner!');
      playerScore = 0;
      computerScore = 0;
    }
  });
});
