import validator from "validator";

export const isValidName = (name) => {
  const trimmed = String(name || "").trim();
  return validator.isLength(trimmed, { max: 60 });
};

export const isValidAddress = (address) => {
  const trimmed = String(address || "").trim();
  return validator.isLength(trimmed, { max: 400 });
};

export const isValidPassword = (password) => {
  const value = String(password || "");
  return (
    validator.isLength(value, { min: 8, max: 16 }) &&
    /[A-Z]/.test(value) &&
    /[^A-Za-z0-9]/.test(value)
  );
};

export const isValidEmail = (email) => validator.isEmail(String(email || ""));
