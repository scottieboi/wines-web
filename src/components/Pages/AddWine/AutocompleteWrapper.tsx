import * as React from "react";
import { CircularProgress, TextField } from "@material-ui/core";
import Autocomplete, {
  createFilterOptions,
} from "@material-ui/lab/Autocomplete";

export type OptionType = {
  name: string;
  id?: number;
  inputValue?: string;
};

const filter = createFilterOptions<OptionType>();

interface AutocompleteWrapperProps {
  label: string;
  className?: string;
  fetchOptions: () => Promise<OptionType[]>;
}

const AutocompleteWrapper: React.FunctionComponent<AutocompleteWrapperProps> = ({
  label,
  className,
  fetchOptions,
}: AutocompleteWrapperProps) => {
  const [value, setValue] = React.useState<OptionType | null>(null);
  const [options, setOptions] = React.useState<OptionType[]>([]);
  const [open, setOpen] = React.useState(false);

  const loading = open && options.length === 0;

  React.useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    (async () => {
      if (active) {
        const newOptions = await fetchOptions();
        setOptions(newOptions);
      }
    })();

    return () => {
      active = false;
    };
  }, [loading, fetchOptions, value]);

  return (
    <Autocomplete
      selectOnFocus
      clearOnBlur
      handleHomeEndKeys
      value={value}
      onChange={(e, newValue) => {
        if (typeof newValue === "string") {
          setValue({
            name: newValue,
          });
        } else if (newValue && newValue.inputValue) {
          // Create a new value from the user input
          setValue({
            name: newValue.inputValue,
          });
        } else {
          setValue(newValue);
        }
      }}
      style={{ display: "inline-flex" }}
      className={className}
      options={options}
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      filterOptions={(unfilteredOptions, params) => {
        const filtered = filter(unfilteredOptions, params);
        if (params.inputValue !== "") {
          filtered.push({
            inputValue: params.inputValue,
            name: `Add "${params.inputValue}"`,
          });
        }

        return filtered;
      }}
      getOptionLabel={(option) => {
        // Value selected with enter, right from the input
        if (typeof option === "string") {
          return option;
        }
        // Add "xxx" option created dynamically
        if (option.inputValue) {
          return option.inputValue;
        }
        // Regular option
        return option.name;
      }}
      freeSolo
      renderOption={(option) => option.name}
      loading={loading}
      renderInput={(params) => (
        <TextField
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...params}
          label={label}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {loading && <CircularProgress color="inherit" size={20} />}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
    />
  );
};

AutocompleteWrapper.defaultProps = {
  className: undefined,
};

export default AutocompleteWrapper;
