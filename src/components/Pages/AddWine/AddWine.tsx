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
import LocationControl, { Location } from "./LocationControl";

interface ValidationMessages {
  wineName?: string;
  vineyard?: string;
  wineType?: string;
  region?: string;
  vintage?: string;
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

  const [wineName, setWineName] = React.useState<string>("");
  const [notes, setNotes] = React.useState<string>("");
  const [vintage, setVintage] = React.useState<number | "">("");
  const [yearBought, setYearBought] = React.useState<number | "">("");
  const [drinkFrom, setDrinkFrom] = React.useState<number | "">("");
  const [drinkTo, setDrinkTo] = React.useState<number | "">("");
  const [pricePaid, setPricePaid] = React.useState<string>("");
  const [rating, setRating] = React.useState<number | "">("");
  const [bottleSize, setBottleSize] = React.useState<number | "">("");
  const [wineType, setWineType] = React.useState<OptionType | null>(null);
  const [vineyard, setVinyard] = React.useState<OptionType | null>(null);
  const [region, setRegion] = React.useState<OptionType | null>(null);
  const [locations, setLocations] = React.useState<Location[]>([
    {
      qty: "",
      boxno: "",
    },
  ]);

  const [saving, setSaving] = React.useState(false);
  const [errorMessages, setErrorMessages] = React.useState<ValidationMessages>(
    {}
  );

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

  const handleYearChange = (
    type: "vintage" | "yearbought" | "drinkfrom" | "drinkto",
    newValue: string
  ) => {
    setErrorMessages({
      ...errorMessages,
      [type]: undefined,
    });
    const parsedNewValue = newValue === "" ? "" : Number.parseInt(newValue, 10);

    // Is a 4 digit year
    if (parsedNewValue === "" || /^\d{0,4}$/.test(newValue)) {
      // eslint-disable-next-line default-case
      switch (type) {
        case "vintage":
          // Reset error
          setVintage(parsedNewValue);
          break;
        case "yearbought":
          setYearBought(parsedNewValue);
          break;
        case "drinkfrom":
          setDrinkFrom(parsedNewValue);
          break;
        case "drinkto":
          setDrinkTo(parsedNewValue);
          break;
      }
    }
  };

  const handleTextChange = (
    type: "wineName" | "vineyard" | "wineType" | "region" | "notes",
    newValue: string | OptionType | null
  ) => {
    setErrorMessages({
      ...errorMessages,
      [type]: undefined,
    });
    // eslint-disable-next-line default-case
    switch (type) {
      case "wineName":
        setWineName(newValue as string);
        break;
      case "vineyard":
        setVinyard(newValue as OptionType | null);
        break;
      case "wineType":
        setWineType(newValue as OptionType | null);
        break;
      case "region":
        setRegion(newValue as OptionType | null);
        break;
      case "notes":
        setNotes(newValue as string);
        break;
    }
  };

  const handlePricePaidChange = (newValue: string) => {
    // 0 or 0.00 or .00
    if (newValue === "" || /^\d*\.?\d{0,2}$/.test(newValue)) {
      setPricePaid(newValue);
    }
  };

  const handleRatingChange = (newValue: string) => {
    const parsedNewValue = newValue === "" ? "" : Number.parseInt(newValue, 10);

    // Rating is whole number between 0 and 100 (ideally)
    if (parsedNewValue === "" || /^\d{0,3}$/.test(newValue)) {
      setRating(parsedNewValue);
    }
  };

  const handleBottleSize = (newValue: string) => {
    const parsedNewValue = newValue === "" ? "" : Number.parseInt(newValue, 10);
    if (parsedNewValue === "" || !Number.isNaN(parsedNewValue)) {
      setBottleSize(parsedNewValue);
    }
  };

  const handleSave = () => {
    let hasErrors = false;
    let newErrorMessages: ValidationMessages = {};
    // Required fields
    if (!wineName) {
      hasErrors = true;
      newErrorMessages = {
        ...newErrorMessages,
        wineName: "Missing required field",
      };
    }

    if (!vineyard?.name) {
      hasErrors = true;
      newErrorMessages = {
        ...newErrorMessages,
        vineyard: "Missing required field",
      };
    }

    if (!wineType?.name) {
      hasErrors = true;
      newErrorMessages = {
        ...newErrorMessages,
        wineType: "Missing required field",
      };
    }

    if (!region?.name) {
      hasErrors = true;
      newErrorMessages = {
        ...newErrorMessages,
        region: "Missing required field",
      };
    }

    if (!vintage) {
      hasErrors = true;
      newErrorMessages = {
        ...newErrorMessages,
        vintage: "Missing required field",
      };
    }

    setErrorMessages(newErrorMessages);
    if (!hasErrors) {
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
              value={wineName}
              onChange={(e) => handleTextChange("wineName", e.target.value)}
            />
            <AutocompleteControl
              required
              error={!!errorMessages.vineyard}
              helperText={errorMessages.vineyard}
              label="Vineyard"
              className={classes.textField}
              onFetchOptions={fetchVineyards}
              value={vineyard}
              onUpdateValue={(value) => handleTextChange("vineyard", value)}
            />
            <AutocompleteControl
              required
              error={!!errorMessages.wineType}
              helperText={errorMessages.wineType}
              label="Wine type"
              className={classes.textField}
              onFetchOptions={fetchWineTypes}
              value={wineType}
              onUpdateValue={(value) => handleTextChange("wineType", value)}
            />
            <AutocompleteControl
              required
              error={!!errorMessages.region}
              helperText={errorMessages.region}
              label="Region"
              className={classes.textField}
              onFetchOptions={fetchRegions}
              value={region}
              onUpdateValue={(value) => handleTextChange("region", value)}
            />
            <TextField
              required
              error={!!errorMessages.vintage}
              helperText={errorMessages.vintage}
              label="Vintage"
              className={classes.textField}
              value={vintage}
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
              value={yearBought}
              onChange={(e) => handleYearChange("yearbought", e.target.value)}
            />
            <TextField
              label="Drink from (year)"
              className={classes.textField}
              value={drinkFrom}
              onChange={(e) => handleYearChange("drinkfrom", e.target.value)}
            />
            <TextField
              label="Drink to (year)"
              className={classes.textField}
              value={drinkTo}
              onChange={(e) => handleYearChange("drinkto", e.target.value)}
            />
            <TextField
              label="Price paid"
              className={classes.textField}
              value={pricePaid}
              onChange={(e) => handlePricePaidChange(e.target.value)}
            />
            <TextField
              label="Rating"
              className={classes.textField}
              value={rating}
              onChange={(e) => handleRatingChange(e.target.value)}
            />
            <TextField
              label="Bottle size"
              className={classes.textField}
              value={bottleSize}
              onChange={(e) => handleBottleSize(e.target.value)}
            />
            <TextField
              label="Notes"
              multiline
              className={classes.notesField}
              value={notes}
              onChange={(e) => handleTextChange("notes", e.target.value)}
            />
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
