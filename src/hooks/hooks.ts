/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { Token } from "../api";
import { saveToken } from "../components/App/actions";
import type { RootState, AppDispatch } from "../components/App/store";

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

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
