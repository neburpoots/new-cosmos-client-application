import { AssemblyMultiversLine } from "./assemblyMultiversLine";
import { CDArtikel } from "./cdArtikel";


export interface AssemblyMultivers {

  assemblage_order: string;
  order_datum: Date;
  cdartikel?: CDArtikel;
  cdmagazijn: string;
  aantal: number;
  commentaar: string;
  assemblage_datum: Date;
  aantal_geassembleerd: number;
  waarde_geassembleerd: number;
  afdruk_assemblage_bon: string;
  status: string;
  guid_item: string;
  sys_create: string;
  sys_update: string;
  aantalgereservbij: number;
  assemblyMultiversLines?: AssemblyMultiversLine[];
}
