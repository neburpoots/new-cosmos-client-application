import AssemblyType from "../entities/assemblyType";

export interface AssemblyDto {
    id?: number,
    code: string,
    start_serial_number: number,
    assemblyType: AssemblyType,
    quantity: number,
}