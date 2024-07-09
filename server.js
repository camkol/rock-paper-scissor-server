import express from "express";
import fs from "fs";

const app = express();

app.use(express.static("public"));

app.get("/choices", (req, res) => {
  const choicesFile = fs.readFileSync("choiceDatabase.json", "utf-8");
  const choices = JSON.parse(choicesFile);
  res.json(choices);
});
app.get("/results", (req, res) => {
  const resultsFile = fs.readFileSync("resultDatabase.json", "utf-8");
  const results = JSON.parse(resultsFile);
  res.json(results);
});

app.listen(3000, () => {
  console.log("app is running on 3000");
});
