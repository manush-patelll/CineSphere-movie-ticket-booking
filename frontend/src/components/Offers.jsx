import React from "react";
import { Gift, BadgePercent, CreditCard } from "lucide-react";

const offers = [
  {
    id: 1,
    title: "Get 20% Off on First Booking!",
    description:
      "Use code FIRST20 and get 20% off on your first movie ticket booking.",
    code: "FIRST20",
    icon: <Gift className="h-6 w-6 text-pink-500" />,
  },
  {
    id: 2,
    title: "Flat ₹100 Cashback with HDFC Debit Card",
    description:
      "Pay with HDFC Debit Card and get instant ₹100 cashback. Min booking: ₹800.",
    code: "HDFC100",
    icon: <CreditCard className="h-6 w-6 text-green-500" />,
  },
  {
    id: 3,
    title: "Buy 1 Get 1 Free - ICICI Credit Cards",
    description:
      "Every Friday, get 1 ticket free when you buy 1 using ICICI Credit Card.",
    code: "ICICIBOGO",
    icon: <CreditCard className="h-6 w-6 text-blue-500" />,
  },
];

const Offers = () => {
  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <h2 className="text-4xl font-bold text-center mb-8 text-emerald-100">
        🎁 Exclusive Movie Offers
      </h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {offers.map((offer) => (
          <div
            key={offer.id}
            className="bg-white border border-gray-100 rounded-2xl shadow-md p-6 hover:shadow-lg transition duration-300"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-gray-100 rounded-full">{offer.icon}</div>
              <h3 className="text-xl font-semibold text-gray-800">
                {offer.title}
              </h3>
            </div>
            <p className="text-gray-600 text-sm mb-4">{offer.description}</p>
            <span className="inline-block bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow">
              Code: {offer.code}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Offers;
