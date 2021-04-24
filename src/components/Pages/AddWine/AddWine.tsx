import * as React from "react";
import {
  IconButton,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import { Page } from "../../Common/Page";
import { Tile } from "../../Common/Tile";
import { Title } from "../../Common/Title";
import AutocompleteWrapper, { OptionType } from "./AutocompleteWrapper";
import useFindVineyards from "../../../hooks/useFindVineyards";

interface Location {
  boxno: number | undefined;
  qty: number | undefined;
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
      qty: undefined,
      boxno: undefined,
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

  const handleAddLocation = () => {
    setLocations([
      ...locations,
      {
        qty: undefined,
        boxno: undefined,
      },
    ]);
  };

  const handleRemoveLocation = () => {
    if (locations.length > 1) {
      setLocations([...locations].slice(0, -1));
    }
  };

  const handleLocationChange = (
    type: "boxno" | "qty",
    newValue: string,
    locationId: number
  ) => {
    const newLocations = [...locations];
    const parsedNewValue = newValue === "" ? "" : Number.parseInt(newValue, 10);
    newLocations[locationId] = {
      ...locations[locationId],
      [type]: !Number.isNaN(parsedNewValue)
        ? parsedNewValue
        : locations[locationId][type],
    };
    setLocations(newLocations);
  };

  const createLocationInputs = (value: Location, index: number) => {
    return (
      <>
        <TextField
          value={value.boxno}
          onChange={(e) => handleLocationChange("boxno", e.target.value, index)}
          label="Box no."
          className={classes.textField}
        />
        <TextField
          value={value.qty}
          onChange={(e) => handleLocationChange("qty", e.target.value, index)}
          label="Quantity"
          className={classes.textField}
        />
      </>
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
            <div>
              <IconButton
                color="inherit"
                aria-label="add a location"
                onClick={handleAddLocation}
              >
                <AddIcon />
                <Typography variant="body1" component="span">
                  Add a new location
                </Typography>
              </IconButton>
            </div>
            {locations.map((loc, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <div key={index}>
                {createLocationInputs(loc, index)}
                {
                  // Add remove last item button
                  index === locations.length - 1 && (
                    <IconButton
                      color="inherit"
                      aria-label="remove last location"
                      onClick={handleRemoveLocation}
                    >
                      <RemoveIcon />
                    </IconButton>
                  )
                }
              </div>
            ))}
          </div>
        </form>
      </Tile>
    </Page>
  );
};

export default AddWine;
