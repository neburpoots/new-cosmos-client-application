import AssemblyType from "./assemblyType";

export interface Assembly {
    id: number;
    code: string;
    assemblyType: AssemblyType;
    start_serial_number: number;
    checked: boolean;
    quantity: number;
    po: string;
    created: Date;
}