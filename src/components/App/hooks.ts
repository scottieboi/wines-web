/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import callApi from "../../utils/callApi";
import { Endpoint, Token } from "../../types";
import { fetchData, saveToken, updateData } from "./actions";
import type { RootState, AppDispatch } from "./store";

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export function useApi() {
  const dispatch = useAppDispatch();
  const token = useAppSelector((state) => state.token);

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

  return callEndpoint;
}

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
