import React from "react";

const HomeCardSkeleton = () => {
  return (
    <div className="max-w-sm rounded-lg shadow bg-gray-800 border-gray-700 animate-pulse">
      <div className="flex justify-center items-center w-full h-72 bg-gray-300 rounded-t-lg"></div>

      <div className="p-5">
        <div className="h-7 rounded-full bg-gray-700 w-[70%] mb-2"></div>
        <div className="h-7 rounded-full bg-gray-700 w-[70%] mb-4"></div>

        <div className="h-3 rounded-full bg-gray-700 mb-3"></div>
        <div className="h-3 rounded-full bg-gray-700 mb-3"></div>
        <div className="h-3 rounded-full bg-gray-700 mb-4"></div>

        <div className="inline-flex items-center text-sm font-medium text-center text-white bg-gray-400 rounded-lg w-28 h-9"></div>
      </div>
    </div>
  );
};

export default HomeCardSkeleton;
