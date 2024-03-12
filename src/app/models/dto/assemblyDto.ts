import AssemblyType from "../entities/assemblyType";

export interface AssemblyDto {
    id?: number,
    code: string,
    start_serial_number: number | string,
    assemblyType: AssemblyType | null,
    quantity: number | string,
}