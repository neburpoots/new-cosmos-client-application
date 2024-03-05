import { Principle } from "../entities/principle";

export interface SensorBaseTypeDto {
    id?: number;
    prefix: string;
    suffix: string;
    series: string;
    maintenance_interval_months: number | null;
    quotation_interval_months: number | null;
    replacement_interval_months: number | null;
    volume: number | null;
    principle: Principle | null;
    principle_id: number | null;
}