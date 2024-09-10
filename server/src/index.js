import dotenv from "dotenv"
import express from "express";
import connectDB from "./db/connectDB.js";

dotenv.config({
    path:"./.env"
})


const app = express();
const PORT = 3000;

connectDB();

app.get("/", (req, res) => {
    res.send("Hello World !");
});

app.listen(PORT, (req, res) => {
    console.log(`Server is running on ----> http://localhost:${PORT}`);
})

