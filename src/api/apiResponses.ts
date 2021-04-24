export type Token = {
  token: string;
};

export type AllWinesResponse = {
  id: number;
  wineName: string;
  wineType: string;
  vineyard: string;
  vintage: number;
  qty: number;
};

export type FindWineRespone = {
  id: number;
  wineName: string;
  wineType: string;
  vineyard: string;
  vintage: number;
  boxes: { [key: string]: number }[];
};

export type FindVineyardResponse = {
  id: number;
  vineyard: string;
};
