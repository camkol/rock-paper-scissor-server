console.log('hi');
const getUserChoice = userInput => {
    userInput = userInput.toLowerCase();
    if (userInput === 'rock' || userInput === 'paper' || userInput === 'scissors' || userInput === 'bomb') {
        return userInput;
    } else {
        console.log('ERROR');
    }
};
const getComputerChoice = () => {
    const randomNumber = Math.floor(Math.random() * 3);
    switch (randomNumber) {
        case 0:
            return 'rock';
        case 1:
            return 'paper';
        case 2:
            return 'scissors';

    }
}
const determineWinner = (userChoice, computerChoice) => {
    if (userChoice === 'bomb') {
        return 'Winner!!!!'
    }
    if (userChoice === computerChoice) {
        return 'Tie'
    }
    if (userChoice === 'rock') {
        if (computerChoice === 'paper') {
            return 'The computer won';
        } else {
            return 'You won'
        }
    }
    if (userChoice === 'paper') {
        if (computerChoice === 'scissors') {
            return 'The computer won';
        } else {
            return 'You won!'
        }
    }
    if (userChoice === 'scissors') {
        if (computerChoice === 'rock') {
            return 'The computer won';
        } else {
            return 'You won!'
        }
    }
}
const playGame = () => {
    let userChoice = getUserChoice('bomb');
    let computerChoice = getComputerChoice();
    console.log('You went ' + userChoice)
    console.log('The computer went ' + computerChoice);
    console.log(determineWinner(userChoice, computerChoice))
};
playGame()