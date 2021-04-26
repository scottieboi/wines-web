import * as React from "react";
import { makeStyles, TextField } from "@material-ui/core";
import { Page } from "../../Common/Page";
import { Tile } from "../../Common/Tile";
import { Title } from "../../Common/Title";
import AutocompleteWrapper, { OptionType } from "./AutocompleteWrapper";
import { useFindVineyards } from "../../../hooks";
import LocationControl from "./LocationControl";

interface Location {
  boxno: number | "";
  qty: number | "";
}

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
      width: "25ch",
    },
    notesField: {
      marginLeft: textFieldMargin,
      marginRight: textFieldMargin,
      width: `calc(100% - ${textFieldMargin * 2}px)`,
    },
  };
});

const AddWine = (): JSX.Element => {
  const [locations, setLocations] = React.useState<Array<Location>>([
    {
      qty: "",
      boxno: "",
    },
  ]);
  const classes = useStyles();

  const callFindVineyards = useFindVineyards();
  const fetchVineyards = async (): Promise<OptionType[]> => {
    const response = await callFindVineyards();
    return (
      response?.map((item) => ({ name: item.vineyard, id: item.id })) ?? []
    );
  };

  return (
    <Page titleText="Add a wine">
      <Tile>
        <Title>New wine</Title>
        <form className={classes.form} noValidate autoComplete="off">
          <div className={classes.formGroup}>
            <TextField label="Wine name" className={classes.textField} />
            <AutocompleteWrapper
              label="Vineyard"
              className={classes.textField}
              fetchOptions={fetchVineyards}
            />
            <TextField label="Wine type" className={classes.textField} />
            <TextField label="Region" className={classes.textField} />
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
              updateLocations={setLocations}
              textFieldClassName={classes.textField}
            />
          </div>
        </form>
      </Tile>
    </Page>
  );
};

export default AddWine;
