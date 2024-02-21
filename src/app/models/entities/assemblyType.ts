import { Stock } from "./stock";

interface AssemblyType {
  id: number;
  name: string;
  created: Date;
  modified?: Date;
  stock?: Stock;

}

export default AssemblyType;