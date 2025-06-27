import axios from "axios";

// for local.
// const BASE_URL = "http://localhost:5000";

// for prod.
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const simulateTx = async (formData) => {
  return await axios.post(
    `${BASE_URL}/api/simulate/execute-simulation`,
    formData,
    {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    }
  );
};

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

export const contactApi = async (formData) => {
  return await axios.post(`${BASE_URL}/api/contact/connect`, formData, {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });
};

export const suggestionApi = async (formData) => {
  return await axios.post(
    `${BASE_URL}/api/generations/generate-recommendation`,
    formData,
    {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    }
  );
};
