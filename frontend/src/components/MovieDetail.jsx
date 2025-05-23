import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getMovieDetails } from "../../services/movieService";
import Loading from "./Loading";
import Reviews from "./Reviews";
import { useAuth } from "../context/AuthContext";
import axios from "../api";

const MovieDetail = () => {
  const navigate = new useNavigate();
  const [movie, setMovie] = useState(null);
  let { movieId } = useParams();
  const [moviePoster, setPoster] = useState(null);
  const [bgPoster, setBgPoster] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [selectedRating, setSelectedRating] = useState(0);
  const [review, setReview] = useState(null);
  const { user, verifyToken } = useAuth();

  console.log(movieId);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        const params = { movieId };
        const response = await getMovieDetails(params);
        const movieData = response.data.data[0];
        console.log(movieData.cast);
        setMovie(movieData);
        setPoster(`https://raw.githubusercontent.com/manush-patelll/CineSphere-movie-ticket-booking/refs/heads/main/backend/movieImages/${movieData.fileName}`);
        setBgPoster(
          `https://raw.githubusercontent.com/manush-patelll/CineSphere-movie-ticket-booking/refs/heads/main/backend/movieImages/${movieData.bgPosterName}`
        );
      } catch (err) {
        console.error("Error fetching movie:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, [movieId]);

  const handleSubmit = async (e) => {
    navigate(`/booking?movie_id=${movieId}`);
  };
  const formatTime = (isoTime) => {
    return new Date(isoTime).toLocaleString("en-IN", {
      dateStyle: "medium",
      // timeStyle: "short",
      hour12: true,
    });
  };

  const handleReviewSubmit = async () => {
    try {
      setLoading(true);
      if (user) {
        await verifyToken();
      } else {
        alert("You need to login for give the rewies of movie");
      }

      const response = await axios.post("/revies", {
        movieId: movie._id,
        userId: user.id,
        rating: selectedRating,
        comment: review,
      });

      console.log(response);
    } catch (error) {
      console.log(error);
    } finally {
      setShowReviewModal(false);
      setLoading(false);
    }
  };

  if (loading)
    return (
      <div className="text-white">
        <Loading />
      </div>
    );
  if (!movie) return <div className="text-white">Movie not found</div>;

  return (
    <>
      {/* Hero Section with Content Container Background */}
      <section className="relative pt-16 md:pt-24">
        {/* Content Container with Background Image and Gradient */}
        <div
          className="container mx-auto px-4 relative rounded-xl overflow-hidden"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 0.9), rgba(26, 26, 26, 0.9), rgba(255, 255, 255, 0.3)), url(${bgPoster})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            minHeight: "300px",
          }}
        >
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-8 p-6 md:p-8">
            {/* Movie Poster - Responsive sizing */}
            <div className="w-32 md:w-1/4 max-w-xs shrink-0">
              <img
                src={moviePoster}
                alt={movie.title}
                className="w-full h-auto rounded-xl md:rounded-2xl shadow-lg"
              />
            </div>

            {/* Movie Info */}
            <div className="text-white flex-1">
              <h1 className="text-2xl md:text-4xl font-bold mb-2 md:mb-4">
                {movie.title}
              </h1>

              <div className="flex flex-wrap items-center gap-2 mb-3 md:mb-4">
                <span className="bg-amber-50/30 px-2 py-1 text-xs md:text-sm rounded-2xl">
                  Hindi
                </span>
                <span className="text-xs md:text-sm text-gray-300">
                  {movie.duration}m • {movie.generes.join(" | ")} •{" "}
                  {formatTime(movie.releaseDate)}
                </span>
              </div>

              <div
                onClick={() => setShowReviewModal(true)}
                className="flex items-center gap-2 mb-4 md:mb-6 p-2 bg-[#8999a8]/30 rounded-xl w-fit cursor-pointer hover:scale-105 transition duration-100"
              >
                <span>⭐{movie.rating}/5</span>
                <span className="bg-[#5C7285] px-3 py-1 rounded-lg text-sm">
                  Rate Now
                </span>
              </div>

              <button
                onClick={handleSubmit}
                className="px-4 py-2 text-sm md:text-base rounded-xl bg-[#5C7285] hover:scale-105 transition duration-100"
              >
                Book Now
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Movie Details Section */}
      <section className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="border-l-2 border-l-amber-50 pl-3 mb-4">
            <h2 className="text-xl md:text-2xl font-bold text-[#E2E0C8]">
              About Movie
            </h2>
          </div>
          <p className="text-amber-50 text-sm md:text-base">
            {movie.discription}
          </p>
        </div>

        <div>
          <div className="border-l-2 border-l-amber-50 pl-3 mb-4">
            <h2 className="text-xl md:text-2xl font-bold text-[#E2E0C8]">
              Casts
            </h2>
          </div>
          <p className="text-amber-50 text-sm md:text-base">
            {movie.cast.join(" • ")}
          </p>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="container mx-auto px-4 pb-8">
        <Reviews movieId={movieId} />
      </section>

      {/* Review Modal */}
      {showReviewModal && (
        <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50 p-4">
          <div className="bg-white p-6 rounded-xl w-full max-w-md relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowReviewModal(false)}
              className="absolute top-2 right-3 text-lg font-bold cursor-pointer"
            >
              ✕
            </button>
            <h3 className="text-lg md:text-xl font-bold mb-4">
              Rate and Review {movie.title}
            </h3>
            <form>
              <label className="block mb-2 text-sm md:text-base">Rating:</label>
              <div className="flex space-x-1 mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg
                    key={star}
                    onClick={() => setSelectedRating(star)}
                    className={`w-6 h-6 md:w-8 md:h-8 cursor-pointer ${
                      selectedRating >= star
                        ? "text-yellow-400"
                        : "text-gray-300"
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.18c.969 0 1.371 1.24.588 1.81l-3.387 2.46a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.538 1.118L10 14.347l-3.386 2.461c-.783.57-1.838-.196-1.539-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.611 9.394c-.783-.57-.38-1.81.588-1.81h4.18a1 1 0 00.95-.69l1.286-3.967z" />
                  </svg>
                ))}
              </div>

              <label className="block mb-2 text-sm md:text-base">Review:</label>
              <textarea
                name="review"
                rows="3"
                required
                className="border w-full p-2 mb-4 rounded text-sm md:text-base"
                value={review}
                onChange={(e) => setReview(e.target.value)}
              ></textarea>
              <button
                type="button"
                onClick={handleReviewSubmit}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm md:text-base w-full md:w-auto"
              >
                Submit Review
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default MovieDetail;
