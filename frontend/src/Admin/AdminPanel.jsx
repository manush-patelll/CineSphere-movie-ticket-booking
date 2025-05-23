import { useState, useEffect } from "react";
import MovieForm from "./MovieForm";
import ShowtimeForm from "./ShowTimeForm";
import { getAllMovies } from "../../services/movieService";
import axios from "../api.js";
import Loading from "../components/Loading";
import { useAuth } from "../context/AuthContext";
import { Navigate, useNavigate } from "react-router-dom";

const AdminPanel = () => {
  const [movies, setMovies] = useState([]);
  const [showtimes, setShowtimes] = useState([]);
  const [screen, setScreens] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [activeTab, setActiveTab] = useState("movies");
  const [isLoading, setIsLoading] = useState(true);
  const { user, verifyToken } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const isAdmin = await verifyToken();
        if (!isAdmin) {
          navigate("/");
        }
        const movie = await getAllMovies();
        const screens = await axios.get("/screens");
        const showtime = await axios.get("/showtimes");

        setMovies(movie.data.data);
        setScreens(screens.data);
        setShowtimes(showtime.data.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleAddMovie = async (newMovie) => {
    try {
      setIsLoading(true);
      const response = await axios.post(
        "/movies",
        newMovie
      );
      const data = await response.data.data;
      setMovies((prev) => [...prev, data[0]]);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateMovie = async (updatedMovie) => {
    try {
      setIsLoading(true);
      const response = await axios.put(
        `/movies/${selectedMovie._id}`,
        updatedMovie
      );
      const data = response.data;
      setMovies(movies.map((m) => (m._id === data._id ? data : m)));
      alert("Changes Saved successfully");
      setSelectedMovie(null);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteMovie = async (id) => {
    try {
      setIsLoading(true);
      if (!window.confirm("Confirm to delete Movie ?")) return;
      await axios.delete(`/movies/${id}`);
      setMovies(movies.filter((m) => m._id !== id));
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddShowtime = async (newShowtime) => {
    try {
      const result = await axios.post(
        "/showtimes",
        newShowtime
      );
      setShowtimes([...showtimes, result.data]);
    } catch (error) {
      alert("Error adding showtime.");
    }
  };

  const handleDeleteShowtime = async (id) => {
    setIsLoading(true);
    try {
      await axios.delete(`/showtimes/${id}`);
      setShowtimes(showtimes.filter((s) => s._id !== id));
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatTime = (isoTime) => {
    return new Date(isoTime).toLocaleString("en-IN", {
      dateStyle: "short",
      timeStyle: "short",
      hour12: true,
    });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen dark:bg-gray-900">
        <Loading />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-6">
      <div className="max-w-6xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
            Movie Admin Panel
          </h1>
        </div>

        <div className="flex border-b border-gray-200 dark:border-gray-700">
          <button
            className={`px-4 py-2 font-medium ${
              activeTab === "movies"
                ? "text-blue-600 border-b-2 border-blue-600 dark:text-blue-400 dark:border-blue-400"
                : "text-gray-600 dark:text-gray-300"
            }`}
            onClick={() => setActiveTab("movies")}
          >
            Movies
          </button>
          <button
            className={`px-4 py-2 font-medium ${
              activeTab === "showtimes"
                ? "text-blue-600 border-b-2 border-blue-600 dark:text-blue-400 dark:border-blue-400"
                : "text-gray-600 dark:text-gray-300"
            }`}
            onClick={() => setActiveTab("showtimes")}
          >
            Showtimes
          </button>
        </div>

        <div className="p-6">
          {activeTab === "movies" ? (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Manage Movies</h2>
                <button
                  onClick={() => setSelectedMovie({})}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                >
                  Add New Movie
                </button>
              </div>

              {selectedMovie && (
                <MovieForm
                  movie={selectedMovie}
                  onSave={
                    selectedMovie._id ? handleUpdateMovie : handleAddMovie
                  }
                  onCancel={() => setSelectedMovie(null)}
                />
              )}

              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                        Title
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                        Genre
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                        Duration
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                    {movies.map((movie) => (
                      <tr key={movie._id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {movie.title}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {movie.generes.join(", ")}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {movie.duration} mins
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap space-x-2">
                          <button
                            onClick={() => setSelectedMovie(movie)}
                            className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-600"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteMovie(movie._id)}
                            className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-600"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Manage Showtimes</h2>
                {/* <button
                  onClick={() => setSelectedMovie({})}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                >
                  Add New Showtime
                </button> */}
              </div>

              <ShowtimeForm
                movies={movies}
                screens={screen}
                onSave={handleAddShowtime}
              />

              <div className="overflow-x-auto mt-6">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                        Movie
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                        Screen
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                        Time
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                    {showtimes.map((showtime) => {
                      const movie = movies.find(
                        (m) => m._id === showtime.movie_id
                      );
                      const sc = screen.find(
                        (s) => s._id === showtime.screen_id
                      );
                      return (
                        <tr key={showtime._id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {movie?.title || "Unknown"}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {sc?.screenName || "Unknown"}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {formatTime(showtime.start_time)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <button
                              onClick={() => handleDeleteShowtime(showtime._id)}
                              className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-600"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
