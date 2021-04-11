import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import callApi from "../../utils/callApi";
import { Endpoint, Token } from "../../types";
import { fetchData, saveToken, updateData } from "./actions";
import type { RootState, AppDispatch } from "./store";

// Use throughout your app instead of plain `useDispatch` and `useSelector`
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function useApi(token: string | null, dispatch: AppDispatch) {
  const saveTokenInLocalStorage = (userToken: Token) => {
    localStorage.setItem("token", JSON.stringify(userToken));
    dispatch(saveToken({ token: userToken.token }));
  };

  const callEndpoint = (
    endpoint: Endpoint,
    queryParams?: Record<string, string>
  ) => {
    if (token) {
      dispatch(fetchData({ endpoint }));
      callApi({ token, endpoint, queryParams }).then((response) => {
        dispatch(updateData({ endpoint, data: response.data }));
      });
    }
  };

  return {
    setToken: saveTokenInLocalStorage,
    callEndpoint,
  };
}
