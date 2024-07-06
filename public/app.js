const selection = document.getElementById("selection");
const rockButton = document.getElementById("rock");
const paperButton = document.getElementById("paper");
const scissorButton = document.getElementById("scissor");
const outcome = document.getElementById("outcome");
const results = document.getElementById("results");

let choices = [];
let rock, paper, scissor;

const runChoice = async () => {
  const response = await fetch("/choices");
  choices = await response.json();

  rock = choices[0];
  paper = choices[1];
  scissor = choices[2];

  console.log(rock, paper, scissor);
};
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
const addResult = (result) => {
  results.appendChild(result);
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
      computerChoice.name === "scissor" ? "The computer won!" : "You won!";
  } else if (userChoice.name === "scissor") {
    winnerText =
      computerChoice.name === "rock" ? "The computer won!" : "You won!";
  }

  const winner = document.createElement("p");
  winner.innerText = winnerText;
  outcome.appendChild(winner);
};

rockButton.addEventListener("click", () => {
  outcome.innerHTML = "";
  const computer = getComputerChoice();
  determineWinner(rock, computer);
});
paperButton.addEventListener("click", () => {
  outcome.innerHTML = "";
  const computer = getComputerChoice();
  determineWinner(paper, computer);
});
scissorButton.addEventListener("click", () => {
  outcome.innerHTML = "";
  const computer = getComputerChoice();
  determineWinner(scissor, computer);
});

runChoice();
