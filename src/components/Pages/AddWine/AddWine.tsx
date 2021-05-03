import * as React from "react";
import {
  Button,
  CircularProgress,
  makeStyles,
  TextField,
} from "@material-ui/core";
import { Page } from "../../Common/Page";
import { Tile } from "../../Common/Tile";
import { Title } from "../../Common/Title";
import AutocompleteControl, { OptionType } from "./AutocompleteControl";
import {
  useFindRegions,
  useFindVineyards,
  useFindWineTypes,
} from "../../../hooks/synchronous";
import LocationControl, { LocationTextField } from "./LocationControl";
import { FormData } from "./FormData";
import { ValidationMessages } from "./ValidationMessages";
import { validateFormData } from "./validateFormData";

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
    submitBtn: {
      marginTop: theme.spacing(4),
    },
  };
});

const AddWine = (): JSX.Element => {
  const classes = useStyles();

  const [formData, setFormData] = React.useState<FormData>({
    wineName: "",
    notes: "",
    vintage: "",
    yearBought: "",
    drinkFrom: "",
    drinkTo: "",
    pricePaid: "",
    rating: "",
    bottleSize: "",
    wineType: null,
    vineyard: null,
    region: null,
    locations: [{ qty: "", boxno: "" }],
  });
  const [saving, setSaving] = React.useState(false);
  const [errorMessages, setErrorMessages] = React.useState<ValidationMessages>(
    {}
  );

  // ___ Fetch autocomplete data ___
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

  // ___ onChangeHandlers ___
  const handleYearChange = (
    type: "vintage" | "yearBought" | "drinkFrom" | "drinkTo",
    newValue: string
  ) => {
    setErrorMessages({ ...errorMessages, [type]: undefined });
    const parsedNewValue = newValue === "" ? "" : Number.parseInt(newValue, 10);

    // Is a 4 digit year
    if (parsedNewValue === "" || /^\d{0,4}$/.test(newValue)) {
      setFormData({ ...formData, [type]: parsedNewValue });
    }
  };

  const handleTextChange = (
    type: "wineName" | "vineyard" | "wineType" | "region" | "notes",
    newValue: string | OptionType | null
  ) => {
    setErrorMessages({ ...errorMessages, [type]: undefined });
    setFormData({ ...formData, [type]: newValue });
  };

  const handlePricePaidChange = (newValue: string) => {
    // 0 or 0.00 or .00
    if (newValue === "" || /^\d*\.?\d{0,2}$/.test(newValue)) {
      setFormData({ ...formData, pricePaid: newValue });
    }
  };

  const handleRatingChange = (newValue: string) => {
    const parsedNewValue = newValue === "" ? "" : Number.parseInt(newValue, 10);

    // Rating is whole number between 0 and 100 (ideally)
    if (parsedNewValue === "" || /^\d{0,3}$/.test(newValue)) {
      setFormData({ ...formData, rating: parsedNewValue });
    }
  };

  const handleBottleSizeChange = (newValue: string) => {
    const parsedNewValue = newValue === "" ? "" : Number.parseInt(newValue, 10);
    if (parsedNewValue === "" || !Number.isNaN(parsedNewValue)) {
      setFormData({ ...formData, bottleSize: parsedNewValue });
    }
  };

  const handleLocationsChange = ({
    addLocation,
    removeLocation,
    newLocation,
  }: {
    addLocation?: boolean;
    removeLocation?: boolean;
    newLocation?: LocationTextField;
  }) => {
    let locations = [...formData.locations];
    // __ add an empty row __
    if (addLocation) {
      locations.push({
        boxno: "",
        qty: "",
      });
    }
    // __ delete last row __
    else if (removeLocation) {
      // remove validations on deleted row, if present
      const deletedRowIndex = locations.length - 1;
      if (errorMessages.locations && errorMessages.locations[deletedRowIndex]) {
        const newLocationsErrorMsgs = { ...errorMessages.locations };
        delete newLocationsErrorMsgs[deletedRowIndex];
        setErrorMessages({
          ...errorMessages,
          locations: newLocationsErrorMsgs,
        });
      }

      // remove last row in formData.locations
      locations = formData.locations.slice(0, -1);
    }
    // __ update existing row __
    else if (newLocation) {
      // remove validations on updated field, if present
      if (
        errorMessages.locations &&
        errorMessages.locations[newLocation.locationId]
      ) {
        const newLocationsErrorMsgs = {
          ...errorMessages.locations,
          [newLocation.locationId]: {
            ...errorMessages.locations[newLocation.locationId],
            [newLocation.type]: undefined,
          },
        };
        setErrorMessages({
          ...errorMessages,
          locations: newLocationsErrorMsgs,
        });
      }
      locations[newLocation.locationId] = {
        ...locations[newLocation.locationId],
        [newLocation.type]: newLocation.newValue,
      };
    }

    setFormData({
      ...formData,
      locations,
    });
  };

  // ___ onSave handler ___
  const handleSave = () => {
    const newErrorMessages = validateFormData(formData);
    setErrorMessages(newErrorMessages);

    if (Object.keys(newErrorMessages).length === 0) {
      setSaving(true);
    }
  };

  return (
    <Page titleText="Add a wine">
      <Tile>
        <Title>New wine</Title>
        <form className={classes.form} noValidate autoComplete="off">
          <div className={classes.formGroup}>
            <TextField
              required
              error={!!errorMessages.wineName}
              helperText={errorMessages.wineName}
              label="Wine name"
              className={classes.textField}
              value={formData.wineName}
              onChange={(e) => handleTextChange("wineName", e.target.value)}
            />
            <AutocompleteControl
              required
              error={!!errorMessages.vineyard}
              helperText={errorMessages.vineyard}
              label="Vineyard"
              className={classes.textField}
              onFetchOptions={fetchVineyards}
              value={formData.vineyard}
              onUpdateValue={(value) => handleTextChange("vineyard", value)}
            />
            <AutocompleteControl
              required
              error={!!errorMessages.wineType}
              helperText={errorMessages.wineType}
              label="Wine type"
              className={classes.textField}
              onFetchOptions={fetchWineTypes}
              value={formData.wineType}
              onUpdateValue={(value) => handleTextChange("wineType", value)}
            />
            <AutocompleteControl
              required
              error={!!errorMessages.region}
              helperText={errorMessages.region}
              label="Region"
              className={classes.textField}
              onFetchOptions={fetchRegions}
              value={formData.region}
              onUpdateValue={(value) => handleTextChange("region", value)}
            />
            <TextField
              required
              error={!!errorMessages.vintage}
              helperText={errorMessages.vintage}
              label="Vintage"
              className={classes.textField}
              value={formData.vintage}
              onChange={(e) => handleYearChange("vintage", e.target.value)}
            />
          </div>
          <div className={classes.formGroup}>
            <Title subtitle className={classes.formGroupTitle}>
              More details
            </Title>
            <TextField
              label="Year bought"
              className={classes.textField}
              value={formData.yearBought}
              onChange={(e) => handleYearChange("yearBought", e.target.value)}
            />
            <TextField
              label="Drink from (year)"
              className={classes.textField}
              value={formData.drinkFrom}
              onChange={(e) => handleYearChange("drinkFrom", e.target.value)}
            />
            <TextField
              label="Drink to (year)"
              className={classes.textField}
              value={formData.drinkTo}
              onChange={(e) => handleYearChange("drinkTo", e.target.value)}
            />
            <TextField
              label="Price paid"
              className={classes.textField}
              value={formData.pricePaid}
              onChange={(e) => handlePricePaidChange(e.target.value)}
            />
            <TextField
              label="Rating"
              className={classes.textField}
              value={formData.rating}
              onChange={(e) => handleRatingChange(e.target.value)}
            />
            <TextField
              label="Bottle size"
              className={classes.textField}
              value={formData.bottleSize}
              onChange={(e) => handleBottleSizeChange(e.target.value)}
            />
            <TextField
              label="Notes"
              multiline
              className={classes.notesField}
              value={formData.notes}
              onChange={(e) => handleTextChange("notes", e.target.value)}
            />
          </div>
          <div>
            <Title subtitle className={classes.formGroupTitle}>
              Location in cellar
            </Title>
            <LocationControl
              locations={formData.locations}
              validationMessages={errorMessages.locations}
              onUpdateLocations={handleLocationsChange}
              textFieldClassName={classes.textField}
            />
          </div>
          <Button
            variant="contained"
            color="primary"
            disabled={saving}
            className={classes.submitBtn}
            onClick={handleSave}
            endIcon={saving && <CircularProgress color="inherit" size={20} />}
          >
            Add wine
          </Button>
        </form>
      </Tile>
    </Page>
  );
};

export default AddWine;
