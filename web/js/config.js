const API_URL =
  window.location.hostname === "localhost"
    ? "http://localhost:3000"        
    : window.location.origin + "/api"; 

export default API_URL;
