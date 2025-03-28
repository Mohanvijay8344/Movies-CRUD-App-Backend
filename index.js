import mongoose from "mongoose";
import express from "express";
import dotenv from "dotenv";
import DbConnection from "./DbConnection.js";
import router from "./router/data.route.js";
import cors from 'cors';

const PORT = 8000;

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/movies", router)

app.get("/", (req, res) => {
  res.send("Welcome to the movie database!");
})

app.get('/all-movies', async (req, res) => {
  try {
      const movies = await Movies.find();
      res.status(200).json(movies);
  } catch (error) {
      console.log(`Error getting all movies controller: ${error}`);
      res.status(500).json({ message: 'Server error' });
      
  }
})

app.listen(PORT, () => {
  console.log("Server running on port 8000");
  DbConnection();
})