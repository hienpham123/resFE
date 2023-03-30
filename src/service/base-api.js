import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URLs } from "../constant/api-url";

const baseUrl = "http://127.0.0.1:8000/";

const timeout = 60000;

const prepareHeaders = (headers) => {
  headers.set("Content-Type", "application/json");

  const token = localStorage.getItem("token");
  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }
};

const baseQuery = fetchBaseQuery({ baseUrl, prepareHeaders, timeout });

const handleRequest = async (args, api, extraOptions) => {
  // if should refresh token here
  let result = await baseQuery(args, api, extraOptions);

  if (result.error) {
    // if api response throw 401 code those with
    // Throw error on a toast
    // api.dispatch(
    //   setToastMessage({ status: STATUS_TOAST.ERROR, message: translate(ERROR_TYPE?.[result.error.status] || '') })
    // );
  }
  return result;
};

const baseApi = createApi({
  reducerPath: "Restaurant",
  baseQuery: handleRequest,
  refetchOnMountOrArgChange: true,
  endpoints: () => ({}),
});

export default baseApi;
