import * as React from "react";
import { makeStyles, TextField } from "@material-ui/core";
import { Page } from "../../Common/Page";
import { Tile } from "../../Common/Tile";
import { Title } from "../../Common/Title";
import AutocompleteControl, { OptionType } from "./AutocompleteControl";
import {
  useFindRegions,
  useFindVineyards,
  useFindWineTypes,
} from "../../../hooks";
import LocationControl, { Location } from "./LocationControl";

const useStyles = makeStyles((theme) => {
  const textFieldMargin = theme.spacing(1);
  return {
    form: {
      maxWidth: "800px",
    },
    formGroup: {
      marginBottom: theme.spacing(1),
    },
    formGroupTitle: {
      marginTop: theme.spacing(4),
    },
    textField: {
      marginLeft: textFieldMargin,
      marginRight: textFieldMargin,
      width: "30ch",
    },
    notesField: {
      marginLeft: textFieldMargin,
      marginRight: textFieldMargin,
      width: `calc(100% - ${textFieldMargin * 2}px)`,
    },
  };
});

const AddWine = (): JSX.Element => {
  const classes = useStyles();

  const [wineType, setWineType] = React.useState<OptionType | null>(null);
  const [vineyard, setVinyard] = React.useState<OptionType | null>(null);
  const [region, setRegion] = React.useState<OptionType | null>(null);
  const [locations, setLocations] = React.useState<Location[]>([
    {
      qty: "",
      boxno: "",
    },
  ]);

  const callFindVineyards = useFindVineyards();
  const fetchVineyards = async (): Promise<OptionType[]> => {
    const response = await callFindVineyards();
    return (
      response?.map((item) => ({ name: item.vineyard, id: item.id })) ?? []
    );
  };

  const callFindWineTypes = useFindWineTypes();
  const fetchWineTypes = async (): Promise<OptionType[]> => {
    const response = await callFindWineTypes();
    return (
      response?.map((item) => ({ name: item.wineType, id: item.id })) ?? []
    );
  };

  const callFindRegions = useFindRegions();
  const fetchRegions = async (): Promise<OptionType[]> => {
    const response = await callFindRegions();
    return response?.map((item) => ({ name: item.region, id: item.id })) ?? [];
  };

  return (
    <Page titleText="Add a wine">
      <Tile>
        <Title>New wine</Title>
        <form className={classes.form} noValidate autoComplete="off">
          <div className={classes.formGroup}>
            <TextField label="Wine name" className={classes.textField} />
            <AutocompleteControl
              label="Vineyard"
              className={classes.textField}
              onFetchOptions={fetchVineyards}
              value={vineyard}
              onUpdateValue={setVinyard}
            />
            <AutocompleteControl
              label="Wine type"
              className={classes.textField}
              onFetchOptions={fetchWineTypes}
              value={wineType}
              onUpdateValue={setWineType}
            />
            <AutocompleteControl
              label="Region"
              className={classes.textField}
              onFetchOptions={fetchRegions}
              value={region}
              onUpdateValue={setRegion}
            />
            <TextField label="Vintage" className={classes.textField} />
          </div>
          <div className={classes.formGroup}>
            <Title subtitle className={classes.formGroupTitle}>
              More details
            </Title>
            <TextField label="Year bought" className={classes.textField} />
            <TextField
              label="Drink from (year)"
              className={classes.textField}
            />
            <TextField label="Drink to (year)" className={classes.textField} />
            <TextField label="Price paid" className={classes.textField} />
            <TextField label="Rating" className={classes.textField} />
            <TextField label="Bottle size" className={classes.textField} />
            <TextField label="Notes" multiline className={classes.notesField} />
          </div>
          <div>
            <Title subtitle className={classes.formGroupTitle}>
              Location in cellar
            </Title>
            <LocationControl
              locations={locations}
              onUpdateLocations={setLocations}
              textFieldClassName={classes.textField}
            />
          </div>
        </form>
      </Tile>
    </Page>
  );
};

export default AddWine;
