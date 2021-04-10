import { AllWinesResponse, Endpoint, FindWineRespone } from "../ApiCalls";
import { Action, ActionType } from "./action";

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

const getToken = (): string | null => {
  const tokenString = localStorage.getItem("token") ?? "{}";
  const userToken = JSON.parse(tokenString);
  return userToken?.token ?? null;
};

export const initialState: State = {
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

export function reducer(state: State, action: Action): State {
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
