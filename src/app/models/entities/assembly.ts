import AssemblyType from "./assemblyType";

export interface Assembly {
    id: number;
    code: string;
    assemblyType: AssemblyType;
    startSerialNumber: number;
    checked: boolean;
    quantity: number;
    po: string;
    created: Date;
}