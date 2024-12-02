"use client";

import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import axios from "../../axios";

const BlogCard = () => {
  const params = useParams();
  const [allData, setAllData] = useState([]);

  useEffect(() => {
    const blogId = params?.id;

    const fetchData = async () => {
      try {
        const response = await axios.get(`/getblog/${blogId}`);
        const data = response.data?.data;

        setAllData(data);
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const createdAt = allData?.createdAt;
  const formattedDate = createdAt
    ? new Date(createdAt).toLocaleDateString("en-US", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }) +
      " " +
      new Date(createdAt).toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      })
    : "N/A";

  return (
    <div>
      <div className="min-h-screen bg-gray-900 text-gray-100">
        <div className="max-w-4xl mx-auto p-6">
          <div>
            <h1 className="text-4xl font-bold mb-4">{allData?.title}</h1>
            <div className="w-full h-auto mb-1">
              <img
                src={`data:image/jpeg;base64,${allData?.featuredImageBinary}`}
                alt="featuredImage"
                className="rounded-lg object-cover object-center w-full max-h-96"
              />
            </div>
          </div>
          <div className="mb-6">
            <div className="text-gray-300 text-sm">
              Created at: {formattedDate}
            </div>
          </div>
          <div>
            {allData?.contentBlocks?.length > 0 &&
              allData?.contentBlocks?.map((item, index) => {
                switch (item?.type) {
                  case "heading":
                    return (
                      <div key={index}>
                        <h2 className="text-2xl font-semibold mb-2">
                          {item?.content}
                        </h2>
                      </div>
                    );
                  case "paragraph":
                    return (
                      <div key={index}>
                        <p className="text-lg leading-relaxed mb-4">
                          {item?.content}
                        </p>
                      </div>
                    );
                  case "image":
                    return (
                      <div key={index} className="mb-6">
                        <h4 className="font-semibold mb-2">{item?.content}</h4>
                        <img
                          src={`data:image/jpeg;base64,${item?.binaryData}`}
                          alt="featuredImage"
                          className="rounded-lg object-cover object-center w-full max-h-96"
                        />
                      </div>
                    );
                  case "affiliate-link":
                    return (
                      <div key={index} className="mb-4">
                        <a
                          href={item?.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500 hover:underline"
                        >
                          {item?.content}
                        </a>
                      </div>
                    );
                  default:
                    return (
                      <p key={index} className="text-gray-500 italic mb-4">
                        Unknown item type
                      </p>
                    );
                }
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
