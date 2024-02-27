import { User } from "./user";

interface DetectorType {
  id: number;
  obsolete: boolean;
  prefix?: string | null;
  code?: string | null;
  suffix?: string | null;
  sensor_count?: number | null;
  created?: Date | null;
  modified?: Date | null;
  owner?: User | null;
}

export default DetectorType;
