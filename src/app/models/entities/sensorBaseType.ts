import { Principle } from "./principle";

interface SensorBaseType {
    id: number;
    prefix: string;
    suffix: string;
    series: string;
    created: Date;
    modified: Date;
    maintenance_interval_months: number;
    quotation_interval_months: number;
    replacement_interval_months: number;
    volume: number;
    principle: Principle;
    // Add properties for relationships if applicable, e.g., principle, owner
  }
  
  export default SensorBaseType;
  