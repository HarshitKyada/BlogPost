"use client";

import React, { useState } from "react";
import axios from "axios";

const CreatePost = () => {
  const [formData, setFormData] = useState({
    mainTitle: "",
    mainImage: null,
    title: "",
    content: [],
  });
  const [currentBlock, setCurrentBlock] = useState({
    type: "paragraph",
    value: "",
  });
  const [preview, setPreview] = useState(false);

  const handleBlockChange = (e) => {
    setCurrentBlock({ ...currentBlock, value: e.target.value });
  };

  const addBlock = () => {
    if (
      (currentBlock.type === "image" && currentBlock.value instanceof File) || // Check if the block is an image and has a valid File object
      (currentBlock.type !== "image" && currentBlock.value.trim()) // For text-based blocks, ensure value is not empty
    ) {
      setFormData((prev) => ({
        ...prev,
        content: [...prev.content, currentBlock],
      }));
      setCurrentBlock({ type: "paragraph", value: "" }); // Reset block to default
    } else {
      alert("Please provide valid content for the block.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const postData = {
        ...formData,
        mainImage: formData.mainImage ? formData.mainImage : null,
      };
      console.log("postData", postData);
      //   await axios.post("http://localhost:5000/api/posts", postData);
      alert("Post submitted successfully!");
    } catch (err) {
      console.error("Failed to submit post:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 flex flex-col items-center py-6">
      <div className="w-full max-w-4xl bg-gray-800 p-6 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-6 text-center">
          Create New Blog Post
        </h1>
        <form onSubmit={handleSubmit}>
          {/* Main Title */}
          <div className="mb-4">
            <label htmlFor="mainTitle" className="block text-sm font-medium">
              Main Title* (Set Once)
            </label>
            <input
              type="text"
              id="mainTitle"
              name="mainTitle"
              value={formData.mainTitle}
              onChange={(e) =>
                setFormData({ ...formData, mainTitle: e.target.value })
              }
              placeholder="Enter the main title"
              className="mt-1 block w-full px-4 py-2 border border-gray-700 rounded-md bg-gray-700 text-gray-200 shadow-sm focus:ring-blue-500 focus:border-blue-500"
              disabled={!!formData.mainTitle}
            />
          </div>

          {/* Main Image */}
          <div className="mb-4">
            <label className="block text-sm font-medium">
              Main Image* (Set Once)
            </label>
            <input
              type="file"
              onChange={(e) =>
                setFormData({ ...formData, mainImage: e.target.files[0] })
              }
              className="block w-full text-sm text-gray-400
                         file:mr-4 file:py-2 file:px-4
                         file:rounded-md file:border-0
                         file:bg-blue-50 file:text-blue-700
                         hover:file:bg-blue-100"
              disabled={!!formData.mainImage}
            />
          </div>

          {/* Title */}
          <div className="mb-4">
            <label htmlFor="title" className="block text-sm font-medium">
              Title*
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              placeholder="Enter your title"
              className="mt-1 block w-full px-4 py-2 border border-gray-700 rounded-md bg-gray-700 text-gray-200 shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Add Content */}
          <div className="mb-4">
            <label className="block text-sm font-medium">Content*</label>
            <select
              value={currentBlock.type}
              onChange={(e) =>
                setCurrentBlock({ ...currentBlock, type: e.target.value })
              }
              className="block w-full px-4 py-2 mb-2 border border-gray-700 rounded-md bg-gray-700 text-gray-200"
            >
              <option value="paragraph">Paragraph</option>
              <option value="heading">Heading</option>
              <option value="image">Image</option>
            </select>

            {currentBlock.type === "image" ? (
              <input
                type="file"
                onChange={(e) =>
                  setCurrentBlock({ ...currentBlock, value: e.target.files[0] })
                }
                className="block w-full text-sm text-gray-400
                           file:mr-4 file:py-2 file:px-4
                           file:rounded-md file:border-0
                           file:bg-blue-50 file:text-blue-700
                           hover:file:bg-blue-100"
              />
            ) : (
              <textarea
                value={currentBlock.value}
                onChange={handleBlockChange}
                placeholder={`Enter your ${currentBlock.type}`}
                rows="4"
                className="mt-1 block w-full px-4 py-2 border border-gray-700 rounded-md bg-gray-700 text-gray-200 shadow-sm"
              ></textarea>
            )}

            <button
              type="button"
              onClick={addBlock}
              className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              Add Block
            </button>
          </div>

          {/* Preview */}
          <div className="mb-4">
            <button
              type="button"
              onClick={() => setPreview((prev) => !prev)}
              className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700"
            >
              {preview ? "Hide Preview" : "Show Preview"}
            </button>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Submit Post
          </button>
        </form>
      </div>

      {/* Preview Section */}
      {preview && (
        <div className="w-full max-w-4xl bg-gray-800 mt-6 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">Preview</h2>
          {formData.mainImage && (
            <img
              src={URL.createObjectURL(formData.mainImage)}
              alt="Main"
              className="mb-4 w-full rounded-md"
            />
          )}
          <h1 className="text-3xl font-bold mb-2">{formData.mainTitle}</h1>
          <h2 className="text-2xl font-bold mb-2">{formData.title}</h2>
          {formData.content.map((block, index) => {
            if (block.type === "heading") {
              return (
                <h2 key={index} className="text-2xl font-bold my-2">
                  {block.value}
                </h2>
              );
            }
            if (block.type === "paragraph") {
              return (
                <p key={index} className="my-2">
                  {block.value}
                </p>
              );
            }
            if (block.type === "image" && block.value) {
              return (
                <img
                  key={index}
                  src={URL.createObjectURL(block.value)}
                  alt="Block"
                  className="my-2 w-full rounded-md"
                />
              );
            }
            return null;
          })}
        </div>
      )}
    </div>
  );
};

export default CreatePost;
