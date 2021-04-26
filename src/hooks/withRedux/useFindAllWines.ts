import {
  updateFindAllWines,
  fetchFindAllWines,
} from "../../redux/findAllWines";
import { getAllWines } from "../../api/callApi";
import { useAppDispatch, useAppSelector } from "../hooks";

export default function useFindAllWines(): () => void {
  const dispatch = useAppDispatch();
  const token = useAppSelector((state) => state.auth.token);
  const callEndpoint = () => {
    if (token) {
      dispatch(fetchFindAllWines());
      getAllWines(token).then((response) => {
        dispatch(updateFindAllWines(response.data));
      });
    }
  };

  return callEndpoint;
}
