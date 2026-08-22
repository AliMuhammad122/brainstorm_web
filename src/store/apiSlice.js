import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getStoredToken, clearStoredAuth, emitAuthExpired } from "../utils/auth";

const rawBaseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_API_URL || "https://brainstorm-backend-app-rexxp.ondigitalocean.app/dev",
  prepareHeaders: (headers) => {
    const token = getStoredToken();
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  const result = await rawBaseQuery(args, api, extraOptions);

  if (
    result?.error &&
    (result.error.status === 401 ||
      result.error.originalStatus === 401 ||
      result.error?.data?.status === 401 ||
      result.error?.data?.error?.message === "Unauthorized")
  ) {
    clearStoredAuth();
    emitAuthExpired();
  }

  return result;
};

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["User", "Menu", "Cart"],
  endpoints: () => ({}), // Empty endpoints object to inject other services later
});


