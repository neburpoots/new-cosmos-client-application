import DetectorType from "../entities/detectorType";

export interface DetectorDto {
    id?: number;
    invoiceAssignment: string;
    detectorType: DetectorType | null;
    serial_number: string;
    label_date: Date
    remark: string;
}