import * as React from "react";
import { makeStyles, TextField } from "@material-ui/core";
import { Page } from "../../Common/Page";
import { Loading } from "../../Common/Loading";
import { Tile } from "../../Common/Tile";
import { Title } from "../../Common/Title";

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
  const classes = useStyles();
  const yearInputProps = {
    min: 1900,
    max: 3000,
    step: 1,
  };
  const currencyInputProps = {
    min: 0,
    step: 0.01,
  };

  return (
    <Page titleText="Add a wine">
      <Tile>
        <Title>New wine</Title>
        <form className={classes.form} noValidate autoComplete="off">
          <div className={classes.formGroup}>
            <TextField label="Wine name" className={classes.textField} />
            <TextField label="Vineyard" className={classes.textField} />
            <TextField label="Wine type" className={classes.textField} />
            <TextField label="Region" className={classes.textField} />
            <TextField
              label="Vintage"
              className={classes.textField}
              type="number"
              inputProps={yearInputProps}
            />
          </div>
          <div className={classes.formGroup}>
            <Title subtitle className={classes.formGroupTitle}>
              More details
            </Title>
            <TextField
              label="Year bought"
              className={classes.textField}
              type="number"
              inputProps={yearInputProps}
            />
            <TextField
              label="Drink from (year)"
              className={classes.textField}
              type="number"
              inputProps={yearInputProps}
            />
            <TextField
              label="Drink to (year)"
              className={classes.textField}
              type="number"
              inputProps={yearInputProps}
            />
            <TextField
              label="Price paid"
              className={classes.textField}
              type="number"
              inputProps={currencyInputProps}
            />
            <TextField label="Rating" className={classes.textField} />
            <TextField label="Bottle size" className={classes.textField} />
            <TextField label="Notes" multiline className={classes.notesField} />
          </div>
          <div>
            <Title subtitle className={classes.formGroupTitle}>
              Location in cellar
            </Title>
          </div>
        </form>
      </Tile>
    </Page>
  );
};

export default AddWine;

// short? Vintage
// string Winename
// float? Percentalcohol
// decimal? Pricepaid
// short? Yearbought
// short? Bottlesize
// string Notes
// short? Rating
// short? Drinkrangefrom
// short? Drinkrangeto

// Region Region
// Vineyard Vineyard
// Winetype Winetype

// ICollection<Location> Locations
// Box No
// Qty
