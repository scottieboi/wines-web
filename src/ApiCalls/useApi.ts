import { Action, ActionType } from "../StateManagement";
import callApi from "./callApi";
import Endpoint from "./Endpoint";
import { Token } from "./Token";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function useApi(
  token: string | null,
  dispatch: React.Dispatch<Action>
) {
  const saveToken = (userToken: Token) => {
    localStorage.setItem("token", JSON.stringify(userToken));
    dispatch({ type: ActionType.SaveToken, token: userToken.token });
  };

  const callEndpoint = (
    endpoint: Endpoint,
    queryParams?: Record<string, string>
  ) => {
    if (token) {
      dispatch({ type: ActionType.FetchData, endpoint });
      callApi({ token, endpoint, queryParams }).then((response) => {
        dispatch({
          type: ActionType.UpdateData,
          endpoint,
          data: response.data,
        });
      });
    }
  };

  return {
    isLoggedIn: !!token,
    setToken: saveToken,
    callEndpoint,
  };
}
