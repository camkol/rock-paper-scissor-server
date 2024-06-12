const selection = document.getElementById("selection");
const rockButton = document.getElementById("rock");
const paperButton = document.getElementById("paper");
const scissorButton = document.getElementById("scisoor");
const outcome = document.getElementById("outcome");

const choices = [
  { name: "rock", hand: "✊" },
  { name: "paper", hand: "✋" },
  { name: "scissor", hand: "✌️" },
];

const rock = choices[0];
const paper = choices[1];
const scissor = choices[2];

const computer = getComputerChoice();

rockButton.onclick(determineWinner(rock, computer));
rockButton.onclick(determineWinner(rock, computer));
rockButton.onclick(determineWinner(rock, computer));

console.log(rock, paper, scissor);

const getComputerChoice = () => {
  const randomNumber = Math.floor(Math.random() * 3);
  switch (randomNumber) {
    case 0:
      return rock;
    case 1:
      return paper;
    case 2:
      return scissor;
  }
};
const determineWinner = (userChoice, computerChoice) => {
  const result = document.createElement("p");
  result.innerText = `You went ${userChoice.hand} and the computer went ${computerChoice.hand}`;
  outcome.appendChild(result);

  let winnerText;

  if (userChoice.name === computerChoice.name) {
    winnerText = "It's a tie!";
  } else if (userChoice.name === "rock") {
    winnerText =
      computerChoice.name === "paper" ? "The computer won!" : "You won!";
  } else if (userChoice.name === "paper") {
    winnerText =
      computerChoice.name === "scissors" ? "The computer won!" : "You won!";
  } else if (userChoice.name === "scissors") {
    winnerText =
      computerChoice.name === "rock" ? "The computer won!" : "You won!";
  }

  const winner = document.createElement("p");
  winner.innerText = winnerText;
  outcome.appendChild(winner);
};
