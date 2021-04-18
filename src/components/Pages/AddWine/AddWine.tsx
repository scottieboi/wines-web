import * as React from "react";
import { Page } from "../../Common/Page";
import { Loading } from "../../Common/Loading";
import { Tile } from "../../Common/Tile";

const AddWine = (): JSX.Element => {
  return (
    <Page titleText="Add a wine">
      <Tile>
        <Loading />
      </Tile>
    </Page>
  );
};

export default AddWine;

// short? Vintage
// string Winename
// float? Percentalcohol
// decimal? Pricepaid
// short? Yearbought
// short? Bottlesize
// string Notes
// short? Rating
// short? Drinkrangefrom
// short? Drinkrangeto

// Region Region
// Vineyard Vineyard
// Winetype Winetype

// ICollection<Location> Locations
// Box No
// Qty
