import React from "react";
import { useNavigate } from "react-router-dom";

const MovieCard = (props) => {
  const navigate = useNavigate();
  console.log(props.genres);
  console.log(props.image);
  const imagePath = "https://github.com/manush-patelll/CineSphere-movie-ticket-booking/movieImages/" + props.image;
  console.log(imagePath);
  const handleMovieDetail = () => {
    navigate(`/movieDetails/${props.id}`);
  };

  return (
    <div
      onClick={handleMovieDetail}
      className="h-auto lg:max-w-[300px] bg-[#5a6155]/50 cursor-pointer p-3 rounded-lg shadow-md transform transition duration-300 hover:scale-105 flex flex-row md:flex md:flex-col md:items-center md:justify-center"
    >
      <div>
        <img
          src={imagePath}
          alt={props.title}
          className="h-60 w-40 mr-3 rounded-2xl"
        />
      </div>
      <div className="my-auto mx-auto md:mt-3">
        <h3 className="text-xl text-[#E0E0E0] font-semibold mb-2 relative group">
          {props.title.toUpperCase()}
          <span className="absolute left-0 bottom-0 w-0 h-1 bg-[#5C7285] transition-all duration-300 group-hover:w-full"></span>
        </h3>
        <p className="text-amber-100 text-xl mb-1">⭐ {props.rating}/5</p>
        <p className="font-light mb-3 text-red-100">
          {props.genres.join(" | ")}
        </p>
      </div>
    </div>
  );
};

export default MovieCard;
