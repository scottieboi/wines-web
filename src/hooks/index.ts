import { useAppDispatch, useAppSelector } from "./hooks";
import useFindAllWines from "./withRedux/useFindAllWines";
import useFindRegions from "./synchronous/useFindRegions";
import useFindVineyards from "./synchronous/useFindVineyards";
import useFindWineById from "./withRedux/useFindWineById";
import useFindWineTypes from "./synchronous/useFindWineTypes";

export {
  useFindAllWines,
  useFindWineById,
  useFindVineyards,
  useFindRegions,
  useFindWineTypes,
  useAppDispatch,
  useAppSelector,
};
