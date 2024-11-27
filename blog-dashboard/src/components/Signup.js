"use client";

import React, { useState } from "react";
import { validateField } from "./common/Validation";

const Login = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    terms: false,
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === "checkbox" ? checked : value;

    // Validate field
    const fieldErrors = validateField(name, fieldValue);
    setErrors((prev) => ({ ...prev, ...fieldErrors }));

    // Update form data
    setFormData((prev) => ({ ...prev, [name]: fieldValue }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate all fields
    let formValid = true;
    const newErrors = {};
    Object.keys(formData).forEach((field) => {
      const fieldErrors = validateField(field, formData[field]);
      if (Object.keys(fieldErrors).length > 0) {
        formValid = false;
        Object.assign(newErrors, fieldErrors);
      }
    });

    setErrors(newErrors);

    if (formValid) {
      console.log("Form submitted successfully!", formData);
    } else {
      console.log("Form has errors.");
    }
  };

  return (
    <div className="h-full min-h-screen w-full flex justify-center items-center">
      <div className="border border-white rounded-lg p-4">
        <h1 className="text-3xl">Sign up</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name">Name*</label>
            <br />
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              className="block w-full mt-1 border border-gray-300 rounded-lg p-2"
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name}</p>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="email">Email*</label>
            <br />
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              className="block w-full mt-1 border border-gray-300 rounded-lg p-2"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="password">Password*</label>
            <br />
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Enter a password"
              value={formData.password}
              onChange={handleChange}
              className="block w-full mt-1 border border-gray-300 rounded-lg p-2"
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password}</p>
            )}
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-lg"
          >
            Sign up
          </button>
        </form>
        <div className="mt-4">
          <button className="text-blue-500">Already a user? Login</button>
        </div>
      </div>
    </div>
  );
};

export default Login;
