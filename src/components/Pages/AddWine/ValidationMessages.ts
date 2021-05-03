export interface LocationValidationMessages {
  boxno?: string;
  qty?: string;
}

export interface ValidationMessages {
  wineName?: string;
  vineyard?: string;
  wineType?: string;
  region?: string;
  vintage?: string;
  locations?: Record<number, LocationValidationMessages>;
}
