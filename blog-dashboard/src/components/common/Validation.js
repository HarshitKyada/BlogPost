// Validation.js
export const validateField = (name, value) => {
  const errors = {};

  if (!value) {
    errors[name] = "This field is required.";
    return errors;
  }

  switch (name) {
    case "email":
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        errors[name] = "Please enter a valid email address.";
      }
      break;

    case "password":
      if (value.length < 6) {
        errors[name] = "Password must be at least 6 characters long.";
      }
      break;

    default:
      break;
  }

  return errors;
};
