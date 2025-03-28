import mongoose from "mongoose";

const MoviesSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    director: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    runtime: {
        type: Number,
        required: true
    }, 
    actors: {
        type: [String],
        required: true
    },
    genres: {
        type: [String],
        required: true
    }
})

const Movies = mongoose.model("Movies Api", MoviesSchema);

export default Movies;