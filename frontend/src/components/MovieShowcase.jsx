import MovieCard from "./MovieCard";
import { getAllMovies } from "../../services/movieService";
import { useState, useEffect } from "react";
import Loading from "./Loading";
import SearchMovie from "./SearchMovie";

const MoviesShowcase = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setIsLoading(true);
        const params = {};
        const response = await getAllMovies(params);
        let moviesArray = response.data.data;
        setMovies(moviesArray);
        console.log(response.data.data);
        console.log(movie);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMovies();
  }, []);

  if (isLoading) {
    return <Loading />;
  }
  return (
    <section className="movies-showcase bg-[#000000] py-12">
      <SearchMovie />
      <div className="ml-18 mt-10 border-l-2 border-l-amber-50  ">
        <h2 className="text-3xl ml-3 font-bold mb-10 text-[#E2E0C8]">
          Trending Movies
        </h2>
      </div>
      <div className="h-auto text-center ml-3 mr-3 movie-grid grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-6 item-center">
        {movies.map((movie, index) => (
          <MovieCard
            key={movie._id}
            id={movie._id}
            title={movie.title}
            rating={movie.rating}
            genres={movie.generes}
            image={movie.fileName}
          />
        ))}
      </div>
    </section>
  );
};

export default MoviesShowcase;
