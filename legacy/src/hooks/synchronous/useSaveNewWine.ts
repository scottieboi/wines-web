import { saveNewWine } from "../../api/callApi";
import { useAppSelector } from "../hooks";
import { SaveWineRequest } from "../../api/apiRequests";

export default function useSaveNewWine(): (
  wine: SaveWineRequest
) => Promise<boolean> {
  const token = useAppSelector((state) => state.auth.token);

  return async (wine: SaveWineRequest): Promise<boolean> => {
    if (token) {
      await saveNewWine(token, wine);
      return true;
    }
    return false;
  };
}
