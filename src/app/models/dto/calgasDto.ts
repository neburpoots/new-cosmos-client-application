import { Gas } from "../entities/gas";

export interface CalgasDto {
    id?: number;
    concentration: number | null;
    engineering_units: string;
    gas: Gas | null;
    cdartikel: string;
}