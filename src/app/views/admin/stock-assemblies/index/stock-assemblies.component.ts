import { Component, OnInit, ViewChild } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { TableField } from "../../../../models/utils/tableField";

import { ToastrService } from "ngx-toastr";
import { ActivatedRoute, Router } from "@angular/router";
import { AllAreaEntitiesGQL, AllArtikelAssemblyIndicesGQL, AllArtikelIndex2GQL, AllStockSuppliersGQL, AreaEntitiesOrderBy, AreaEntity, ArtikelAssemblyIndex, ArtikelAssemblyIndicesOrderBy, ArtikelIndex2, ArtikelIndex2SOrderBy, DeleteAreaGQL, QueryAllAreaEntitiesArgs, QueryAllArtikelAssemblyIndicesArgs, QueryAllArtikelIndex2SArgs, QueryAllStockSuppliersIndicesArgs, StockSupplier, StockSupplierByIdGQL, StockSuppliersIndex, StockSuppliersIndicesOrderBy } from "../../../../../generated/graphql";
import { SearchFilters } from "../../../../models/utils/searchFilters";
import { BaseEntity } from "../../base/base-entity.component";
import { Observable } from "rxjs";
import { TableHead } from "../../../../models/utils/tableHead";
import { FileService } from "../../../../services/file/file.service";
import { AuthService } from "../../../../services/authentication/auth.service";
import { filterInput } from "../../../../models/filters/filterBuilder";

@Component({
  selector: "app-stock-assemblies",
  templateUrl: "./stock-assemblies.component.html",
})

export class StockAssembliesComponent extends BaseEntity<ArtikelAssemblyIndex> {



  objectSingle = 'Stock Assembly';
  objectPlural = 'Stock Assemblies';

  // override pdfPrefix = "api/stock-suppliers/pdf";

  searchCriteria: QueryAllArtikelAssemblyIndicesArgs = {
    orderBy: [ArtikelAssemblyIndicesOrderBy.CdartikelAsc],
    first: 10,
    offset: 0,
    filter: {
      and: [
        {
          or: [
              {
                  assemblageArtikel: { includesInsensitive: "J"},
              }
          ]
      },

      {
        advice: { greaterThan: 0 }
      }
      ]
    },
  }

  //this is inherited by the table to allow for a standard filtering on warehouse C
  //This needs to match with the filters specified above
  staticFilters: filterInput[] = [
    {
      column: "assemblageArtikel",
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
      value: "J",
      range: []
    },
    {
      column: "advice",
      filterTypes: [
        { label: 'Exact match', id: 4, keyWord: 'equalTo' },
        { label: 'Greater than', id: 5, keyWord: 'greaterThan' },
        { label: 'Smaller than', id: 6, keyWord: 'lessThan' },
        { label: 'Range of items', id: 7, keyWord: 'inExpansive' },
      ],
      id: 1,
      selectedFilterType:  { label: 'Greater than', id: 5, keyWord: 'greaterThan' },
      value: "0",
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
  Key = 'allArtikelAssemblyIndices';

  baseOrderBy = ArtikelAssemblyIndicesOrderBy.CdartikelAsc;

  constructor(protected override toastr: ToastrService, protected override route: ActivatedRoute, protected override http: HttpClient,
    private artikelAssemblyService: AllArtikelAssemblyIndicesGQL,
    private stockSupplier: StockSupplierByIdGQL,
    protected override router: Router,
    protected override fileService: FileService,
    protected override authService: AuthService
  ) {
    super(authService, fileService, router, toastr, route, http, artikelAssemblyService, null);

    this.checkQueryParams();

    this.loadData(this.searchCriteria);
  }

  tableHeaders: TableHead<ArtikelAssemblyIndicesOrderBy>[] = [
    { type: 'string', key: 'cdartikel', label: "Part", asc: ArtikelAssemblyIndicesOrderBy.CdartikelAsc, desc: ArtikelAssemblyIndicesOrderBy.CdartikelDesc },
    { type: 'string', key: 'omschr', label: "Description", asc: ArtikelAssemblyIndicesOrderBy.OmschrAsc, desc: ArtikelAssemblyIndicesOrderBy.OmschrDesc },
    { type: 'number', round: 0, key: 'voorraad', label: "Stock", asc: ArtikelAssemblyIndicesOrderBy.VoorraadAsc, desc: ArtikelAssemblyIndicesOrderBy.VoorraadDesc },
    { type: 'number', round: 0, key: 'gereserveerd', label: "Res. SO", asc: ArtikelAssemblyIndicesOrderBy.GereserveerdAsc, desc: ArtikelAssemblyIndicesOrderBy.GereserveerdDesc },
    { type: 'number', round: 0, key: 'vrij', label: "Res. AO", asc: ArtikelAssemblyIndicesOrderBy.VrijAsc, desc: ArtikelAssemblyIndicesOrderBy.VrijDesc },
    { type: 'number', round: 0, key: 'assemblbij', label: "Res. CMP", asc: ArtikelAssemblyIndicesOrderBy.AssemblbijAsc, desc: ArtikelAssemblyIndicesOrderBy.AssemblbijDesc },
    { type: 'number', round: 0, key: 'minvoorraad', label: "Min", asc: ArtikelAssemblyIndicesOrderBy.MinvoorraadAsc, desc: ArtikelAssemblyIndicesOrderBy.MinvoorraadDesc },
    { type: 'number', round: 0, key: 'maxvoorraad', label: "Max", asc: ArtikelAssemblyIndicesOrderBy.MaxvoorraadAsc, desc: ArtikelAssemblyIndicesOrderBy.MaxvoorraadDesc },
    { type: 'number', round: 0, key: 'verrekenprijs', label: "VVP", asc: ArtikelAssemblyIndicesOrderBy.VerrekenprijsAsc, desc: ArtikelAssemblyIndicesOrderBy.VerrekenprijsDesc },
    { type: 'number', round: 0, key: 'advice', label: "Advice", asc: ArtikelAssemblyIndicesOrderBy.AdviceAsc, desc: ArtikelAssemblyIndicesOrderBy.AdviceDesc },
  ]


  mapTableData(artikelIndices: ArtikelAssemblyIndex[]): any[] {
    console.log(artikelIndices)
    return artikelIndices.map((artikelAssembly: ArtikelAssemblyIndex) => {
      return {
        id: { url: null, value: artikelAssembly.cdartikel } as TableField,
        cdartikel: { url: null, value: artikelAssembly?.cdartikel } as TableField,
        omschr: { url: null, value: artikelAssembly?.omschr } as TableField,
        voorraad: { url: null, value: artikelAssembly?.voorraad } as TableField,
        gereserveerd: { url: null, value: artikelAssembly?.gereserveerd } as TableField,
        vrij: { url: null, value: artikelAssembly?.vrij } as TableField,
        assemblbij: { url: null, value: artikelAssembly?.assemblbij } as TableField,
        minvoorraad: { url: null, value: artikelAssembly?.minvoorraad } as TableField,
        maxvoorraad: { url: null, value: artikelAssembly?.maxvoorraad } as TableField,
        verrekenprijs: { url: null, value: artikelAssembly?.verrekenprijs } as TableField,
        advice: { url: null, value: artikelAssembly?.advice } as TableField,
      };
    });
  }


}
