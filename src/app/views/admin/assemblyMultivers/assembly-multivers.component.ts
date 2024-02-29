import { Component, OnInit, SimpleChanges, ViewChild } from "@angular/core";
import { AbstractComponent } from "../abstract/abstract.component";
import { IAbstractComponent } from "../../../models/interface/IAbstractComponent";
import { AbstractService } from "../../../services/abstract/abstract.service";
import { ToastrService } from "ngx-toastr";
import { TableField } from "../../../models/utils/tableField";
import AssemblyMultivers from "../../../models/entities/assemblyMultivers";
import { AssemblyMultiversLine } from "../../../models/entities/assemblyMultiversLine";
import { SearchCriteria } from "../../../models/utils/searchCriteria";

@Component({
  selector: "app-assembly-multivers",
  templateUrl: "./assembly-multivers.component.html",
})

export class AssemblyMultiversComponent extends AbstractComponent<AssemblyMultivers> implements OnInit, IAbstractComponent<AssemblyMultivers> {

  tableHeaders = ['date', 'batch', 'type', 'cdartikel', 'serial_number', 'qty', 'free', 'res', 'min', 'max', 'status'];
  objectSingle = 'Assembly Multivers';
  objectPlural = 'Assemblies Multivers';
  
  override searchCriteria: SearchCriteria = {
    searchValue: "",
    orderBy: {
      orderByColumn: 'assemblage_order',
      orderByDirection: 'desc',
    }
  
  };


  assemblyMultiversLine : AssemblyMultiversLine[] = [];
  

  constructor(protected override toastr: ToastrService, private assemblyService: AbstractService<AssemblyMultivers>) {
    super(toastr, assemblyService);
    this.toastr = toastr;
    this.abstractService = assemblyService;

    this.url = 'api/assembliesmultivers';
  }

  override async loadDetailData(id : number): Promise<void> {
    try {
      if(id === this.assemblyMultiversLine[0]?.assemblage_order) return;
      console.log(id);
      this.assemblyMultiversLine = await this.abstractService.getDependentData(`api/assembliesmultivers/${id}`).toPromise();
      console.log(this.assemblyMultiversLine);
    } catch (error) {
      this.toastr.error(`Error fetching ${this.objectPluralLowerCase}`, 'Error');
    }
  }


  mapTableData(assemblies: AssemblyMultivers[]): any[] {
    console.log(assemblies)
    return assemblies.map((assembly : AssemblyMultivers) => {
      return {
        id: { url: 'api/assemblies', value: assembly.assemblage_order} as TableField,
        date: { url: null, value: assembly.order_datum } as TableField,
        batch: { url: null, value: assembly.assemblage_order } as TableField,
        type: { url: null, value: assembly.omschr } as TableField,
        cdartikel: { url: null, value: assembly.cdartikel } as TableField,
        serial_number: { url: null, value: assembly.commentaar } as TableField,
        qty: { url: null, value: assembly.aantal } as TableField,
        free: { url: null, value: assembly.voorraad } as TableField,
        res: { url: null, value: assembly.gereserveerd } as TableField,
        min: { url: null, value: assembly.minvoorraad } as TableField,
        max: { url: null, value: assembly.maxvoorraad } as TableField,
        status: { url: null, value: assembly.status } as TableField,
        // assemblyType: { url: null, value: assembly.assemblyType.name } as TableField,
        // cdartikel: { url: null, value: assembly?.assemblyType?.stock?.cdartikel } as TableField,
        // startSerialNumber: { url: null, value: assembly.startSerialNumber } as TableField,
        // checked: { url: null, value: assembly.checked } as TableField,
        // quantity: { url: null, value: assembly.quantity } as TableField,
        // voorraad: { url: null, value: assembly?.assemblyType?.stock?.voorraad } as TableField,
        // gereserveerd: { url: null, value: assembly?.assemblyType?.stock?.gereserveerd } as TableField,
        // maxvoorraad: { url: null, value: assembly?.assemblyType?.stock?.maxvoorraad } as TableField,
        // minvoorraad: { url: null, value: assembly?.assemblyType?.stock?.minvoorraad } as TableField,
        // po: { url: null, value: assembly.po } as TableField,
        // created: { url: null, value: assembly.created } as TableField,
      };
    });
  }

  override createUrlParams(): string {
    return `${this.url}?orderBy=${this.searchCriteria.orderBy.orderByColumn}&sort=${this.searchCriteria.orderBy.orderByDirection}&page=${this.data.page}&searchQuery=${encodeURIComponent(this.searchCriteria.searchValue!)}`;
  }
}
