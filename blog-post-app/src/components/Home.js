"use client";

import React, { useEffect, useState } from "react";
import HomeCard from "./UI/HomeCard";
import axios from "../axios";
import HomeCardSkeleton from "./skeleton/HomeCardSkeleton";

const Home = () => {
  const [blogPost, setBlogPost] = useState([]);
  const [loading, setLoading] = useState(true); // Add a loading state

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const response = await axios.get("/getblog");
        const data = response.data?.data;

        setBlogPost(data);
      } catch (error) {
        // Handle the error appropriately
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false); // Set loading to false after data is fetched
      }
    };

    fetchAllData();
  }, []);

  if (loading) {
    return (
      <div>
        {Array.from({ length: 5 }).map(
          (
            _,
            index // Show multiple skeletons while loading
          ) => (
            <HomeCardSkeleton key={index} />
          )
        )}
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-wrap gap-5 items-center justify-center p-[2%]">
        {blogPost.length > 0 ? (
          blogPost.map((value, index) => <HomeCard key={index} data={value} />)
        ) : (
          <div>No blog posts available.</div>
        )}
      </div>
    </>
  );
};

export default Home;
