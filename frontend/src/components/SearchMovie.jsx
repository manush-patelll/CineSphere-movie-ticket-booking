import { useNavigate } from "react-router-dom";
import axios from "../api";
import { useEffect, useState } from "react";

const SearchMovie = () => {
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedTerm, setDebouncedTerm] = useState("");
  const [searchResult, setSearchResult] = useState([]);

  const navigate = useNavigate(); // ✅ correct usage

  const handleMovieDetail = (id) => {
    console.log(id);
    navigate(`/movieDetails/${id}`);
  };

  // Debounce the search input
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedTerm(searchTerm);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchTerm]);

  // Fetch results after debounce
  useEffect(() => {
    const fetchSearch = async () => {
      if (!debouncedTerm.trim()) return;
      try {
        const response = await axios.get(`/search/${debouncedTerm}`);
        setSearchResult(response.data.movies || []);
      } catch (error) {
        console.error("Search error:", error);
      }
    };

    fetchSearch();
  }, [debouncedTerm]);

  return (
    <div className="relative w-full flex justify-center">
      <div className="w-[320px] sm:w-[340px] md:w-[380px] relative">
        <form
          className="search-form flex items-center gap-3"
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            type="text"
            placeholder="Search Movies, Actors, Genres..."
            className="w-full p-3 rounded-lg text-white border border-gray-300 focus:outline-none bg-black/50"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onFocus={() => setIsSearchActive(true)}
            onBlur={() => setTimeout(() => setIsSearchActive(false), 200)}
          />
          <button
            type="submit"
            className="bg-[#5C7285] px-4 py-3 rounded-lg text-white hover:bg-yellow-600 transition duration-200"
          >
            Search
          </button>
        </form>

        {/* Search results directly below input */}
        {isSearchActive && searchResult.length > 0 && (
          <div className="absolute top-full left-0 mt-2 w-full bg-[#1c1c1c] text-white rounded-lg shadow-lg z-50 p-4 max-h-64 overflow-y-auto scrollbar">
            <p className="text-sm text-gray-400">Search Results</p>
            <ul className="mt-2 space-y-2 ">
              {searchResult.map((movie) => (
                <li
                  key={movie._id}
                  className="hover:bg-gray-700 p-2 rounded cursor-pointer"
                  onClick={() => handleMovieDetail(movie._id)} // ✅ correct navigation
                >
                  {movie.title}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchMovie;
