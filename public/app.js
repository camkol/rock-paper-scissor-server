const selection = document.getElementById("selection");
const rockButton = document.getElementById("rock");
const paperButton = document.getElementById("paper");
const scissorButton = document.getElementById("scissor");
const outcome = document.getElementById("outcome");
const resultsContainer = document.getElementById("results");

let choices = [];
let rock, paper, scissor;

console.log(new Date());

const runChoice = async () => {
  const response = await fetch("/choices");
  choices = await response.json();

  rock = choices[0];
  paper = choices[1];
  scissor = choices[2];

  console.log(rock, paper, scissor);
};

const runResults = async () => {
  const response = await fetch("/results");
  const results = await response.json();
  console.log(results);

  results.forEach((result) => {
    addResultDOM(result);
    //  <em>${result.id.getDate()}-${
    //       result.id.getMonth() + 1
    //     }-${result.id.getFullYear()} @${result.id.getHours()}:${result.id.getMinutes()}:${result.id.getSeconds()}</em>
  });
};

const addResult = async (result) => {
  const response = await fetch("/results", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(result),
  });

  if (response.ok) {
    const newResult = await response.json();
    addResultDOM(newResult);
  }
};

const addResultDOM = (result) => {
  const resultDiv = document.createElement("div");
  resultDiv.setAttribute("id", result.id);
  resultDiv.innerHTML = `${result.user}${result.computer}${result.winner} <emote>-${result.date}@${result.time}</emote><span data-id="${result.id}">❌</span>`;
  resultsContainer.appendChild(resultDiv);
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

const determineWinner = (userChoice, computerChoice) => {
  const userHand = userChoice.hand;
  const computerHand = computerChoice.hand;

  const result = document.createElement("p");
  result.innerText = `You went ${userHand} and the computer went ${computerHand}`;
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

  const dateTime = new Date();
  const newResult = {
    user: userHand,
    computer: computerHand,
    winner: winnerText,
    date: `${dateTime.getDate()}-${
      dateTime.getMonth() + 1
    }-${dateTime.getFullYear()}`,
    time: `${dateTime.getHours()}:${
      (dateTime.getMinutes() < 10 ? "0" : "") + dateTime.getMinutes()
    }:${(dateTime.getSeconds() < 10 ? "0" : "") + dateTime.getSeconds()}`,
    id: dateTime.toISOString(),
  };

  addResult(newResult);
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

resultsContainer.addEventListener("click", function (e) {
  e.target.nodeName === "SPAN" && e.target.parentElement.remove();
});

runChoice();
runResults();
