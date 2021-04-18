import { createAction } from "@reduxjs/toolkit";
import { AllWinesResponse, FindWineRespone } from "../../api/apiResponses";
import { EndpointName } from "../../api";

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
  ({ endpoint }: { endpoint: EndpointName }) => {
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
    endpoint: EndpointName;
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
