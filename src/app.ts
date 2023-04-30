import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import scraper from "./scraper";

const app = express();
dotenv.config();
app.use(express.json());

app.get("/", async (req, res) => {
	const result = await scraper();
	res.send({ okay: true });
});

app.listen(4000, () => {
	console.log("This app listening to http://localhost:4000");
});
