import axios, { AxiosResponse } from "axios";
import { Endpoint } from ".";

interface CallApiParams {
  token: string;
  endpoint: Endpoint;
  queryParams?: Record<string, string>;
}

export default function callApi({
  token,
  endpoint,
  queryParams,
}: CallApiParams): Promise<AxiosResponse<any>> {
  switch (endpoint) {
    case Endpoint.FindAllWines:
      return axios.get(`${process.env.API_URL}/wines`);
    case Endpoint.FindWineById:
      return axios.get(`${process.env.API_URL}/wine`, {
        params: queryParams,
      });
    default:
      throw new Error("Unhandled endpoint called");
  }
}
