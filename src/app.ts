import express from "express";
import dotenv from "dotenv";
import cors from "cors";

const app = express();
dotenv.config();
app.use(express.json());

app.get("/", (req, res) => {
	res.send("hello world");
});

app.listen(4000, () => {
	console.log("This app listening to http://localhost:4000");
});
