import axios from "../api";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Loading from "./Loading";
import { useAuth } from "../context/AuthContext";
import loadRazorpay from "../../services/loadRazorpay";

const Booking = () => {
  const { user, loading } = useAuth();
  const [shows, setShows] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [bookedSeats, setBookedSeats] = useState([]);
  const [bookingDetails, setBookingDetails] = useState({
    showtime: "",
    seats: [],
  });
  const [title, setTitle] = useState(null);
  const [selectedShow, setSelectedShow] = useState(false);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const movie_id = queryParams.get("movie_id");

  const seatPrice = 200;
  console.log(user);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const total = calculateTotal();
    if (total <= 0 || !bookingDetails.showtime) {
      alert("Please select valid showtime and seats.");
      return;
    }
    setIsLoading(true);

    const res = await loadRazorpay();
    if (!res) {
      alert("Razorpay SDK failed to load.");
      return;
    }

    // Call backend to create Razorpay order
    const result = await axios.post("/create-order", {
      bookedSeats: bookedSeats,
      amount: total,
    });

    const { amount, id: order_id, currency } = result.data;
    console.log("Razorpay Key:", process.env.VITE_VERCEL_RAZORPAY_KEY_ID);
    const options = {
      key: process.env.VITE_VERCEL_RAZORPAY_KEY_ID,
      amount,
      currency,
      name: "CineSphere",
      description: `Payment for ${title}`,
      order_id,
      handler: async function (response) {
        const { razorpay_payment_id, razorpay_order_id, razorpay_signature } =
          response;

        await axios.post("/verify-payment", {
          razorpay_payment_id,
          razorpay_order_id,
          razorpay_signature,
          showtime_id: selectedShow._id,
          screen_id: selectedShow.screen_id, // or however you're storing it
          user_id: user.id,
          seats: bookingDetails.seats,
          total_amount: calculateTotal(),
        });

        alert("Payment successful and booking saved!");
      },
      prefill: {
        name: user.name,
        email: user.email,
      },
      theme: {
        color: "#0f172a", // dark theme
      },
    };
    setIsLoading(false);
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  const seatLayout = [
    ["A1", "A2", "A3", "A4", "A5", "A6", "A7", "A8", "A9", "A10", "A11", "A12"],
    ["B1", "B2", "B3", "B4", "B5", "B6", "B7", "B8", "B9", "B10", "B11", "B12"],
    ["C1", "C2", "C3", "C4", "C5", "C6", "C7", "C8", "C9", "C10", "C11", "C12"],
    ["D1", "D2", "D3", "D4", "D5", "D6", "D7", "D8", "D9", "D10", "D11", "D12"],
    ["E1", "E2", "E3", "E4", "E5", "E6", "E7", "E8", "E9", "E10", "E11", "E12"],
    ["F1", "F2", "F3", "F4", "F5", "F6", "F7", "F8", "F9", "F10", "F11", "F12"],
    ["G1", "G2", "G3", "G4", "G5", "G6", "G7", "G8", "G9", "G10", "G11", "G12"],
    ["H1", "H2", "H3", "H4", "H5", "H6", "H7", "H8", "H9", "H10", "H11", "H12"],
    ["I1", "I2", "I3", "I4", "I5", "I6", "I7", "I8", "I9", "I10", "I11", "I12"],
    ["J1", "J2", "J3", "J4", "J5", "J6", "J7", "J8", "J9", "J10", "J11", "J12"],
  ];

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          `/showtimes/${movie_id}`
        );
        const fetchedShows = response.data.data;
        setShows(fetchedShows);
        console.log(fetchedShows);
        setTitle(fetchedShows[0].movie_id.title);
      } catch (error) {
        console.error("Error fetching showtimes:", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, [movie_id]);

  const handleShowSelect = (show) => {
    console.log(show);
    setBookingDetails({ seats: [], showtime: show.start_time });
    setSelectedShow(show);
  };

  const handleSeatSelect = (seat) => {
    setBookingDetails((prev) => {
      const seatIndex = prev.seats.indexOf(seat);
      const newSeats = [...prev.seats];
      seatIndex === -1 ? newSeats.push(seat) : newSeats.splice(seatIndex, 1);
      return { ...prev, seats: newSeats };
    });
  };

  const calculateTotal = () => {
    return bookingDetails.seats.length * seatPrice;
  };

  const formatTime = (isoTime) => {
    return new Date(isoTime).toLocaleString("en-IN", {
      dateStyle: "short",
      timeStyle: "short",
      hour12: true,
    });
  };

  if (isLoading) {
    return <Loading />;
  } else {
  }

  return (
    <div className="w-full mx-auto p-5 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-amber-50 text-center mb-5">
        Book Tickets for {title}
      </h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-5">
          <label className="block text-amber-50 font-medium mb-2">
            Showtime:
          </label>
          <div className="flex flex-wrap gap-2">
            {shows.filter((show) => new Date(show.start_time) > new Date())
              .length === 0 ? (
              <p className="text-amber-700">
                No upcoming shows available for this movie.
              </p>
            ) : (
              shows
                .filter((show) => new Date(show.start_time) > new Date())
                .map((show) => (
                  <button
                    key={show._id}
                    type="button"
                    className={`px-4 py-2 rounded-md transition-colors ${
                      selectedShow
                        ? selectedShow.start_time === show.start_time
                          ? "bg-green-600 text-white"
                          : "bg-gray-200 hover:bg-gray-600"
                        : "bg-gray-200 hover:bg-gray-600"
                    }`}
                    onClick={() => handleShowSelect(show)}
                  >
                    {formatTime(show.start_time)}
                  </button>
                ))
            )}
          </div>
        </div>

        <div className="mb-5">
          <label className="block text-amber-50 font-medium mb-2">
            Select Seats:
          </label>
          <div className="text-center w-[50vw] ml-auto mr-auto py-2 px-4 border-t-8 border-gray-800 rounded-t-[50%] text-white mb-5">
            Screen
          </div>
          <div className="space-y-3">
            {seatLayout.map((row, rowIndex) => (
              <div key={rowIndex} className="flex justify-center gap-2">
                {row.map((seat, index) => (
                  <button
                    key={seat}
                    type="button"
                    disabled={
                      selectedShow
                        ? selectedShow.bookedSeats.includes(seat)
                        : true
                    }
                    className={`w-10 h-10 flex items-center justify-center rounded-md transition-colors
                      ${
                        bookingDetails.seats.includes(seat)
                          ? "bg-green-600 text-white"
                          : (
                              selectedShow
                                ? selectedShow.bookedSeats.includes(seat)
                                : false
                            )
                          ? "bg-red-600 text-white cursor-not-allowed"
                          : "bg-gray-200 hover:bg-gray-600"
                      }
                      ${
                        (index + 1) % 6 === 0 && index !== row.length - 1
                          ? "mr-10"
                          : "mr-1"
                      }`}
                    onClick={() =>
                      !bookedSeats.includes(seat) && handleSeatSelect(seat)
                    }
                  >
                    {seat}
                  </button>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="text-right mb-5">
          <h3 className="text-xl font-semibold text-white">
            Total: &#8377;{calculateTotal().toFixed(2)}
          </h3>
        </div>

        <div className=" flex justify-center">
          <button
            type="submit"
            className="w-[50vw] py-3 px-4 cursor-pointer bg-green-600 hover:bg-green-700 text-white font-medium rounded-md transition-colors"
          >
            Book Now
          </button>
        </div>
      </form>
    </div>
  );
};

export default Booking;
