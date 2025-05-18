const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const registerRoute = require("./routes/register");
const loginRoute = require("./routes/login");
const { movieRoute } = require("./routes/movies");
const path = require("path");
const { getMovieDetails } = require("./controller/getMovie");
const createShowRoute = require("./routes/createShow");
const screenRoute = require("./routes/screenRoute");
const { verifyToken } = require("./middleware/verifyToken");
const { userVerify } = require("./controller/verifyToken")
const cookieParser = require("cookie-parser");
const reviewsRoutes = require("./routes/reviews");
const searchMovieRoute = require("./routes/searchMovie");
const logoutRoute = require("./routes/logout");
const createOrderRoute = require("./routes/createOrder");
const verifyPaymentRoute = require("./routes/verifyPayment");
const getBookingsRoute = require("./routes/getBookings");
const verifyEmailRouter = require("./routes/verifyEmail");

dotenv.config();
connectDB();

const allowedOrigins = [
  "http://localhost:5173",
  "http://10.221.191.123:5173",  // Add your current dev IP
  "https://your-vercel-frontend-url.vercel.app" // Add production frontend too if needed
];

const app = express();
app.use(
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
);

console.log("RAZORPAY_KEY_ID:", process.env.RAZORPAY_KEY_ID);

app.use(express.json());
app.use(cookieParser());

app.use("/register", registerRoute);
app.use("/login", loginRoute);
app.use("/logout", logoutRoute)
app.use("/movies/", movieRoute);
app.use("/movies/:id", getMovieDetails);

app.use('/movieImages', express.static(path.join(__dirname, 'movieImages')));

app.use("/admin/movies", movieRoute);
app.use("/showtimes", createShowRoute)
app.use("/showtimes", createShowRoute)
app.use("/showtimes/:showId", createShowRoute)
app.use("/screens", screenRoute)
app.use("/revies", reviewsRoutes)
app.use("/search", searchMovieRoute);
app.get("/verifyUser", userVerify)
app.use("/create-order", createOrderRoute);
app.use("/verify-payment", verifyPaymentRoute);
app.use("/getBookings", getBookingsRoute)
app.use("/verify-email", verifyEmailRouter)
// app.use("/ticket-conformation")


app.listen(5000, '0.0.0.0', () => console.log("Server running on port 5000"));
