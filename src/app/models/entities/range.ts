import { Gas } from "./gas";

export interface Range {
    id: number;
    gas?: Gas;
    low_eu?: number;
    high_eu?: number;
    engineering_units: string;
    alarm_1_level?: number;
    alarm_2_level?: number;
    warning_1_level?: number;
    warning_2_level?: number;
    alarm_1_direction_up?: boolean;
    alarm_2_direction_up?: boolean;
    alarm_units?: boolean;
    precision?: number;
    created?: Date;
    modified?: Date;
    owner_id?: number;
    high_eu_numeric?: number;
    high_eu_backup?: number;
}
