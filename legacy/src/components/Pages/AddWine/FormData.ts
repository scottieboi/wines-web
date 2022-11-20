import { OptionType } from "./AutocompleteControl";

export interface Location {
  boxno: number | "";
  qty: number | "";
}

export interface FormData {
  wineName: string;
  notes: string;
  vintage: number | "";
  yearBought: number | "";
  drinkFrom: number | "";
  drinkTo: number | "";
  pricePaid: string;
  rating: number | "";
  percentAlcohol: string;
  bottleSize: number | "";
  wineType: OptionType | null;
  vineyard: OptionType | null;
  region: OptionType | null;
  locations: Location[];
}
