import { createAction } from "@reduxjs/toolkit";
import { AllWinesResponse, Endpoint, FindWineRespone } from "../Types";

export const saveToken = createAction(
  "SAVE_TOKEN",
  ({ token }: { token: string }) => {
    return {
      payload: {
        token,
      },
    };
  }
);

export const fetchData = createAction(
  "FETCH_DATA",
  ({ endpoint }: { endpoint: Endpoint }) => {
    return {
      payload: {
        endpoint,
      },
    };
  }
);

export const updateData = createAction(
  "UPDATE_DATA",
  ({
    endpoint,
    data,
  }: {
    endpoint: Endpoint;
    data: Array<AllWinesResponse> | FindWineRespone;
  }) => {
    return {
      payload: {
        endpoint,
        data,
      },
    };
  }
);
