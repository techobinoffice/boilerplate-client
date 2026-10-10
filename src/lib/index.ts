import axios from "axios";
import { API_URL } from "../config";

// withCredentials lets the api set and read the httpOnly refreshToken cookie
const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value?: unknown) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  reject: (reason?: any) => void;
}> = [];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

api.interceptors.request.use(
  (config) => {
    const userString = localStorage.getItem("user");
    if (userString) {
      const user = JSON.parse(userString);
      const accessToken = user?.token;

      // the api expects the raw token, a header set by the caller wins
      if (accessToken && config.headers && !config.headers.Authorization) {
        config.headers.Authorization = accessToken;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      originalRequest.url !== "/auth/login" &&
      localStorage.getItem("user")
    ) {
      originalRequest._retry = true;

      if (isRefreshing) {
        return new Promise(function (resolve, reject) {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = token;
            return api(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      isRefreshing = true;

      const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
      try {
        const res = await axios.post(
          `${API_URL}/auth/refresh-token`,
          {},
          { withCredentials: true }
        );
        const { accessToken } = res.data.data;

        // Update token in localStorage
        const updatedUser = { ...storedUser, token: accessToken };
        localStorage.setItem("user", JSON.stringify(updatedUser));

        processQueue(null, accessToken);

        originalRequest.headers.Authorization = accessToken;
        return api(originalRequest);
      } catch (err) {
        console.log(err);
        processQueue(err, null);
        localStorage.removeItem("user");
        window.location.reload();
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default api;
