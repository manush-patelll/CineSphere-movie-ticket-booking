import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import jsPDF from "jspdf";
import Loading from "./Loading";
import axios from "../api";
import QRCode from "qrcode";

const UserProfile = () => {
  const navigate = useNavigate();
  const { logout, user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = () => {
    localStorage.setItem("isLogedin", false);
    localStorage.setItem("isAdmin", false);
    logout();
    navigate("/");
    alert("Logout successfully");
  };

  useEffect(() => {
    setIsLoading(true);
    const fetchBookings = async () => {
      try {
        const bookingdata = await axios.get("/getBookings", {
          withCredentials: true,
        });
        console.log(bookingdata.data);
        setBookings(bookingdata.data.bookingDetails);
        console.log(bookings);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const downloadPDF = async (booking) => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Booking Details", 20, 20);
    doc.setFontSize(12);
    doc.text(`Movie: ${booking.showtime_id.movie_id.title}`, 20, 40);
    doc.text(`Showtime: ${formatTime(booking.showtime_id.start_time)}`, 20, 50);
    doc.text(`Screen: ${booking.screen_id.screenName}`, 20, 60);
    doc.text(`Seats: ${booking.seats.join(", ")}`, 20, 70);
    doc.text(`Total Amount: ${booking.total_amount} RS.`, 20, 80);
    doc.text(`Booking Id: ${booking.booking_reference}`, 20, 90);

    const qrObject = {
      movie: booking.showtime_id.movie_id.title,
      showtime: formatTime(booking.showtime_id.start_time),
      screen: booking.screen_id.screenName,
      seats: booking.seats,
      amount: booking.total_amount,
      bookingId: booking.booking_reference,
    };

    try {
      // 2️⃣ Convert object to JSON string
      const qrString = JSON.stringify(qrObject);

      // 3️⃣ Generate QR code
      const qrImageDataUrl = await QRCode.toDataURL(qrString);

      // 4️⃣ Add QR code to PDF
      doc.addImage(qrImageDataUrl, "PNG", 140, 20, 50, 50);
    } catch (err) {
      console.error("QR code generation error:", err);
    }

    const movieTitle = booking?.showtime_id?.movie_id?.title || "Movie";
    doc.save(`Booking_${movieTitle.replace(/\s+/g, "_")}.pdf`);
  };

  const formatTime = (isoTime) => {
    return new Date(isoTime).toLocaleString("en-IN", {
      dateStyle: "short",
      timeStyle: "short",
      hour12: true,
    });
  };

  if (isLoading) return <Loading />;

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="flex justify-between items-start gap-10 flex-col md:flex-row">
        {/* Booking List - Left Side */}
        <div className="w-full md:w-3/4">
          <h2 className="text-2xl font-semibold mb-6">Your Bookings</h2>
          {bookings.length === 0 ? (
            <p className="text-gray-400">No bookings found.</p>
          ) : (
            <div className="space-y-6">
              {bookings.map((booking, key) => (
                <div
                  key={booking._id}
                  className="bg-gray-800 p-6 rounded-lg shadow-md border border-gray-700"
                >
                  <p>
                    <span className="font-semibold">🎬 Movie:</span>{" "}
                    {booking.showtime_id.movie_id.title}
                  </p>
                  <p>
                    <span className="font-semibold">🕒 Showtime:</span>{" "}
                    {formatTime(booking.showtime_id.start_time)}
                  </p>
                  <p>
                    <span className="font-semibold">🖥️ Screen:</span>{" "}
                    {booking.screen_id.screenName}
                  </p>
                  <p>
                    <span className="font-semibold">🎟️ Seats:</span>{" "}
                    {booking.seats.join(", ")}
                  </p>
                  <p>
                    <span className="font-semibold">💰 Total Amount:</span> ₹
                    {booking.total_amount}
                  </p>
                  <button
                    onClick={() => downloadPDF(booking)}
                    className="mt-4 bg-yellow-500 hover:bg-yellow-400 text-black px-4 py-2 rounded-md"
                  >
                    Download PDF
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* User Info - Right Top Corner */}
        <div className="w-full md:w-1/4 md:sticky md:top-6 self-start bg-gray-800 rounded-xl p-6 shadow-lg text-center">
          <h1 className="text-xl font-bold">{user?.name || "User Name"}</h1>
          <p className="text-gray-400 text-sm mt-1">
            {user?.email || "user@example.com"}
          </p>

          <button
            onClick={handleLogout}
            className="mt-6 w-full bg-red-600 hover:bg-red-500 transition px-4 py-2 rounded-lg"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
