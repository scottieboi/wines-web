import { combineReducers, configureStore } from "@reduxjs/toolkit";
import mainReducer from "./Auth";
import FindAllWines from "./FindAllWines";
import FindWineById from "./FindWineById";

const reducer = combineReducers({
  auth: mainReducer,
  findAllWines: FindAllWines,
  findWineById: FindWineById,
});

export const store = configureStore({
  reducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
