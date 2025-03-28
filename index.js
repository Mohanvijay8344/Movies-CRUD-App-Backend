import mongoose from "mongoose";
import express from "express";
import dotenv from "dotenv";
import DbConnection from "./DbConnection.js";
import router from "./router/data.route.js";
import cors from 'cors';
import Movies from "./Schema/MoviesSchema.js";

const PORT = 8000;

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/movies", router)

app.get("/", (req, res) => {
  res.send("Welcome to the movie database!");
})


app.listen(PORT, () => {
  console.log("Server running on port 8000");
  DbConnection();
})