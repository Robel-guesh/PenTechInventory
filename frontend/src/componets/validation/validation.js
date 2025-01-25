// utils/validation.js
export const validateField = (value, type) => {
  let errorMessage = "";

  switch (type) {
    case "number":
      if (isNaN(value)) {
        errorMessage = "This field must be a valid number.";
      }
      break;
    case "email":
      const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailPattern.test(value)) {
        errorMessage = "Please enter a valid email address.";
      }
      break;
    case "password":
      const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/; // Min 8 chars, 1 letter, 1 number
      if (!passwordPattern.test(value)) {
        errorMessage =
          "Password must be at least 8 characters, including a number.";
      }
      break;
    case "ObjectId":
      const objectIdPattern = /^[0-9a-fA-F]{24}$/; // Standard MongoDB ObjectId pattern
      if (!objectIdPattern.test(value)) {
        errorMessage = "This is not a valid ObjectId.";
      }
      break;
    default:
      break;
  }

  return errorMessage;
};
