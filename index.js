const express = require("express");
const data = require("./data.json");
const fs = require("fs");

const app = express();
const cors = require("cors");
const port = 8000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  return res.send("Welcome to Movies CRUD Application Backend Server 💕💕💕");
});

app.get("/all-movies", (req, res) => {
  return res.send(data);
});

app.delete("/delete/:id", (req, res) => {
  const movieId = parseInt(req.params.id);
  const filteredData = data.filter((movie) => movie.id !== movieId);
  fs.writeFile("./data.json", JSON.stringify(filteredData), (err, data) => {
    return res.json(filteredData);
  });
});

app.post("/add-movie", (req, res) => {
  const { title, year, director, genres, runtime } = req.body;

  if (!title || !year || !director || !genres || !runtime) {
    return res.status(400).send({ message: "All fields are required" });
  }

  let id = Date.now();
  data.push({ title, year, director, genres: [genres], runtime, id });

  fs.writeFile("./data.json", JSON.stringify(data, null, 2), (err) => {
    if (err) {
      return res.status(500).json({ message: "Failed to add movie details" });
    }
    return res.json({ message: "Movie details added successfully" });
  });
});

app.patch("/add-movie/:id", (req, res) => {
  const movieId = parseInt(req.params.id);

  const { title, year, director, genres, runtime } = req.body;

  if (!title || !year || !director || !genres || !runtime) {
    return res.status(400).send({ message: "All fields are required" });
  }

  let index = data.findIndex((data) => data.id === movieId);
  data.splice(index, 1, { ...req.body });

  fs.writeFile("./data.json", JSON.stringify(data, null, 2), (err) => {
    if (err) {
      return res.status(500).json({ message: "Failed to add movie details" });
    }
    return res.json({ message: "Movie details updated successfully" });
  });
});

app.listen(port, () => {
  console.log(`App is running at ${port}`);
});
