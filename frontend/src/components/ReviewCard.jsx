const ReviewCard = ({ username, rating, comment }) => {
  return (
    <div className="min-w-[300px] max-w-sm border-l-4 border-yellow-500 bg-white/10 shadow-sm p-5 rounded-md">
      <div className="mb-3">
        <h1 className="text-xl font-bold text-amber-50">
          {username.toUpperCase()}
        </h1>
      </div>

      <div className="mb-4 ">
        <p className="text-gray-300 leading-relaxed text-wrap">"{comment}"</p>
      </div>
      <div className="text-sm text-gray-400 font-semibold">
        Rating: <span className="text-yellow-500">{rating} / 5</span>
      </div>
    </div>
  );
};

export default ReviewCard;
