"use client";

import React, { useEffect, useState } from "react";
import axios from "../axios";
import Image from "next/image";

const BlogPostDetail = ({ id }) => {
  const [blogPost, setBlogPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch blog post data by ID
  useEffect(() => {
    const fetchBlogPost = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/getblog/${id}`);
        const data = response.data?.data;
        setBlogPost(data);
      } catch (err) {
        setError(err.message || "Error fetching blog post");
      } finally {
        setLoading(false);
      }
    };

    fetchBlogPost();
  }, [id]);

  if (loading) return <p className="text-center text-white">Loading...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;
  if (!blogPost)
    return <p className="text-center text-gray-400">No data found.</p>;

  const { title, featuredImageBinary, contentBlocks } = blogPost;

  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col items-center p-6">
      <h1 className="text-4xl font-semibold mb-6">{title}</h1>

      {/* Render the featured image */}
      {featuredImageBinary && (
        <Image
          src={`data:image/jpeg;base64,${featuredImageBinary}`}
          alt="Featured"
          width={800}
          height={400}
          className="rounded-md mb-6"
        />
      )}

      {/* Render content blocks */}
      <div className="w-full max-w-3xl space-y-8">
        {contentBlocks?.map((block) => {
          switch (block.type) {
            case "heading":
              return (
                <h2 key={block._id} className="text-2xl font-semibold">
                  {block.content}
                </h2>
              );
            case "paragraph":
              return (
                <p key={block._id} className="text-lg leading-relaxed">
                  {block.content}
                </p>
              );
            case "image":
              return (
                <Image
                  key={block._id}
                  src={`data:image/jpeg;base64,${block.binaryData}`}
                  alt="Content Image"
                  width={800}
                  height={400}
                  className="rounded-md"
                />
              );
            case "affiliate-link":
              return (
                <a
                  key={block._id}
                  href={block.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:underline"
                >
                  {block.content}
                </a>
              );
            default:
              return (
                <p key={block._id} className="text-gray-400 italic">
                  Unknown block type
                </p>
              );
          }
        })}
      </div>
    </div>
  );
};

export default BlogPostDetail;
