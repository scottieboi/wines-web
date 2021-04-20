import { combineReducers, configureStore } from "@reduxjs/toolkit";
import mainReducer from "./reducer";
import FindAllWines from "./slices/FindAllWines";
import FindWineById from "./slices/FindWineById";

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
