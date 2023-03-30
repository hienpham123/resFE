import { API_URLs } from "../constant/api-url";
import baseApi from "./base-api";

export const userService = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getMyProfile: build.query({
      query: () => ({
        url: API_URLs.GET_MY_PROFILE,
        method: "GET",
      }),
    }),
    updateNameProfile: build.mutation({
      query(params) {
        return {
          url: API_URLs.UPDATE_NAME_PROFILE,
          method: "POST",
          body: params,
        };
      },
    }),
    updateProfile: build.mutation({
      query(params) {
        return {
          url: API_URLs.UPDATE_PROFILE,
          method: "POST",
          body: params,
        };
      },
    }),
  }),
});

export const {
  useGetMyProfileQuery,
  useUpdateProfileMutation,
  useUpdateNameProfileMutation,
} = userService;
