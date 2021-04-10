import { AllWinesResponse, Endpoint, FindWineRespone } from "../ApiCalls";

export enum ActionType {
  "SaveToken",
  "FetchData",
  "UpdateData",
}

export type Action =
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
