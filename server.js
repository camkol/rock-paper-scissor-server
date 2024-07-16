import express from "express";
import fs from "fs";
import crypto from "crypto";

const app = express();

app.use(express.json());

app.use(express.static("public"));

const queryAllResults = () => {
  const resultsfile = fs.readFileSync("resultDatabase.json", "utf-8");
  return JSON.parse(resultsfile);
};

const saveAllResults = (results) => {
  fs.writeFileSync("resultDatabase.json", JSON.stringify(results, null, 2));
};

app.get("/choices", (req, res) => {
  const choicesFile = fs.readFileSync("choiceDatabase.json", "utf-8");
  const choices = JSON.parse(choicesFile);
  res.json(choices);
});

app.get("/results", (req, res) => {
  const results = queryAllResults();
  res.json(results);
});

app.post("/results", (req, res) => {
  const results = queryAllResults();
  const result = { id: crypto.randomUUID(), ...req.body };
  results.push(result);
  saveAllResults(results);
  res.status(201).json(result);
});

app.delete("/results/:id", (req, res) => {
  const { id } = req.params;
  const results = queryAllResults();
  results.filter((result) => result.id !== id);
  saveAllResults(results);
  res.status(204).send();
});

app.listen(3000, () => {
  console.log("app is running on 3000");
});
