import { createReducer } from "@reduxjs/toolkit";
import { AllWinesResponse, FindWineRespone } from "../../api/apiResponses";
import { EndpointName } from "../../api";
import { fetchData, saveToken, updateData } from "./actions";

type State = {
  token: string | null;
  fetchingData: Record<EndpointName, boolean>;
  findAllWinesResponse: Array<AllWinesResponse> | null;
  findWineResponse: FindWineRespone | null;
};

/**
 * Initialies the fetchingData object, with keys for every Endpoint, to false.
 * @returns An initialised object, with keys for every Endpoint.
 */
const initFetchingData = () => {
  return Object.values(EndpointName)
    .filter((endpoint) => typeof endpoint === "string")
    .reduce(
      (result, endpoint) => ({
        ...result,
        [endpoint]: false,
      }),
      <Record<EndpointName, boolean>>{}
    );
};

const getToken = (): string | null => {
  const tokenString = localStorage.getItem("token") ?? "{}";
  const userToken = JSON.parse(tokenString);
  return userToken?.token ?? null;
};

const initialState: State = {
  token: getToken(),
  findAllWinesResponse: null,
  findWineResponse: null,
  fetchingData: initFetchingData(),
};

export default createReducer(initialState, (builder) => {
  builder
    .addCase(saveToken, (state, action) => {
      return { ...state, token: action.payload.token };
    })
    .addCase(updateData, (state, action) => {
      switch (action.payload.endpoint) {
        case EndpointName.FindAllWines:
          return {
            ...state,
            findAllWinesResponse: action.payload
              .data as Array<AllWinesResponse>,
            fetchingData: {
              ...state.fetchingData,
              [action.payload.endpoint]: false,
            },
          };
        case EndpointName.FindWineById:
          return {
            ...state,
            findWineResponse: action.payload.data as FindWineRespone,
            fetchingData: {
              ...state.fetchingData,
              [action.payload.endpoint]: false,
            },
          };
        default:
          return state;
      }
    })
    .addCase(fetchData, (state, action) => {
      return {
        ...state,
        fetchingData: {
          ...state.fetchingData,
          [action.payload.endpoint]: true,
        },
      };
    });
});
