import express from "express";
const app = express();

app.use(express.json()); // import json middleware for parsing json in the body

app.get("/", (req, res) => {
  res.send("hello world");
});

app.listen(3000, () => {
  console.log("This app listening to http://localhost:3000");
});
