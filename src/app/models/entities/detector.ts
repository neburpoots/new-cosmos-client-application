import DetectorType from "./detectorType";
import { User } from "./user";

export interface Detector {
  id: number;
  detector_type_id: number;
  detectorType: DetectorType;
  serial_number: string;
  label_date?: Date;
  remarks?: string;
  created: Date;
  owner_id: number;
  owner?: User;
  modified?: Date;
}
