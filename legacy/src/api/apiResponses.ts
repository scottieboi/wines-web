export interface Token {
  token: string;
}

export interface AllWinesResponse {
  id: number;
  wineName: string;
  wineType: string;
  vineyard: string;
  vintage: number;
  qty: number;
}

export interface FindWineRespone {
  id: number;
  wineName: string;
  wineType: string;
  vineyard: string;
  vintage: number;
  boxes: { [key: string]: number }[];
}

export interface FindVineyardResponse {
  id: number;
  vineyard: string;
}

export interface FindWineTypeResponse {
  wineType: string;
  id: number;
}

export interface FindRegionResponse {
  id: number;
  region: string;
}
