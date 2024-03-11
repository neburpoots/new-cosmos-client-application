import { CDArtikel } from "./cdArtikel";

interface AssemblyType {
  id: number;
  name: string;
  created: Date;
  modified?: Date;
  cdartikel?: CDArtikel;
}

export default AssemblyType;