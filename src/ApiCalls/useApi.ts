import { useReducer } from "react";
import { AllWinesResponse, FindWineRespone } from "./ApiResponseTypes";
import callApi from "./callApi";
import Endpoint from "./Endpoint";
import { Token } from "./Token";

const getToken = (): string | null => {
  const tokenString = localStorage.getItem("token") ?? "{}";
  const userToken = JSON.parse(tokenString);
  return userToken?.token ?? null;
};

/**
 * Initialies the fetchingData object, with keys for every Endpoint, to false.
 * @returns An initialised object, with keys for every Endpoint.
 */
const initFetchingData = () => {
  return Object.values(Endpoint)
    .filter((endpoint) => typeof endpoint === "string")
    .reduce(
      (result, endpoint) => ({
        ...result,
        [endpoint]: false,
      }),
      <Record<Endpoint, boolean>>{}
    );
};

const initialState: State = {
  token: getToken(),
  findAllWinesResponse: null,
  findWineResponse: null,
  fetchingData: initFetchingData(),
};

type State = {
  token: string | null;
  fetchingData: Record<Endpoint, boolean>;
  findAllWinesResponse: Array<AllWinesResponse> | null;
  findWineResponse: FindWineRespone | null;
};

enum ActionType {
  "SaveToken",
  "FetchData",
  "UpdateData",
}

type Action =
  | {
      type: ActionType.UpdateData;
      endpoint: Endpoint;
      data: Array<AllWinesResponse> | FindWineRespone;
    }
  | {
      type: ActionType.FetchData;
      endpoint: Endpoint;
    }
  | {
      type: ActionType.SaveToken;
      token: string;
    };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case ActionType.SaveToken:
      return { ...state, token: action.token };

    // Handle requests
    case ActionType.FetchData:
      return {
        ...state,
        fetchingData: { ...state.fetchingData, [action.endpoint]: true },
      };

    // Handle responses
    case ActionType.UpdateData:
      switch (action.endpoint) {
        case Endpoint.FindAllWines:
          return {
            ...state,
            findAllWinesResponse: action.data as Array<AllWinesResponse>,
            fetchingData: { ...state.fetchingData, [action.endpoint]: false },
          };
        case Endpoint.FindWineById:
          return {
            ...state,
            findWineResponse: action.data as FindWineRespone,
            fetchingData: { ...state.fetchingData, [action.endpoint]: false },
          };
        default:
          return state;
      }
    default:
      throw new Error();
  }
}

export default function useApi() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const saveToken = (userToken: Token) => {
    localStorage.setItem("token", JSON.stringify(userToken));
    dispatch({ type: ActionType.SaveToken, token: userToken.token });
  };

  const { token } = state;
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

  const { fetchingData, findAllWinesResponse, findWineResponse } = state;
  return {
    isLoggedIn: !!token,
    apiResults: {
      findAllWinesResponse,
      findWineResponse,
    },
    fetchingData,
    setToken: saveToken,
    callEndpoint,
  };
}
