import { Creditor } from "./creditor";

export interface PurchasingData {
    cdartikel: string;
    inkvolgnr: number;
    creditor: Creditor;
    voorkeur: string;
    bestcode?: string | null;
    cdvaluta?: string | null;
    inkoopprijs: number;
    kortingperc: number;
    besthoeveelheid: number;
    opslpercinkoop: number;
  }
  