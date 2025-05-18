import React from "react";
import MoviesShowcase from "./MovieShowcase";
import { useParams } from "react-router-dom";

const Movies = () => {
  let { movieId } = useParams();
  return (
    <>
      <div className="">
        <MoviesShowcase />
      </div>
    </>
  );
};

export default Movies;
