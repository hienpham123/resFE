import { API_URLs } from "../constant/api-url";
import baseApi from "./base-api";

export const provinceService = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getProvince: build.query({
      query: () => ({
        url: API_URLs.GET_PROVINCE,
        method: "GET",
      }),
    }),
    changeAddress: build.mutation({
      query: (params) => {
        return {
          url: API_URLs.UPDATE_ADDRESS,
          method: "POST",
          body: params,
        };
      },
    }),
  }),
});

export const { useGetProvinceQuery, useChangeAddressMutation } =
  provinceService;
