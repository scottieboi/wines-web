import { getRegions } from "../../api/callApi";
import { useAppSelector } from "../hooks";
import { FindRegionResponse } from "../../api/apiResponses";

export default function useFindRegions(): (
  searchterm?: string
) => Promise<FindRegionResponse[] | undefined> {
  const token = useAppSelector((state) => state.auth.token);

  return async (
    searchterm?: string
  ): Promise<FindRegionResponse[] | undefined> => {
    if (token) {
      const response = await getRegions(token, searchterm ?? "");
      return response.data;
    }
    return undefined;
  };
}
