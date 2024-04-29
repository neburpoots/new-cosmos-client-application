import { Component, OnInit, ViewChild } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { TableField } from "../../../../models/utils/tableField";

import { ToastrService } from "ngx-toastr";
import { ActivatedRoute, Router } from "@angular/router";
import { AllAreaEntitiesGQL, AllStockSuppliersGQL, AreaEntitiesOrderBy, AreaEntity, DeleteAreaGQL, QueryAllAreaEntitiesArgs, QueryAllStockSuppliersIndicesArgs, StockSupplier, StockSuppliersIndex, StockSuppliersIndicesOrderBy } from "../../../../../generated/graphql";
import { SearchFilters } from "../../../../models/utils/searchFilters";
import { BaseEntity } from "../../base/base-entity.component";
import { Observable } from "rxjs";
import { TableHead } from "../../../../models/utils/tableHead";
import { FileService } from "../../../../services/file/file.service";
import { AuthService } from "../../../../services/authentication/auth.service";
import { StockSuppliersFormComponent } from "../form/stock-suppliers-form.component";

@Component({
  selector: "app-stock-suppliers",
  templateUrl: "./stock-suppliers.component.html",
})

export class StockSuppliersComponent extends BaseEntity<StockSuppliersIndex> {


  @ViewChild('editModal') childComponent!: StockSuppliersFormComponent;

  objectSingle = 'Stock Supplier';
  objectPlural = 'Stock Suppliers';

  searchCriteria: QueryAllStockSuppliersIndicesArgs = {
    orderBy: [StockSuppliersIndicesOrderBy.IdDesc],
    first: 10,
    offset: 0,
    filter: {
      and: [

      ]
    },
  }


  override setEditData() {
    console.log(this.editData)
    this.childComponent.setEditData(this.editData);
  }

  get editData(): any {
    console.log(this.selectedItem)
    return {
      id: this.selectedItem?.id,
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
  Key = 'allStockSuppliersIndices';

  baseOrderBy = StockSuppliersIndicesOrderBy.IdDesc;

  constructor(protected override toastr: ToastrService, protected override route: ActivatedRoute, protected override http: HttpClient,
    private stockSuppliers: AllStockSuppliersGQL,
    protected override router: Router,
    protected override fileService: FileService,
    protected override authService: AuthService
  ) {
    super(authService, fileService, router, toastr, route, http, stockSuppliers, null);

    this.checkQueryParams();

    this.loadData(this.searchCriteria);
  }

  tableHeaders: TableHead<StockSuppliersIndicesOrderBy>[] = [
    { type: 'string', key: 'cdcrediteur', label: "Code", asc: StockSuppliersIndicesOrderBy.CdcrediteurAsc, desc: StockSuppliersIndicesOrderBy.CdcrediteurDesc },
    { type: 'string', key: 'zoeknaam', label: "Zoeknaam", asc: StockSuppliersIndicesOrderBy.ZoeknaamAsc, desc: StockSuppliersIndicesOrderBy.ZoeknaamDesc },
    { type: 'number', key: 'totalStockVvp', label: "Stock VVP", asc: StockSuppliersIndicesOrderBy.TotalStockVvpAsc, desc: StockSuppliersIndicesOrderBy.TotalStockVvpDesc },
    { type: 'number', round: 2, key: 'totalReservedVvp', label: "Res. VVP", asc: StockSuppliersIndicesOrderBy.TotalReservedVvpAsc, desc: StockSuppliersIndicesOrderBy.TotalReservedVvpDesc },
    { type: 'number', key: 'totalPoVvp', label: "PO VVP", asc: StockSuppliersIndicesOrderBy.TotalPoVvpAsc, desc: StockSuppliersIndicesOrderBy.TotalPoVvpDesc },
    { type: 'number', key: 'totalAdvice', label: "PO ADVICE", asc: StockSuppliersIndicesOrderBy.TotalAdviceAsc, desc: StockSuppliersIndicesOrderBy.TotalAdviceDesc },
    { type: 'number', key: 'tztAdvice', label: "TZT ADVICE", asc: StockSuppliersIndicesOrderBy.TztAdviceAsc, desc: StockSuppliersIndicesOrderBy.TztAdviceDesc },
  ]


  mapTableData(stockSuppliers: StockSuppliersIndex[]): any[] {
    console.log(stockSuppliers)
    return stockSuppliers.map((stockSupplier: StockSuppliersIndex) => {
      return {
        id: { url: null, value: stockSupplier.id } as TableField,
        cdcrediteur: { url: null, value: stockSupplier?.cdcrediteur } as TableField,
        zoeknaam: { url: null, value: stockSupplier?.zoeknaam } as TableField,
        totalStockVvp: { url: null, value: stockSupplier?.totalStockVvp } as TableField,
        totalReservedVvp: { url: null, value: stockSupplier?.totalReservedVvp } as TableField,
        totalPoVvp: { url: null, value: stockSupplier?.totalPoVvp } as TableField,
        totalAdvice: { url: null, value: stockSupplier?.totalAdvice } as TableField,
        tztAdvice: { url: null, value: stockSupplier?.tztAdvice } as TableField,
      };
    });
  }


}
