import {
  fetchFindWineById,
  updateFindWineById,
} from "../../state/findWineById";
import { getWineById } from "../../api/callApi";
import { useAppDispatch, useAppSelector } from "../hooks";

export default function useFindWineById(): (id: number) => void {
  const dispatch = useAppDispatch();
  const token = useAppSelector((state) => state.auth.token);
  const callEndpoint = (id: number) => {
    if (token) {
      dispatch(fetchFindWineById());
      getWineById(token, id).then((response) => {
        dispatch(updateFindWineById(response.data));
      });
    }
  };

  return callEndpoint;
}
