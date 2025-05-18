// Loading.jsx
import React from "react";

const Loading = () => {
  return (
    <div className="flex w-screen items-center justify-center h-screen bg-gray-700">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-50 border-solid"></div>
    </div>
  );
};

export default Loading;
