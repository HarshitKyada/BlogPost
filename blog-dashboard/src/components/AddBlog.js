"use client";

import React, { useState } from "react";
import axios from "../axios";

const CreateBlogPost = () => {
  const [title, setTitle] = useState("");
  const [featuredImage, setFeaturedImage] = useState(null);
  const [blogId, setBlogId] = useState(null);
  const [contentBlocks, setContentBlocks] = useState([
    { type: "heading", content: "" },
  ]);

  const handleContentChange = (index, key, value) => {
    const newContentBlocks = [...contentBlocks];
    newContentBlocks[index][key] = value;
    setContentBlocks(newContentBlocks);
  };

  const handleAddBlock = () => {
    setContentBlocks([...contentBlocks, { type: "heading", content: "" }]);
  };

  const handleFileChange = (e, index) => {
    const file = e.target.files[0];
    if (file) {
      const newContentBlocks = [...contentBlocks];
      newContentBlocks[index].image = file; // Store image file in block
      setContentBlocks(newContentBlocks);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Ensure all content blocks have content
    const sanitizedContentBlocks = contentBlocks.map((block) => ({
      ...block,
      content: block.content || "", // Default to an empty string if content is missing
    }));

    const formData = new FormData();
    formData.append("title", title);
    formData.append("featuredImage", featuredImage);
    formData.append("contentBlocks", JSON.stringify(sanitizedContentBlocks));

    // Attach image files from contentBlocks
    contentBlocks.forEach((block) => {
      if (block.type === "image" && block.image) {
        formData.append("contentImages", block.image);
      }
    });

    try {
      const response = await axios.post("/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setBlogId(response?.data?.data?._id);
      alert(`Blog post created successfully`);
    } catch (error) {
      console.log("Error creating blog post:", error.response?.data || error);
    }
  };

  const handlePreview = () => {
    window.open(`/blogPreview/${blogId}`, "_blank");
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col items-center p-6">
      <h1 className="text-4xl font-semibold mb-8">Create a New Blog Post</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-3xl"
      >
        <div className="mb-4">
          <label className="block text-lg font-medium mb-2">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full p-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-lg font-medium mb-2">
            Featured Image
          </label>
          <input
            type="file"
            onChange={(e) => setFeaturedImage(e.target.files[0])}
            required
            className="w-full p-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {contentBlocks.map((block, index) => (
          <div key={index} className="mb-6">
            <label className="block text-lg font-medium mb-2">Block Type</label>
            <select
              value={block.type}
              onChange={(e) =>
                handleContentChange(index, "type", e.target.value)
              }
              className="w-full p-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="heading">Heading</option>
              <option value="paragraph">Paragraph</option>
              <option value="image">Image</option>
              <option value="affiliate-link">Affiliate Link</option>
            </select>

            <div className="mt-4">
              <label className="block text-lg font-medium mb-2">Content</label>
              <input
                type="text"
                value={block.content}
                onChange={(e) =>
                  handleContentChange(index, "content", e.target.value)
                }
                className="w-full p-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {block.type === "image" && (
              <div className="mt-4">
                <label className="block text-lg font-medium mb-2">
                  Upload Image
                </label>
                <input
                  type="file"
                  onChange={(e) => handleFileChange(e, index)}
                  className="w-full p-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            )}

            {block.type === "affiliate-link" && (
              <div className="mt-4">
                <label className="block text-lg font-medium mb-2">
                  Link URL
                </label>
                <input
                  type="text"
                  value={block.link || ""}
                  onChange={(e) =>
                    handleContentChange(index, "link", e.target.value)
                  }
                  className="w-full p-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            )}
          </div>
        ))}

        <button
          type="button"
          onClick={handleAddBlock}
          className="w-full p-3 bg-blue-600 text-white rounded-lg mt-4 mb-6 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Add Content Block
        </button>

        <button
          type="submit"
          className="w-full p-3 bg-green-600 text-white rounded-lg hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          Submit
        </button>
      </form>
      {blogId && (
        <button
          onClick={handlePreview}
          className="w-full p-3 bg-green-600 text-white rounded-lg hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          Show preview of blog
        </button>
      )}
    </div>
  );
};

export default CreateBlogPost;
