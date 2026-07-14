import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL || "https://brainstorm-backend-app-rexxp.ondigitalocean.app/dev",
    prepareHeaders: (headers) => {
      // Access localStorage safely in Next.js environment
      if (typeof window !== "undefined") {
        const token = localStorage.getItem("token");
        if (token) {
          headers.set("authorization", `Bearer ${token}`);
        }
      }
      return headers;
    },
  }),
  tagTypes: ["User", "Menu", "Cart"],
  endpoints: () => ({}), // Empty endpoints object to inject other services later
});
