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
        setPoster(`https://github.com/manush-patelll/CineSphere-movie-ticket-booking/movieImages/${movieData.fileName}`);
        setBgPoster(
          `https://github.com/manush-patelll/CineSphere-movie-ticket-booking/movieImages/${movieData.bgPosterName}`
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
      <section
        className="h-[60vh] mt-7 bg-cover bg-center z-0 relative"
        style={{ backgroundImage: `url(${bgPoster})` }}
      >
        <div className=" h-[60vh] bg-gradient-to-r from-[#000000]/90 via-[#1A1A1A]/90 to-[#ffffff]/30 custom-gradient z-10"></div>
        <div className="absolute top-4 left-4 flex">
          <div className="ml-[5vw]">
            <img
              src={moviePoster}
              alt=""
              className="h-100  rounded-2xl hover:scale-105 transition duration-200"
            />
          </div>
          <div className="ml-[3vw]">
            <h1 className="text-4xl text-yellow-100 mt-10 mb-5">
              {movie.title}
            </h1>
            <div className="bg-amber-50/30 cursor-pointer p-1 mb-5 w-15 text-center rounded-2xl">
              Hindi
            </div>

            <div
              onClick={() => setShowReviewModal(true)}
              className="text-amber-50 mb-5 min-w-30 sm:flex bg-[#8999a8]/30 h-20 sm:h-auto w-[22vw] max-w-70 rounded-xl cursor-pointer hover:scale-105 transition duration-100"
            >
              <div className="mt-3 sm:my-auto ml-1">⭐{movie.rating}/5</div>
              <div className="mx-auto mt-3 mb-3 sm:mr-3 sm:ml-auto rounded-xl text-center content-center bg-[#5C7285] h-8 w-24">
                Rate Now
              </div>
            </div>
            <div className="text-amber-50 mb-10">
              {movie.duration}m -- {movie.generes.join(" | ")} --{" "}
              {formatTime(movie.releaseDate)}
            </div>
            <button
              onClick={handleSubmit}
              className="w-25 h-8 text-amber-50 rounded-xl bg-[#5C7285] cursor-pointer hover:scale-105 transition duration-100"
            >
              Book Now
            </button>
          </div>
        </div>
      </section>

      <div className="mt-10">
        <div className="ml-18 border-l-2 border-l-amber-50  ">
          <h2 className="text-3xl ml-3 font-bold mb-10 text-[#E2E0C8]">
            About Movie
          </h2>
        </div>
        <p className="text-amber-50 ml-18 mr-10">{movie.discription}</p>

        <div className="ml-18 mt-10 border-l-2 border-l-amber-50  ">
          <h2 className="text-3xl ml-3 font-bold mb-10 text-[#E2E0C8]">
            Casts
          </h2>
        </div>
        <p className="text-amber-50 ml-18 mr-10">{movie.cast.join(" | ")}</p>
      </div>
      <Reviews movieId={movieId} />

      {showReviewModal && (
        <div className="fixed inset-0 bg-amber-100/20 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-xl w-[90vw] max-w-md text-black relative">
            <button
              onClick={() => setShowReviewModal(false)}
              className="absolute top-2 right-3 text-lg font-bold cursor-pointer"
            >
              ✕
            </button>
            <h3 className="text-xl font-bold mb-4">
              Rate and Review for {movie.title}
            </h3>
            <form>
              <label className="block mb-2">Rating:</label>
              <div className="flex space-x-1 mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg
                    key={star}
                    onClick={() => setSelectedRating(star)}
                    className={`w-8 h-8 cursor-pointer ${
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

              <label className="block mb-2">Review:</label>
              <textarea
                name="review"
                rows="3"
                required
                className="border w-full p-2 mb-4 rounded"
                value={review}
                onChange={(e) => setReview(e.target.value)}
              ></textarea>
              <button
                type="submit"
                onClick={() => handleReviewSubmit()}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
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
