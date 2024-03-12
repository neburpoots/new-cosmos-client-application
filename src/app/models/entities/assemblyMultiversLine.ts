import { CDArtikel } from "./cdArtikel";

export interface AssemblyMultiversLine {
  assemblageOrder: string;
  cdartikel?: CDArtikel;
  assemblageDatum?: Date;
  cdmagazijn?: string;
  aantalNorm?: number;
  aantalGebruikt?: number;
  waardeGebruikt?: number;
  aantalSamenstelling?: number;
  aantalgereservaf?: number;
}
