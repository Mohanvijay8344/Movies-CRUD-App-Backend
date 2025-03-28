import mongoose from "mongoose";
import Movies from "../Schema/MoviesSchema.js";

export const getAllMovies = async (req, res) => {
    try {
        const movies = await Movies.find();
        res.status(200).json(movies);
    } catch (error) {
        console.log(`Error getting all movies controller: ${error}`);
        res.status(500).json({ message: 'Server error' });
        
    }
}

export const addMovie = async (req, res) => {
    try {
        const {title, director, year, runtime, actors, genres} = req.body;
        const newMovie = new Movies({
            title,
            director,
            year,
            runtime,
            actors,
            genres
        })
        await newMovie.save();
        res.status(201).json(newMovie);
    } catch (error) {
        console.log(`Error in add movie controller: ${error}`);
        res.status(500).json({ message: 'Server error' });
        
    }
}

export const editMovie = async (req, res) => {
    try {
        const moviesId = req.params.id;
        const {title, director, year, runtime, actors, genres} = req.body;


        if(!title || !director || !year || !runtime || !actors || !genres){
            return res.status(400).json({ message: 'All fields are required' });
        }

        const movieExists = await Movies.findById(moviesId);
        if(!movieExists){
            return res.status(404).json({ message: 'Movie not found' });
        }

        const updatedMovie = await Movies.findByIdAndUpdate(moviesId, {
            title,
            director,
            year,
            runtime,
            actors,
            genres
        }, {new: true});
        res.status(200).json(updatedMovie);

    } catch (error) {
        console.log(`Error in edit movie controller: ${error}`);
        res.status(500).json({ message: 'Server error' });
    }
}

export const deleteMovie = async (req, res) => {
    try {
        const moviesId = req.params.id;

        const movieExists = await Movies.findById(moviesId);
        if(!movieExists){
            return res.status(404).json({ message: 'Movie not found' });
        }

        await Movies.findByIdAndDelete(moviesId);
        res.status(200).json({ message: 'Movie deleted successfully' });
    } catch (error) {
        console.log(`Error in delete movie controller: ${error}`);
        res.status(500).json({ message: 'Server error' });
    }
}
