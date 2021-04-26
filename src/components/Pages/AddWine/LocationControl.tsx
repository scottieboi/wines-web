import * as React from "react";
import { IconButton, TextField, Typography } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";

export interface Location {
  boxno: number | "";
  qty: number | "";
}

interface LocationControlProps {
  locations: Location[];
  updateLocations: (locations: Location[]) => void;
  textFieldClassName?: string;
}

const LocationControl: React.FunctionComponent<LocationControlProps> = ({
  locations,
  updateLocations,
  textFieldClassName,
}: LocationControlProps): JSX.Element => {
  const handleAddLocation = () => {
    updateLocations([
      ...locations,
      {
        qty: "",
        boxno: "",
      },
    ]);
  };

  const handleRemoveLocation = () => {
    if (locations.length > 1) {
      updateLocations([...locations].slice(0, -1));
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
    updateLocations(newLocations);
  };

  const createLocationInputs = (value: Location, index: number) => {
    return (
      <>
        <TextField
          value={value.boxno}
          onChange={(e) => handleLocationChange("boxno", e.target.value, index)}
          label="Box no."
          className={textFieldClassName}
        />
        <TextField
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
    </>
  );
};

LocationControl.defaultProps = {
  textFieldClassName: undefined,
};

export default LocationControl;
