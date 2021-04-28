import { OptionType } from "./AutocompleteControl";
import { Location } from "./LocationControl";

export interface FormData {
  wineName: string;
  notes: string;
  vintage: number | "";
  yearBought: number | "";
  drinkFrom: number | "";
  drinkTo: number | "";
  pricePaid: string;
  rating: number | "";
  bottleSize: number | "";
  wineType: OptionType | null;
  vineyard: OptionType | null;
  region: OptionType | null;
  locations: Location[];
}
