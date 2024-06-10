import { Component, OnInit, ViewChild } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { TableField } from "../../../../models/utils/tableField";

import { ToastrService } from "ngx-toastr";
import { ActivatedRoute, Router } from "@angular/router";
import { AllAreaEntitiesGQL, AllStockSuppliersGQL, AreaEntitiesOrderBy, AreaEntity, DeleteAreaGQL, QueryAllAreaEntitiesArgs, QueryAllStockSuppliersIndicesArgs, StockSupplier, StockSupplierByIdGQL, StockSuppliersIndex, StockSuppliersIndicesOrderBy } from "../../../../../generated/graphql";
import { SearchFilters } from "../../../../models/utils/searchFilters";
import { BaseEntity } from "../../base/base-entity.component";
import { Observable } from "rxjs";
import { TableHead } from "../../../../models/utils/tableHead";
import { FileService } from "../../../../services/file/file.service";
import { AuthService } from "../../../../services/authentication/auth.service";
import { StockSuppliersFormComponent } from "../form/stock-suppliers-form.component";
import { filterInput } from "../../../../models/filters/filterBuilder";

@Component({
  selector: "app-stock-suppliers",
  templateUrl: "./stock-suppliers.component.html",
})

export class StockSuppliersComponent extends BaseEntity<StockSuppliersIndex> {


  @ViewChild('editModal') childComponent!: StockSuppliersFormComponent;

  objectSingle = 'Stock Supplier';
  objectPlural = 'Stock Suppliers';

  override pdfPrefix = "api/stock-suppliers/pdf";

  searchCriteria: QueryAllStockSuppliersIndicesArgs = {
    orderBy: [StockSuppliersIndicesOrderBy.TotalAdviceDesc],
    first: 10,
    offset: 0,
    filter: {
      and: [
        {
          totalAdvice: {
            greaterThan: 0
          }
        }
      ]
    },
  }


  staticFilters: filterInput[] = [
    {
      column: "totalAdvice",
      filterTypes: [
        {
          label: "Exact match",
          id: 4,
          keyWord: "equalTo"
        },
        {
          label: "Greater than",
          id: 5,
          keyWord: "greaterThan"
        },
        {
          label: "Smaller than",
          id: 6,
          keyWord: "lessThan"
        },
        {
          label: "Range of items",
          id: 7,
          keyWord: "inExpansive"
        }
      ],
      id: 1,
      selectedFilterType: {
        label: "Greater than",
        id: 5,
        keyWord: "greaterThan"
      },
      value: "0",
      range: []
    }
  ]


  override async loadDetailData(id: number): Promise<any> {
    try {

      await this.stockSupplier.fetch({ id }, { fetchPolicy: 'no-cache' }).subscribe(result => {
        this.retrieveFile(id, result?.data?.stockSupplierById as StockSupplier || null);
      });

    } catch (error) {
      this.toastr.error(`Error fetching ${this.objectPluralLowerCase}`, 'Error');
    }
  }

  override async downloadPdf(id: number): Promise<void> {
    const data = await this.loadDetailData(id);
  }

  async retrieveFile(id: number, body: any) {
    this.fileService.downloadPdfWithBody(this.pdfPrefix, id, body).subscribe((data: Blob) => {
      // Create a Blob URL for the downloaded file
      const file = new Blob([data], { type: 'application/pdf' }); // Adjust the MIME type accordingly
      const fileUrl = URL.createObjectURL(file);

      // Create a download link and trigger a click event to download the file
      const link = document.createElement('a');
      link.href = fileUrl;
      link.download = `purchase_advice_${body?.crediteur?.zoeknaam}_${id}.pdf`; // Specify the desired file name
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
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
    private stockSupplier: StockSupplierByIdGQL,
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
    { type: 'number', round: 2, key: 'totalStockVvp', label: "Stock VVP", asc: StockSuppliersIndicesOrderBy.TotalStockVvpAsc, desc: StockSuppliersIndicesOrderBy.TotalStockVvpDesc },
    { type: 'number', round: 2, key: 'totalReservedVvp', label: "Res. VVP", asc: StockSuppliersIndicesOrderBy.TotalReservedVvpAsc, desc: StockSuppliersIndicesOrderBy.TotalReservedVvpDesc },
    { type: 'number', round: 2, key: 'totalPoVvp', label: "PO VVP", asc: StockSuppliersIndicesOrderBy.TotalPoVvpAsc, desc: StockSuppliersIndicesOrderBy.TotalPoVvpDesc },
    { type: 'number', round: 2, key: 'totalAdvice', label: "PO ADVICE", asc: StockSuppliersIndicesOrderBy.TotalAdviceAsc, desc: StockSuppliersIndicesOrderBy.TotalAdviceDesc },
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
