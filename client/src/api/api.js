import axios from "axios";

// for local.
const rawBaseUrl = "http://localhost:5000";

// for testing.
// const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

// for prod-envoirnment
// const rawBaseUrl = process.env.NEXT_PUBLIC_PROD_BASE_URL || "";
const BASE_URL = rawBaseUrl.endsWith("/")
  ? rawBaseUrl.slice(0, -1)
  : rawBaseUrl;

// eth api's
export const simulateTx = async (formData) => {
  return await axios.post(
    `${BASE_URL}/api/simulate/execute-simulation`,
    formData,
    {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    },
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
    },
  );
};

export const phishingChecks = async (formData) => {
  return await axios.post(
    `${BASE_URL}/api/phishing/phishing-checks`,
    formData,
    {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    },
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
    },
  );
};

// wallet connection auth api's
export const authConnect = async (formData) => {
  return await axios.post(`${BASE_URL}/auth/connect`, formData, {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });
};

export const authGetAPI = async (connectedAddress) => {
  return await axios.get(`${BASE_URL}/auth/apiKey/${connectedAddress}`, {
    withCredentials: true,
  });
};
 export const authDeleteKey = async (connectedAddress) => {
  return await axios.delete(`${BASE_URL}/auth/deleteKey/${connectedAddress}`, {
    withCredentials: true,
  });
};  


// Solana api's
export const solSimulateTx = async (formData) => {
  return await axios.post(
    `${BASE_URL}/api/solana/simulate/execute-sol-simulation`,
    formData,
    {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    },
  );
};
