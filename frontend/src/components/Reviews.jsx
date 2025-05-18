import axios from "../api";
import { useEffect, useState } from "react";
import Loading from "./Loading";
import ReviewCard from "./ReviewCard";

const Reviews = ({ movieId }) => {
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loadReviews = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`/revies/${movieId}`);
        setReviews(response.data.review);
        console.log(response.data.review);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    loadReviews();
  }, [movieId]);

  if (isLoading) return <Loading />;

  return (
    <>
      <div className="ml-18 mt-10 border-l-2 border-l-amber-50">
        <h2 className="text-3xl ml-3 font-bold mb-6 text-[#E2E0C8]">Reviews</h2>
      </div>

      {/* Gradient Mask Container */}
      <div className="relative mx-18">
        {/* Fading gradient - Left */}
        <div className="pointer-events-none absolute left-0 top-0 h-full w-16 bg-gradient-to-r from-[#0F0F0F] to-transparent z-10" />

        {/* Fading gradient - Right */}
        <div className="pointer-events-none absolute right-0 top-0 h-full w-16 bg-gradient-to-l from-[#0F0F0F] to-transparent z-10" />

        {/* Scrollable container */}
        <div className="overflow-x-auto whitespace-nowrap py-2 scrollbar">
          <div className="inline-flex space-x-4">
            {reviews.map((review, index) => (
              <ReviewCard
                key={index}
                username={review.userId.name}
                rating={review.rating}
                comment={review.comment}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Reviews;
