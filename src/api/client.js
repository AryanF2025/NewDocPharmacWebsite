import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "/api";

export const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 20000,
  headers: { "Content-Type": "application/json" },
});

apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const status = error.response?.status;
    // The wrapper sends { message, error }, so the specific field wins.
    const message =
      error.response?.data?.error ||
      error.response?.data?.message ||
      (error.code === "ECONNABORTED"
        ? "The request timed out. Please try again."
        : "Something went wrong. Please try again.");

    return Promise.reject(Object.assign(new Error(message), { status, cause: error }));
  }
);
