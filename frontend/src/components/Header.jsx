import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const [menuTogle, setMenuTogle] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [showNavbar, setShowNavbar] = useState(true);
  const [navbarStyle, setNavbarStyle] = useState("translate-y-0");

  const handleMenuClick = () => {
    setMenuTogle(!menuTogle);

    console.log(menuTogle);
  };

  const handleLogin = () => {
    navigate("/login");
    setMenuTogle(false);
  };
  const handleUserFrofile = () => {
    navigate("/userprofile");
  };

  useEffect(() => {
    const controlNavbar = () => {
      if (typeof window !== "undefined") {
        const currentScrollY = window.scrollY;

        if (currentScrollY > lastScrollY) {
          // Scrolling down
          setNavbarStyle("-translate-y-full");
        } else {
          // Scrolling up
          setNavbarStyle("translate-y-0");
        }

        // For mobile menu - close when scrolling
        if (menuTogle && currentScrollY > 100) {
          setMenuTogle(false);
        }

        setLastScrollY(currentScrollY);
      }
    };

    window.addEventListener("scroll", controlNavbar);

    return () => {
      window.removeEventListener("scroll", controlNavbar);
    };
  }, [lastScrollY, menuTogle]);

  return (
    <nav
      className={`flex top-0 z-50 sticky justify-between items-center p-5 bg-[#818C78] text-black ${navbarStyle}`}
    >
      <div>
        <h1 className="logo text-cyan-950 text-2xl font-extrabold">
          CineSphere
        </h1>
      </div>
      <nav>
        <ul className="md:flex hidden">
          <li>
            <a
              href="/"
              className="mx-[10px] cursor-pointer hover:text-yellow-500 transition duration-300"
            >
              Home
            </a>
          </li>
          <li>
            <a
              href="/movies"
              className="mx-[10px] cursor-pointer hover:text-yellow-500 transition duration-300"
            >
              Movies
            </a>
          </li>

          <li>
            <a
              href="/offers"
              className="mx-[10px] cursor-pointer hover:text-yellow-500 transition duration-300"
            >
              Offers
            </a>
          </li>
          <li>
            <a
              href="/contact"
              className="mx-[10px] cursor-pointer hover:text-yellow-500 transition duration-300"
            >
              Contact
            </a>
          </li>
          {(localStorage.getItem("isAdmin") == "true") &
          (localStorage.getItem("isLogedin") == "true") ? (
            <li>
              <a
                href="/Admin"
                className="mx-[10px] cursor-pointer hover:text-yellow-500 transition duration-300"
              >
                Admin
              </a>
            </li>
          ) : (
            <></>
          )}
        </ul>
      </nav>
      {localStorage.getItem("isLogedin") == "true" ? (
        <button
          onClick={handleUserFrofile}
          className="hidden md:block bg-[#5C7285] text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition duration-300 cursor-pointer"
        >
          Profile
        </button>
      ) : (
        <div>
          <button
            onClick={handleLogin}
            className="hidden md:block bg-[#5C7285] text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition duration-300 cursor-pointer"
          >
            Login
          </button>
        </div>
      )}

      <img
        onClick={handleMenuClick}
        className="transform transition duration-300 hover:scale-120 sm:block md:hidden h-5 cursor-pointer mix-blend-color-dodge z-10"
        src="data:image/jpeg;base64,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"
        alt=""
      />

      <div className="sm:block md:hidden bg-[#232521] h-auto w-40 rounded-lg absolute right-1 top-19 z-10 ">
        <ul
          className={menuTogle ? "block px-1 text-center my-3 py-2" : "hidden"}
        >
          <li className="text-white py-2 border-b-white border-b-1 hover:scale-105 transition duration-100 ">
            <a href="/" className="flex">
              <div className=" w-[5rem]">Home</div>
              <img
                className="rounded-full h-6 ml-6 mix-blend-color-burn"
                src="./src/images/arow-icon.png"
                alt=""
              />
            </a>
          </li>
          <li className="text-white py-2 border-b-white border-b-1 hover:scale-105 transition duration-100 ">
            <a href="/Movies" className="flex">
              <div className=" w-[5rem]">Movies</div>
              <img
                className="rounded-full h-6 ml-6 mix-blend-color-burn"
                src="./src/images/arow-icon.png"
                alt=""
              />
            </a>
          </li>
          <li className="text-white py-2 border-b-white border-b-1 hover:scale-105 transition duration-100 ">
            <a href="/" className="flex">
              <div className=" w-[5rem]">Offer</div>
              <img
                className="rounded-full h-6 ml-6 mix-blend-color-burn"
                src="./src/images/arow-icon.png"
                alt=""
              />
            </a>
          </li>
          <li className="text-white py-2 border-b-white border-b-1 hover:scale-105 transition duration-100 ">
            <a href="/contact" className="flex">
              <div className=" w-[5rem]">Contact</div>
              <img
                className="rounded-full h-6 ml-6 mix-blend-color-burn"
                src="./src/images/arow-icon.png"
                alt=""
              />
            </a>
          </li>
          <li className="text-white py-2 border-b-white border-b-1 hover:scale-105 transition duration-100 ">
            <a href="/Admin" className="flex">
              <div className=" w-[5rem]">Admin</div>
              <img
                className="rounded-full h-6 ml-6 mix-blend-color-burn"
                src="./src/images/arow-icon.png"
                alt=""
              />
            </a>
          </li>
        </ul>

        {localStorage.getItem("isLogedin") == "true" ? (
          <button
            onClick={handleUserFrofile}
            className={
              menuTogle
                ? "md:block bg-[#5C7285] text-white px-4 py-2 rounded-lg hover:bg-yellow-600 ml-11 mb-1 transition duration-300 cursor-pointer"
                : "hidden"
            }
          >
            Profile
          </button>
        ) : (
          <button
            className={
              menuTogle
                ? "block text-center mx-auto my-4 h-8 px-2 bg-[#5C7285] rounded-lg hover:scale-105 cursor-pointer transition duration-100"
                : "hidden"
            }
            onClick={handleLogin}
          >
            Login/Register
          </button>
        )}
      </div>
    </nav>
  );
};

export default Header;
