export interface Stock {
    cdartikel: string;
    cdmagazijn: string;
    locatie?: string;
    minvoorraad?: number;
    maxvoorraad?: number;
    voorraad?: number;
    leveren?: number;
    geleverd?: number;
    besteld?: number;
    inkopen?: number;
    gereserveerd?: number;
    assemblbij?: number;
    assemblaf?: number;
  }
  
  