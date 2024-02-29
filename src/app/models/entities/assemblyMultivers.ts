import ProductDescription from "./productDescription";


interface AssemblyMultivers {
    assemblage_order: string;
    cdartikel: string;
    order_datum: string;
    cdmagazijn: string;
    aantal: string;
    commentaar: null | string;
    assemblage_datum: string;
    aantal_geassembleerd: string;
    waarde_geassembleerd: string;
    afdruk_assemblage_bon: string;
    status: string;
    guid_item: null | string;
    sys_create: null | string;
    sys_update: null | string;
    aantalgereservbij: string;
    cdtaal: string;
    omschr: string;
    eenheid: string;
    minvoorraad: string;
    maxvoorraad: string;
    gereserveerd: string;
    voorraad: string;
}

export default AssemblyMultivers;
