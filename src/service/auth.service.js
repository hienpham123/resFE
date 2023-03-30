import { API_URLs } from "../constant/api-url";
import baseApi from "./base-api";

export const authService = baseApi.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation({
      query: (payload) => ({
        url: API_URLs.LOGIN,
        method: "POST",
        body: payload,
      }),
    }),
  }),
});

export const { useLoginMutation } = authService;
