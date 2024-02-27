import { User } from "./user";

export interface Gas {
    id: number;

    name?: string;

    formula?: string;

    created: Date;

    modified?: Date | null;

    owner?: User | null;

    chemical_compound_id?: number;
}