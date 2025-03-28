import express from "express";
import { addMovie, deleteMovie, editMovie, getAllMovies } from "../controller/data.controller.js";

const app = express();

const router = express.Router();

router.get("/all-movies", getAllMovies)
router.post("/add-movie", addMovie)
router.patch('/add-movie/:id', editMovie)
router.delete('/delete/:id', deleteMovie)

export default router;