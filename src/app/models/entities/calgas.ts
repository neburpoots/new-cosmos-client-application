import { Gas } from "./gas";
import { User } from "./user";

export interface CalGas {
    id: number;

    gas?: Gas;

    concentration?: number;

    engineering_units?: string;

    created: Date;

    modified?: Date | null;

    owner?: User | null;

    cdartikel?: string;
}