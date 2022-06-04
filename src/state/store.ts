import { combineReducers, configureStore } from "@reduxjs/toolkit";
import auth from "./auth";
import findAllWines from "./findAllWines";
import findWineById from "./findWineById";

const reducer = combineReducers({
  auth,
  findAllWines,
  findWineById,
});

export const store = configureStore({
  reducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
