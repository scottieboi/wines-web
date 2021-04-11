import callApi from "./callApi";
import { Endpoint, Token } from "../Types";
import { fetchData, saveToken, updateData } from "./actions";
import { AppDispatch } from "./store";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function useApi(token: string | null, dispatch: AppDispatch) {
  const saveTokenInLocalStorage = (userToken: Token) => {
    localStorage.setItem("token", JSON.stringify(userToken));
    saveToken({ token: userToken.token });
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
    isLoggedIn: !!token,
    setToken: saveTokenInLocalStorage,
    callEndpoint,
  };
}
