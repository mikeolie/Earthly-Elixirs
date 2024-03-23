const url =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8000"
    : "https://grolens-api.afam.app";

export default url;
