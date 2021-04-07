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
