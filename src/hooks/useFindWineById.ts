import { EndpointName } from "../api";
import { getWineById } from "../api/callApi";
import { fetchData, updateData } from "../components/App/actions";
import { useAppDispatch, useAppSelector } from "./hooks";

export default function useFindWineById(): (id: number) => void {
  const dispatch = useAppDispatch();
  const token = useAppSelector((state) => state.token);
  const callEndpoint = (id: number) => {
    if (token) {
      dispatch(fetchData({ endpoint: EndpointName.FindWineById }));
      getWineById(token, id).then((response) => {
        dispatch(
          updateData({
            endpoint: EndpointName.FindWineById,
            data: response.data,
          })
        );
      });
    }
  };

  return callEndpoint;
}
