import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header.jsx";
import Hero from "./components/Hero.jsx";
import MoviesShowcase from "./components/MovieShowcase.jsx";
import Signup from "./components/Signup.jsx";
import Login from "./components/Login.jsx";
import Movies from "./components/Movies.jsx";
import Footer from "./components/Footer.jsx";
import MovieDetail from "./components/MovieDetail.jsx";
import Booking from "./components/Booking.jsx";
import AdminPanel from "./Admin/AdminPanel.jsx";
import UserProfile from "./components/UserProfile.jsx";
import Contact from "./components/Contact.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import AuthRedirect from "./context/AuthRedirect.jsx";
import Offers from "./components/Offers.jsx";

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Header />
        <Routes>
          {/* ✅ Public Routes */}
          <Route
            path="/"
            element={
              <>
                <Hero />
                <MoviesShowcase />
              </>
            }
          />
          <Route path="/movies" element={<Movies type="movies" />} />
          <Route path="/contact" element={<Contact type="contact" />} />
          <Route
            path="/movieDetails/:movieId"
            element={<MovieDetail type="movieDetails" />}
          />
          <Route path="/offers" element={<Offers type="offer" />} />

          {/* ✅ Auth Redirect Routes */}
          <Route element={<AuthRedirect />}>
            <Route path="/login" element={<Login type="login" />} />
            <Route path="/register" element={<Signup type="register" />} />
          </Route>

          {/* ✅ Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/booking" element={<Booking />} />
            <Route path="/admin" element={<AdminPanel />} />
            <Route path="/userprofile" element={<UserProfile />} />
          </Route>
        </Routes>
        <Footer />
      </AuthProvider>
    </Router>
  );
};

export default App;
