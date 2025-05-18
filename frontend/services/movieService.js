// src/services/movieService.js
import axios from "../src/api"; // adjust path as per your folder structure


export const getAllMovies = async (params = {}) => {
  try {
    const response = await axios.get("/movies", {
      params,
    });
    return response;
  } catch (error) {
    console.error("Error fetching movies:", error);
    throw error;
  }
};

export const getMovieDetails = async (params) => {
  try {
    const id = params.movieId;
    const response = await axios.get(`/movies/${id}`, { id });
    return response;
  } catch (error) {
    console.error("Error fetching movie", error);
  }
}

// Optional: Add specific methods for filtered queries
// export const getNowShowingMovies = async () => {
//   return getAllMovies({ nowShowing: "true" });
// };

// export const getComingSoonMovies = async () => {
//   return getAllMovies({ comingSoon: "true" });
// };

// export const getMoviesByGenre = async (genre) => {
//   return getAllMovies({ genre });
// };
