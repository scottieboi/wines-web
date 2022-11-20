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

interface AutocompleteControlProps {
  label: string;
  className?: string;
  onFetchOptions: () => Promise<OptionType[]>;
  value: OptionType | null;
  onUpdateValue: (value: OptionType | null) => void;
  required?: boolean;
  error?: boolean;
  helperText?: string;
}

const AutocompleteControl: React.FunctionComponent<AutocompleteControlProps> =
  ({
    label,
    className,
    onFetchOptions,
    value,
    onUpdateValue,
    required,
    error,
    helperText,
  }: AutocompleteControlProps) => {
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
          const newOptions = await onFetchOptions();
          setOptions(newOptions);
        }
      })();

      return () => {
        active = false;
      };
    }, [loading, onFetchOptions, value]);

    return (
      <Autocomplete
        selectOnFocus
        clearOnBlur
        handleHomeEndKeys
        value={value}
        onChange={(e, newValue) => {
          if (typeof newValue === "string") {
            onUpdateValue({
              name: newValue,
            });
          } else if (newValue && newValue.inputValue) {
            // Create a new value from the user input
            onUpdateValue({
              name: newValue.inputValue,
            });
          } else {
            onUpdateValue(newValue);
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
            required={required}
            error={error}
            helperText={helperText}
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

AutocompleteControl.defaultProps = {
  className: undefined,
  required: false,
  error: false,
  helperText: undefined,
};

export default AutocompleteControl;
