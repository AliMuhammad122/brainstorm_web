import { apiSlice } from "./apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "/api/v1/auth/login",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["User"],
    }),
    signup: builder.mutation({
      query: (userData) => ({
        url: "/api/v1/auth/signup",
        method: "POST",
        body: userData,
      }),
      invalidatesTags: ["User"],
    }),
    requestOtp: builder.mutation({
      query: (payload) => ({
        url: "/api/v1/auth/request-otp",
        method: "POST",
        body: payload,
      }),
    }),
    verifyOtp: builder.mutation({
      query: (payload) => ({
        url: "/api/v1/auth/verify-otp",
        method: "POST",
        body: payload,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: "/api/v1/auth/logout",
        method: "POST",
      }),
      invalidatesTags: ["User"],
    }),
    getProfile: builder.query({
      query: () => ({
        url: "/api/v1/user",
        method: "GET",
      }),
      providesTags: ["User"],
    }),
    getPresignedUrl: builder.mutation({
      query: (payload) => ({
        url: "/api/v1/user/pre-signed-url",
        method: "POST",
        body: payload,
      }),
    }),
    updateProfile: builder.mutation({
      query: (body) => ({
        url: "/api/v1/user",
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["User"],
    }),
    changePassword: builder.mutation({
      query: (body) => ({
        url: "/api/v1/auth/change-password",
        method: "POST",
        body,
      }),
    }),
    forgotPassword: builder.mutation({
      query: (body) => ({
        url: "/api/v1/auth/forgot-password",
        method: "POST",
        body,
      }),
    }),
    resetPassword: builder.mutation({
      query: (body) => ({
        url: "/api/v1/auth/reset-password",
        method: "POST",
        body,
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useLoginMutation,
  useSignupMutation,
  useRequestOtpMutation,
  useVerifyOtpMutation,
  useLogoutMutation,
  useGetProfileQuery,
  useGetPresignedUrlMutation,
  useUpdateProfileMutation,
  useChangePasswordMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
} = authApiSlice;

