export const API_KEY = process.env.REACT_APP_API_KEY;

export const getBookRequest = (name: string) => {
  return name
    .trim()
    .replace(/[^a-zA-Z0-9 -]/, "")
    .replace(/\s/g, "+");
};

