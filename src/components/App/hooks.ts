/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { Endpoint, Token } from "../../api";
import { fetchData, saveToken, updateData } from "./actions";
import type { RootState, AppDispatch } from "./store";
import { getAllWines, getWineById } from "../../api/callApi";

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export function useApi<T extends Endpoint>(endpoint: T) {
  const dispatch = useAppDispatch();
  const token = useAppSelector((state) => state.token);
  const callEndpoint = (queryParams?: Record<string, string>) => {
    if (token) {
      // eslint-disable-next-line default-case
      switch (endpoint) {
        case Endpoint.FindAllWines:
          dispatch(fetchData({ endpoint }));
          getAllWines(token).then((response) => {
            dispatch(
              updateData({
                endpoint,
                data: response.data,
              })
            );
          });
          break;

        case Endpoint.FindWineById:
          dispatch(fetchData({ endpoint }));
          getWineById(token, queryParams ?? {}).then((response) => {
            dispatch(
              updateData({
                endpoint,
                data: response.data,
              })
            );
          });
          break;
      }
    }
  };

  return callEndpoint;
}

// export function useApiWithoutStore() {
//   const token = useAppSelector((state) => state.token);

//   const callEndpoint = (
//     endpoint: Endpoint,
//     queryParams?: Record<string, string>
//   ) => {
//     if (token) {
//       dispatch(fetchData({ endpoint }));
//       callApi({ token, endpoint, queryParams }).then((response) => {
//         dispatch(updateData({ endpoint, data: response.data }));
//       });
//     }
//   };

//   return callEndpoint;
// }

export function useAuth() {
  const dispatch = useAppDispatch();

  const saveTokenInLocalStorage = (userToken: Token) => {
    localStorage.setItem("token", JSON.stringify(userToken));
    dispatch(saveToken({ token: userToken.token }));
  };

  return {
    setToken: saveTokenInLocalStorage,
  };
}
