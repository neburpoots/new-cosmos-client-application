export interface SensorTypeIndex {
    id: number;
    sensor_type_cdartikel: string;
    code: string;
    created_date: string;
    model?: string;
    flow_rate?: number;
    cal_response?: string;
    cal_flow_rate?: number;
    restrictor?: string;
    battery?: string;
    membrane_seal?: string;
    silicone_sheet?: string;
    sensor_type_artikel_omschr?: string;
    prefix?: string;
    suffix?: string;
    principle_name?: string;
    high_eu?: number;
    engineering_units?: string;
    target?: string;
    electrolyte_name?: string;
    electrolyte_cdartikel?: string;
    membrane_name?: string;
    membrane_cdartikel?: string;
    o_ring_name?: string;
    o_ring_cdartikel?: string;
    pyrolyser_name?: string;
    pyrolyser_cdartikel?: string;
    filter_name?: string;
    filter_cdartikel?: string;
    cal_gas_name?: string;
    cal_gas_concentration?: number;
    cal_engineering_units?: string;
    maintenance_interval_months?: number;
    replacement_interval_months?: number;
  }
  