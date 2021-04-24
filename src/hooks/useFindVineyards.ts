import { getVineyards } from "../api/callApi";
import { useAppSelector } from "./hooks";
import { FindVineyardResponse } from "../api/apiResponses";

export default function useFindVineyards(): (
  searchterm: string
) => Promise<FindVineyardResponse[] | undefined> {
  const token = useAppSelector((state) => state.auth.token);

  return async (
    searchterm: string
  ): Promise<FindVineyardResponse[] | undefined> => {
    if (token) {
      const response = await getVineyards(token, searchterm);
      return response.data;
    }
    return undefined;
  };
}
