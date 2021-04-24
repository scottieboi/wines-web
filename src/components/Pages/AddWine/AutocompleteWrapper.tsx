import * as React from "react";
import { CircularProgress, TextField } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";

interface AutocompleteWrapperProps {
  label: string;
  className?: string;
  fetchOptions: (searchterm: string) => Promise<string[]>;
}

const AutocompleteWrapper: React.FunctionComponent<AutocompleteWrapperProps> = ({
  label,
  className,
  fetchOptions,
}: AutocompleteWrapperProps) => {
  const [userInput, setUserInput] = React.useState("");
  const [options, setOptions] = React.useState<string[]>([]);
  const [open, setOpen] = React.useState(false);

  const loading = open && options.length === 0;

  React.useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    (async () => {
      if (active) {
        const newOptions = await fetchOptions(userInput);
        setOptions(newOptions);
      }
    })();

    return () => {
      active = false;
    };
  }, [loading, fetchOptions, userInput]);

  return (
    <Autocomplete
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
      getOptionSelected={(option, value) => option === value}
      getOptionLabel={(option) => option}
      loading={loading}
      renderInput={(params) => (
        <TextField
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...params}
          label={label}
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
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
