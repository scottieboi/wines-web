import * as React from "react";
import { Page } from "../../Common/Page";
import { Loading } from "../../Common/Loading";
import { Tile } from "../../Common/Tile";

const AddWine = (): JSX.Element => {
  return (
    <Page>
      <Tile>
        <Loading />
      </Tile>
    </Page>
  );
};

export default AddWine;
