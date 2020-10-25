import axios, { AxiosRequestConfig } from "axios";

export const request = async ({
  method,
  data: body,
  url,
}: AxiosRequestConfig) => {
  const { data } = await axios({
    baseURL: process.env.REACT_APP_API_URL,
    url,
    data: body,
    method: method,
  });
  return data;
};
