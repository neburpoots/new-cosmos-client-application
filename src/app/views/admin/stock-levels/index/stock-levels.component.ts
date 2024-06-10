import { Component, OnInit, ViewChild } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { TableField } from "../../../../models/utils/tableField";

import { ToastrService } from "ngx-toastr";
import { ActivatedRoute, Router } from "@angular/router";
import { AllAreaEntitiesGQL, AllArtikelIndex2GQL, AllStockSuppliersGQL, AreaEntitiesOrderBy, AreaEntity, ArtikelIndex2, ArtikelIndex2SOrderBy, DeleteAreaGQL, QueryAllAreaEntitiesArgs, QueryAllArtikelIndex2SArgs, QueryAllStockSuppliersIndicesArgs, StockSupplier, StockSupplierByIdGQL, StockSuppliersIndex, StockSuppliersIndicesOrderBy } from "../../../../../generated/graphql";
import { SearchFilters } from "../../../../models/utils/searchFilters";
import { BaseEntity } from "../../base/base-entity.component";
import { Observable } from "rxjs";
import { TableHead } from "../../../../models/utils/tableHead";
import { FileService } from "../../../../services/file/file.service";
import { AuthService } from "../../../../services/authentication/auth.service";
import { filterInput } from "../../../../models/filters/filterBuilder";

@Component({
  selector: "app-stock-levels",
  templateUrl: "./stock-levels.component.html",
})

export class StockLevelsComponent extends BaseEntity<ArtikelIndex2> {



  objectSingle = 'Stock Level';
  objectPlural = 'Stock Levels';

  override pdfPrefix = "api/stock-suppliers/pdf";

  searchCriteria: QueryAllArtikelIndex2SArgs = {
    orderBy: [ArtikelIndex2SOrderBy.CdartikelAsc],
    first: 10,
    offset: 0,
    filter: {
      and: [
        {
          cdmagazijn: {
            includesInsensitive: 'C'
          }
        }
      ]
    },
  }

  //this is inherited by the table to allow for a standard filtering on warehouse C
  //This needs to match with the 
  staticFilters: filterInput[] = [
    {
      column: "cdmagazijn",
      filterTypes: [
        {
          label: "Exact match",
          id: 1,
          keyWord: "equalTo"
        },
        {
          label: "Contains",
          id: 2,
          keyWord: "includesInsensitive"
        },
        {
          label: "Range of items",
          id: 3,
          keyWord: "inExpansive"
        }
      ],
      id: 1,
      selectedFilterType: {
        label: "Contains",
        id: 2,
        keyWord: "includesInsensitive"
      },
      value: "C",
      range: []
    }
  ]



  get editData(): any {
    console.log(this.selectedItem)
    return {
      id: this.selectedItem?.cdartikel,
      // name: this.selectedItem?.name,
      // endUser: this.selectedItem?.endUserId,
      // building: this.selectedItem?.buildingId,
      // floor: this.selectedItem?.floorId,
      // remarks: this.selectedItem?.remarks,
    };
  }

  //IMPORTANT THIS IS THE NAME OF THE OBJECT IN DATA: {allGases: {nodes: []}}
  //json return object for getter
  //This is the object name of the nodes: return
  //check the get all method and see what it returns and set to this object
  Key = 'allArtikelIndex2S';

  baseOrderBy = ArtikelIndex2SOrderBy.CdartikelAsc;

  constructor(protected override toastr: ToastrService, protected override route: ActivatedRoute, protected override http: HttpClient,
    private artikelIndex2: AllArtikelIndex2GQL,
    private stockSupplier: StockSupplierByIdGQL,
    protected override router: Router,
    protected override fileService: FileService,
    protected override authService: AuthService
  ) {
    super(authService, fileService, router, toastr, route, http, artikelIndex2, null);

    this.checkQueryParams();

    this.loadData(this.searchCriteria);
  }

