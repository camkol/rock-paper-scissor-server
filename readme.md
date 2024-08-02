# Rock, Paper, Scissors

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
- [Instructions](#instructions)
  - [Setting up Server](#setting-up-server)
  - [Creating a Database](#creating-a-database)
- [Author](#author)

## Overview

### The challenge

Users should be able to:

- View the optimal layout for the app depending on their device's screen size
- Press buttons based on decision
- Experience a dungeon simulator

### Screenshot

![](./screen.JPG)

### Links

- Live Site URL: [View](https://camkol.github.io/DragonRepeller/)

## My process

- The code creates a Rock-Paper-Scissors game using an Express server and a static HTML/JavaScript front end.
- The server provides endpoints to retrieve game choices and results, and to add or delete game results.
- The client fetches choices and results from the server and displays them on the page.
- When a player makes a choice, the client determines the winner and sends the result to the server.
- The server stores the result in a JSON file and the client updates the displayed results.
- Deleting a result triggers a request to the server, which removes the result from the JSON file and refreshes the display.

### Built with

- Semantic HTML5 markup
- CSS custom properties
- [Sass](https://sass-lang.com/) - Preprocessor scripting language
- Flexbox
- CSS Grid
- Mobile-first workflow
- Mobile-Responsive Design
- JavaScript - Scripting language
- [Node.js](https://nodejs.org/) - JavaScript runtime environment
- [Node.js Docs: Filesystem](https://nodejs.org/docs/latest-v20.x/api/fs.html)
- [Express](https://expressjs.com/) - Most-used web framework for Node.js

### What I learned

Increase server startup time. Learning how to move more objects to the server. I learned that you cant transfer functions from server to app. They have top be strings first in the server and then converted to functions with the global `window` object. Also the async functions of the transfer must be called at them bottom of the app. creating database, I found a better way for separating each object.

### Continued development

I want to later to include images and animation.

## Instructions

### Setting up Server

### 1. Create a project folder

```bash
mkdir rock-paper-scissor
cd rock-paper-scissor
```

### 2. Create a `server.js`

```bash
touch server.js
```

### 3. Make a simple static website (HTML, CSS + JS) in `./public` within the project folder

`index.html`

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="style.css" />
    <title>Rock, Paper, Scissor</title>
  </head>
  <body>
    <h1>Rock, Paper, Scissor</h1>
    <h2>Choose</h2>
    <div id="selection">
      <button id="rock">✊</button>
      <button id="paper">✋</button>
      <button id="scissor">✌️</button>
    </div>
    <div id="outcome"></div>
    <script src="app.js"></script>
  </body>
</html>
```

`style.css`

```css
body {
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
}
```

`app.js`

```javascript
const selection = document.getElementById("selection");
const rockButton = document.getElementById("rock");
const paperButton = document.getElementById("paper");
const scissorButton = document.getElementById("scissor");
const outcome = document.getElementById("outcome");

const choices = [
  { name: "rock", hand: "✊" },
  { name: "paper", hand: "✋" },
  { name: "scissor", hand: "✌️" },
];

const rock = choices[0];
const paper = choices[1];
const scissor = choices[2];

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
```

### 4. Initialized a new _Node.js_ project

```bash
npm init -y
```

- `package.json`: The 'manifest' of a Node.js application - Defines name, version, author etc. - Defines scripts which make complex tasks easier - Lists dependencies

`package.json`

```javascript
{
  "name": "rock-paper-scissor",
  "version": "1.0.0",
  "main": "server.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "node server.js"
  },
  "author": "",
  "license": "ISC",
  "description": "",
}

```

### 5. Add `"type": "module"` for ES module support.

`package.json`

```javascript
{
  "name": "rock-paper-scissor",
  "version": "1.0.0",
  "main": "server.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "node server.js"
  },
  "author": "",
  "license": "ISC",
  "description": "",
  "type": "module",
}
```

### 6. Installed a first `npm` package: `express` and import.

```bash
npm i express
```

`package.json`

```javascript
{
  "name": "rock-paper-scissor",
  "version": "1.0.0",
  "main": "server.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "node server.js"
  },
  "author": "",
  "license": "ISC",
  "description": "",
  "type": "module",
  "dependencies": {
    "express": "^4.19.2"
  },
}
```

`server.js`

```javascript
import express from "express";

const app = express();
```

### 7. Serve Static Files

- **What Are Static Files?** Static files refer to files that are sent to the client "as-is" without any modification.
  Common examples include:
  - HTML files
  - CSS files
  - JavaScript files
  - Images (PNG, JPG, GIF, etc.)
  - Fonts and other media
    `server.js`

```javascript
app.use(express.static("public"));
```

1. **Express Middleware**:
   - `app.use` is a method to mount middleware in your Express application. Middleware functions are functions that have access to the request object (`req`), the response object (`res`), and the next middleware function in the application’s request-response cycle.
2. **Serving Static Files**:
   - `express.static` is a built-in middleware function in Express. It serves static files and is based on `serve-static`.
3. **Directory Name**:
   - `"public"` is the name of the directory where your static files are located. When you use `express.static`, you tell Express to serve all files within the specified directory (`public` in this case) at the root level of your application.

### 8. Starting the Server

```javascript
app.listen(3000, () => {
  console.log("app is running on 3000");
});
```

- `app.listen(3000, () => { ... })`: This starts the server on port 3000.
- The callback function inside `app.listen` gets executed once the server starts listening, and it logs "app is running on 3000" to the console.

### 9. Install Nodemon

- Nodemon: Automatically restarts your server when file changes in the directory are detected, which is very useful during development.
- modify ccript:

`package.json`

```bash
- "serve": "node server.js"
+ "serve": "nodemon server.js"
```

## Creating a Database

### 1. Defining a Route

```javascript
app.get("/", (req, res) => {
  res.send("Hello World!");
});
```

- `app.get("/")`: This defines a route for HTTP GET requests to the root URL (`/`).
  - _Routes_: What you visit in a browser / what you call with requests out of JavaScript via AJAX (`fetch`, etc.):
    - `/`: 'home' or 'root'
    - `/bio`: A probable 'sub-site' of your homepage
    - `/my/route`: A different route
    - `/api/todos`: A probably route for an endpoint called via AJAX
- `(req, res) => { ... }`: This is a callback function that gets executed when the route is accessed.
  - `req`: Represents the HTTP request and has properties for the request query string, parameters, body, HTTP headers, etc.
  - `res`: Represents the HTTP response that an Express app sends when it gets an HTTP request.
- `res.send("Hello World!")`: This sends a response back to the client with the text "Hello World!".

### 2. Move _data array_ from `app.js` to `server.js`

```javascript
const choices = [
  { name: "rock", hand: "✊" },
  { name: "paper", hand: "✋" },
  { name: "scissor", hand: "✌️" },
];
```

### 3. Defining the Route

```javascript
app.get("/choices", (req, res) => {
  res.json(choices);
});
```

- **Route Definition**: The route /choices is defined to handle GET requests.
  ```javascript
  app.get("/choices", (req, res) => { ... });
  ```
- **Response with JSON**: When a GET request is made to /choices, the server responds with the choices array in JSON format.

```javascript
(req, res) => {
  res.json(choices);
};
```

- **Express.js Methods**: The res.json method is used to send a JSON response, automatically setting the appropriate headers.

### 4. Update _data array_ in `app.js`

`app.js`

```javascript
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

runChoice(); // Ensure runChoice is called to initialize the choices
```

1. **Dynamic Data Handling**:

   - The second code block now handles data dynamically by fetching it from the server, making it more flexible and easier to update without changing the JavaScript code.

2. **Asynchronous Operation**:

   - `runChoice` is called to fetch and initialize the choices before any button click events are handled.
   - This ensures that when a button is clicked, the choices are already defined and ready to be used.
   - Backend: You serialize stuff _from_ a JS object into text via `res.json(yourJSObject)`
   - Frontend: You deserialize stuff _to_ a JS object from text via `await response.json()`

3. **Maintaining Functionality**:

   - The core functionality (`getComputerChoice` and `determineWinner`) remains the same, ensuring that the game logic is not altered.

### 5. Create `database.json`

- Create `database.json` in project folder.
- Move _data array_ from `server.js` to `database.json`.
  `database.json`

```json
[
  { "name": "rock", "hand": "✊" },
  { "name": "paper", "hand": "✋" },
  { "name": "scissor", "hand": "✌️" }
]
```

- By switching to reading choices from a `database.json` file, the server becomes more flexible and easier to maintain.

### 6. Import File synchronozatian

`server.js`

```javascript
import fs from "fs";
```

### 7. Update the Router handler

`server.js`

```javascript
app.get("/choices", (req, res) => {
  const choicesFile = fs.readFileSync("database.json", "utf-8");
  const choices = JSON.parse(choicesFile);
  res.json(choices);
});
```

- This version reads the `choices` data from an external file (`database.json`).
- `fs.readFileSync("database.json", "utf-8")` reads the content of the `database.json` file synchronously, returning its content as a string.
- `JSON.parse(choicesFile)` parses the string content into a JavaScript array.
- `res.json(choices)` sends the parsed array as a JSON response.

## Author

- Website - [Cameron Howze](https://camkol.github.io/)
- Frontend Mentor - [@camkol](https://www.frontendmentor.io/profile/camkol)
- GitHub- [@camkol](https://github.com/camkol)
- LinkedIn - [@cameron-howze](https://www.linkedin.com/in/cameron-howze-28a646109/)
- E-Mail - [cameronhowze4@outlook.com](mailto:cameronhowze4@outlook.com)
