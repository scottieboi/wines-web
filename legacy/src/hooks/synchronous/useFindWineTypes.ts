import { getWineTypes } from "../../api/callApi";
import { useAppSelector } from "../hooks";
import { FindWineTypeResponse } from "../../api/apiResponses";

export default function useFindWineTypes(): (
  searchterm?: string
) => Promise<FindWineTypeResponse[] | undefined> {
  const token = useAppSelector((state) => state.auth.token);

  return async (
    searchterm?: string
  ): Promise<FindWineTypeResponse[] | undefined> => {
    if (token) {
      const response = await getWineTypes(token, searchterm ?? "");
      return response.data;
    }
    return undefined;
  };
}
