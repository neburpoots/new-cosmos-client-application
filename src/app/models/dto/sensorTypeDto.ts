export interface SensorTypeDto {
    id?: number | null;
    sensor_base_type?: number | null;
    code?: string | null;
    model?: string | null;
    range?: number | null;
    flow_rate?: string | null;
    calgas?: number | null;
    flow_rate_cal?: string | null;
    electrolyte?: number | null;
    membrane?: number | null;
    o_ring?: number | null;
    silicone_sheet?: boolean | null;
    pyrolyser?: number | null;
    pyrolyser_voltage?: string | null;
    filter?: number | null;
    restrictor?: boolean | null;
    battery?: boolean | null;
    membrane_seal?: boolean | null;
    element_count?: string | null;
    maintenance_interval_months?: string | null;
    replacement_interval_months?: string | null;
    part?: string | null;
    volume?: string | null;
}