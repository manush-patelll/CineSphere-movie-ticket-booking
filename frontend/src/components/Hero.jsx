import React from "react";
import bgImage from "../images/bg_image.jpg";

const Hero = () => {
  return (
    <section
      className="hero bg-cover bg-center h-96 sm:h-90 flex items-center justify-center text-white text-center relative"
      style={{
        backgroundImage: `url(${bgImage})`,
      }}
    >
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30"></div>

      <div className="hero-content relative z-5 px-4 max-w-[90%] sm:max-w-[700px]">
        <h2 className="text-lg sm:text-2xl md:text-3xl w-auto flex-wrap mb-4 text-aliceblue font-bold">
          Book Your Favorite Movie Tickets Instantly!
        </h2>
      </div>
    </section>
  );
};

export default Hero;
