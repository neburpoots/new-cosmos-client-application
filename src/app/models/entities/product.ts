
export interface Product {
    cdartikel: string;
  
    zoeknaam?: string;
  
    omschr?: string;
  
    soort?: string;
  
    cdartgroep?: string;
  
    cdgrbrekening?: string;
  
    prijsper?: number;
  
    aantaldec?: number;
  
    prijsincl?: number;
  
    prijsexcl?: number;
  
    verrekenprijs?: number;
  
    voorraad?: number;
  
    minvoorraad?: number;
  
    maxvoorraad?: number;
  
    eenheid?: string;
  
    btwcode?: number;
  
    cdartkortgrp?: string;
  
    cdgoedcode?: number;
  
    gewicht?: number;
  
    aanveenh?: number;
  
    inkvolgnr?: number;
  
    uitloop?: string;
  
    aanmaakdatum?: Date;
  
    opweb?: string;
  
    magbon?: string;
  
    pakbon?: string;
  
    factuur?: string;
  
    cdgrbrekkort?: string;
  
    datumltstewijz?: Date;
  
    cdgrbrekdekking?: string;
  
    proj_opslag?: number;
  
    proj_mutsoort?: string;
  
    eannummer?: string;
  
    afdruk_sam_op_offerte?: string;
  
    sam_versie?: string;
  
    assemblage_artikel?: string;
  
    marge_perc?: number;
  
    guid_item?: string;
  
    sys_create?: string;
  
    sys_update?: string;
  
    vvbestand?: string;
  
    vvgroep?: string;
  
    vvvrijvelda?: string;
  
    vvvrijveldb?: string;
  
    cdland_oorspr?: string;
  }