"use client";

import { useRouter } from "next/navigation";
import React from "react";

const ReadMoreButton = ({ data }) => {
    const router = useRouter();
    const handleReadMore = (id) => {
        router.push(`/blog/${id}`);
    }
  return (
    <div>
      <button
        className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white 
    rounded-lg  focus:ring-4 focus:outline-none
     bg-blue-600 hover:bg-blue-700 focus:ring-blue-800"
        onClick={() => handleReadMore(data?._id)}
      >
        Read more
        <svg
          className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 14 10"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M1 5h12m0 0L9 1m4 4L9 9"
          />
        </svg>
      </button>
    </div>
  );
};

export default ReadMoreButton;