  tableHeaders: TableHead<ArtikelIndex2SOrderBy>[] = [
    { type: 'string', key: 'cdartikel', label: "Code", asc: ArtikelIndex2SOrderBy.CdcrediteurAsc, desc: ArtikelIndex2SOrderBy.CdcrediteurDesc },
    { type: 'string', key: 'omschr', label: "Description", asc: ArtikelIndex2SOrderBy.OmschrAsc, desc: ArtikelIndex2SOrderBy.OmschrDesc },
    { type: 'string', key: 'locatie', label: "Locatie", asc: ArtikelIndex2SOrderBy.LocatieAsc, desc: ArtikelIndex2SOrderBy.LocatieAsc },
    { type: 'string', key: 'samenstelling', label: "C.", asc: ArtikelIndex2SOrderBy.SamenstellingAsc, desc: ArtikelIndex2SOrderBy.SamenstellingDesc },
    { type: 'number', round: 0, key: 'minvoorraad', label: "Min.", asc: ArtikelIndex2SOrderBy.MinvoorraadAsc, desc: ArtikelIndex2SOrderBy.MinvoorraadDesc },
    { type: 'number', round: 0, key: 'maxvoorraad', label: "Min.", asc: ArtikelIndex2SOrderBy.MaxvoorraadAsc, desc: ArtikelIndex2SOrderBy.MaxvoorraadDesc },
    { type: 'number', round: 0, key: 'inkopen', label: "PO", asc: ArtikelIndex2SOrderBy.InkopenAsc, desc: ArtikelIndex2SOrderBy.InkopenDesc },
    { type: 'number', round: 0, key: 'assemblbij', label: "AO", asc: ArtikelIndex2SOrderBy.AssemblbijAsc, desc: ArtikelIndex2SOrderBy.AssemblafDesc },
    { type: 'number', round: 0, key: 'voorraadGereserveerd2', label: "Res. S.", asc: ArtikelIndex2SOrderBy.VoorraadGereserveerd2Asc, desc: ArtikelIndex2SOrderBy.VoorraadGereserveerd2Desc },
    { type: 'number', round: 0, key: 'assemblaf', label: "Res. A.", asc: ArtikelIndex2SOrderBy.AssemblafAsc, desc: ArtikelIndex2SOrderBy.AssemblafDesc },
    { type: 'number', round: 0, key: 'voorraad', label: "Stock", asc: ArtikelIndex2SOrderBy.VoorraadAsc, desc: ArtikelIndex2SOrderBy.VoorraadDesc },
    { type: 'number', round: 0, key: 'voorraadVrij', label: "Available", asc: ArtikelIndex2SOrderBy.VoorraadVrijAsc, desc: ArtikelIndex2SOrderBy.VoorraadVrijDesc },
    { type: 'number', round: 0, key: 'virtualStock', label: "V. Available", asc: ArtikelIndex2SOrderBy.VirtualStockAsc, desc: ArtikelIndex2SOrderBy.VirtualStockDesc },
    { type: 'string', key: 'cdmagazijn', label: "WH", asc: ArtikelIndex2SOrderBy.CdmagazijnAsc, desc: ArtikelIndex2SOrderBy.CdmagazijnDesc },
    { type: 'number', round: 2, key: 'verrekenprijs', label: "VVP", asc: ArtikelIndex2SOrderBy.VerrekenprijsAsc, desc: ArtikelIndex2SOrderBy.VerrekenprijsDesc },
    { type: 'number', key: 'status', label: "Offset", asc: ArtikelIndex2SOrderBy.StatusAsc, desc: ArtikelIndex2SOrderBy.StatusDesc },

  ]


  mapTableData(artikelIndices: ArtikelIndex2[]): any[] {
    console.log(artikelIndices)
    return artikelIndices.map((artikelIndex2: ArtikelIndex2) => {
      return {
        id: { url: null, value: artikelIndex2.cdartikel } as TableField,
        cdartikel: { url: null, value: artikelIndex2?.cdartikel } as TableField,
        omschr: { url: null, value: artikelIndex2?.omschr } as TableField,
        locatie: { url: null, value: artikelIndex2?.locatie } as TableField,
        samenstelling: { url: null, value: artikelIndex2?.samenstelling } as TableField,
        minvoorraad: { url: null, value: artikelIndex2?.minvoorraad } as TableField,
        maxvoorraad: { url: null, value: artikelIndex2?.maxvoorraad } as TableField,
        inkopen: { url: null, value: artikelIndex2?.inkopen } as TableField,
        assemblbij: { url: null, value: artikelIndex2?.assemblbij } as TableField,
        voorraadGereserveerd2: { url: null, value: artikelIndex2?.voorraadGereserveerd2 } as TableField,
        assemblaf: { url: null, value: artikelIndex2?.assemblaf } as TableField,
        voorraad: { url: null, value: artikelIndex2?.voorraad } as TableField,
        voorraadVrij: { url: null, value: artikelIndex2?.voorraadVrij } as TableField,
        virtualStock: { url: null, value: artikelIndex2?.virtualStock } as TableField,
        cdmagazijn: { url: null, value: artikelIndex2?.cdmagazijn } as TableField,
        verrekenprijs: { url: null, value: artikelIndex2?.verrekenprijs } as TableField,
        status: { url: null, value: artikelIndex2?.status } as TableField,
      };
    });
  }


}
