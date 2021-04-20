/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { Token } from "../api";
import { saveToken } from "../redux/actions";
import type { RootState, AppDispatch } from "../redux/store";

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
