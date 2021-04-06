import axios from "axios";
import Endpoint from "./Endpoint";

export default function callApi(token: string, endpoint: Endpoint) {
  switch (endpoint) {
    default:
    case Endpoint.FindAll:
      return axios.get(`${process.env.API_URL}/wines`);
  }
}
