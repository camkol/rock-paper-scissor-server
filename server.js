import express from "express";
import fs from "fs";

const app = express();

app.use(express.json());

app.use(express.static("public"));

let results = JSON.parse(fs.readFileSync("resultDatabase.json", "utf-8"));

app.get("/choices", (req, res) => {
  const choicesFile = fs.readFileSync("choiceDatabase.json", "utf-8");
  const choices = JSON.parse(choicesFile);
  res.json(choices);
});

app.get("/results", (req, res) => {
  res.json(results);
});

app.post("/results", (req, res) => {
  const result = req.body;
  results.push(result);
  fs.writeFileSync("resultDatabase.json", JSON.stringify(results, null, 2));
  res.status(201).json(result);
});

app.listen(3000, () => {
  console.log("app is running on 3000");
});
