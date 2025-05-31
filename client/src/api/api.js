import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000",
  withCredentials: true,
});

const BASE_URL = "http://localhost:5000";

export const simulateTx = (data) =>
  API.post("/api/simulate/execute-simulation", data);

export const honeypotChecks = async (formData) => {
  return await axios.post(
    `${BASE_URL}/api/honeypot/honeypot-checks`,
    formData,
    {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    }
  );
};
