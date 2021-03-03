import axios from "axios";

const instance = axios.create({
  // This should in variable environment
  baseURL: "https://chat-app-bb.herokuapp.com/",
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
