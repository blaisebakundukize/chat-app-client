import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:4000",
});

// Set the AUTH token for any request
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  config.headers["authorization"] = token ? `Bearer ${token}` : "";
  // config.headers["Accept"] = "application/json";
  config.headers["Content-Type"] = "application/json";
  return config;
});

export default instance;
