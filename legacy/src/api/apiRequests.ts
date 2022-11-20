interface Location {
  boxNo: number;
  qty: number;
}

export interface SaveWineRequest {
  wineName: string;
  vineyard: string;
  vineyardId?: number;
  wineType: string;
  wineTypeId?: number;
  region: string;
  regionId?: number;
  vintage: number;
  yearBought?: number;
  drinkFrom?: number;
  drinkTo?: number;
  pricePaid?: number;
  rating?: number;
  percentAlcohol?: number;
  bottleSize?: number;
  notes?: string;
  locations: Location[];
}
