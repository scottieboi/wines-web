import * as React from "react";
import { IconButton, TextField, Typography } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import { LocationValidationMessages } from "./ValidationMessages";
import { Location } from "./FormData";

export interface LocationTextField {
  type: "boxno" | "qty";
  newValue: number | "";
  locationId: number;
}

interface LocationControlProps {
  locations: Location[];
  onUpdateLocations: ({
    addLocation,
    removeLocation,
    newLocation,
  }: {
    addLocation?: boolean;
    removeLocation?: boolean;
    newLocation?: LocationTextField;
  }) => void;
  textFieldClassName?: string;
  validationMessages?: Record<number, LocationValidationMessages>;
}

const LocationControl: React.FunctionComponent<LocationControlProps> = ({
  locations,
  onUpdateLocations,
  textFieldClassName,
  validationMessages,
}: LocationControlProps): JSX.Element => {
  const handleAddLocation = () => {
    onUpdateLocations({ addLocation: true });
  };

  const handleRemoveLocation = () => {
    if (locations.length > 1) {
      onUpdateLocations({ removeLocation: true });
    }
  };

  const handleLocationChange = (
    type: "boxno" | "qty",
    newValue: string,
    locationId: number
  ) => {
    const parsedNewValue = newValue === "" ? "" : Number.parseInt(newValue, 10);
    onUpdateLocations({
      newLocation: {
        newValue:
          !Number.isNaN(parsedNewValue) && parsedNewValue !== 0
            ? parsedNewValue
            : locations[locationId][type],
        locationId,
        type,
      },
    });
  };

  const createLocationInputs = (value: Location, index: number) => {
    const boxnoErrorText =
      validationMessages && validationMessages[index]
        ? validationMessages[index].boxno
        : undefined;

    const qtyErrorText =
      validationMessages && validationMessages[index]
        ? validationMessages[index].qty
        : undefined;

    return (
      <>
        <TextField
          error={!!boxnoErrorText}
          helperText={boxnoErrorText}
          required
          value={value.boxno}
          onChange={(e) => handleLocationChange("boxno", e.target.value, index)}
          label="Box no."
          className={textFieldClassName}
        />
        <TextField
          error={!!qtyErrorText}
          helperText={qtyErrorText}
          required
          value={value.qty}
          onChange={(e) => handleLocationChange("qty", e.target.value, index)}
          label="Quantity"
          className={textFieldClassName}
        />
      </>
    );
  };

  return (
    <>
      <div>
        <IconButton
          color="inherit"
          aria-label="add a location"
          onClick={handleAddLocation}
        >
          <AddIcon style={{ marginRight: "0.5em" }} />
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
    </>
  );
};

LocationControl.defaultProps = {
  textFieldClassName: undefined,
  validationMessages: undefined,
};

export default LocationControl;
