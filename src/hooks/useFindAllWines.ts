import { EndpointName } from "../api";
import { getAllWines } from "../api/callApi";
import { fetchData, updateData } from "../components/App/actions";
import { useAppDispatch, useAppSelector } from "./hooks";

export default function useFindAllWines(): () => void {
  const dispatch = useAppDispatch();
  const token = useAppSelector((state) => state.token);
  const callEndpoint = () => {
    if (token) {
      dispatch(fetchData({ endpoint: EndpointName.FindAllWines }));
      getAllWines(token).then((response) => {
        dispatch(
          updateData({
            endpoint: EndpointName.FindAllWines,
            data: response.data,
          })
        );
      });
    }
  };

  return callEndpoint;
}
