import { useReducer } from "react";
import { AllWinesResponse } from "./ApiResponseTypes";
import callApi from "./callApi";
import Endpoint from "./Endpoint";
import { Token } from "./Token";

const getToken = (): string | null => {
  const tokenString = localStorage.getItem("token") ?? "{}";
  const userToken = JSON.parse(tokenString);
  return userToken?.token ?? null;
};

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
  findAllResponse: [],
  fetchingData: initFetchingData(),
};

type State = {
  token: string | null;
  findAllResponse: Array<AllWinesResponse>;
  fetchingData: Record<Endpoint, boolean>;
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
      data: Array<AllWinesResponse>;
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
    case ActionType.FetchData:
      return {
        ...state,
        fetchingData: { ...state.fetchingData, [action.endpoint]: true },
      };
    case ActionType.UpdateData:
      switch (action.endpoint) {
        case Endpoint.FindAll:
          return {
            ...state,
            findAllResponse: action.data as Array<AllWinesResponse>,
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

  const { token, findAllResponse, fetchingData } = state;

  const saveToken = (userToken: Token) => {
    localStorage.setItem("token", JSON.stringify(userToken));
    dispatch({ type: ActionType.SaveToken, token: userToken.token });
  };

  const callEndpoint = (endpoint: Endpoint) => {
    if (token) {
      dispatch({ type: ActionType.FetchData, endpoint });
      callApi(token, endpoint).then((response) => {
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
    apiResults: {
      findAllResponse,
    },
    fetchingData,
    setToken: saveToken,
    callEndpoint,
  };
}
