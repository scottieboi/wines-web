import { createAction } from "@reduxjs/toolkit";

// eslint-disable-next-line import/prefer-default-export
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
