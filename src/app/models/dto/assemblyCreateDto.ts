import AssemblyType from "../entities/assemblyType";

export interface AssemblyCreateDto {
    batch: string,
    start_serial_number: number,
    assemblyType: AssemblyType,
    quantity: '',
}