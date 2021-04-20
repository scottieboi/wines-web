import { AxiosResponse } from "axios";
import { apiClient } from "./apiClient";
import { AllWinesResponse, FindWineRespone } from "./apiResponses";

export function getAllWines(
  token: string
): Promise<AxiosResponse<Array<AllWinesResponse>>> {
  return apiClient.get<Array<AllWinesResponse>>("/wines");
}

export function getWineById(
  token: string,
  id: number
): Promise<AxiosResponse<FindWineRespone>> {
  return apiClient.get<FindWineRespone>("/wine", {
    params: { id: id.toString() },
  });
}
