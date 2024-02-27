import { Component, OnInit, SimpleChanges, ViewChild } from "@angular/core";
import { AssemblyService } from "../../../../services/assembly/assembly.service";
import { HttpResponse } from "@angular/common/http";
import { PaginatedResult } from "../../../../models/utils/pagination";
import { SearchCriteria } from "../../../../models/utils/searchCriteria";
import { ModalWidth } from "../../../../models/enums/modalWidth.enum";
import { Assembly } from "../../../../models/entities/assembly";
import { TableField } from "../../../../models/utils/tableField";
import { AbstractComponent } from "../../abstract/abstract.component";
import { AbstractService } from "../../../../services/abstract/abstract.service";
import { IAbstractComponent } from "../../../../models/interface/IAbstractComponent";
import { ToastrService } from "ngx-toastr";
import { AssemblyFormComponent } from "../form/assembly-form.component";
@Component({
  selector: "app-assembly",
  templateUrl: "./assembly.component.html",
})

export class AssemblyComponent extends AbstractComponent<Assembly> implements OnInit, IAbstractComponent<Assembly> {

  @ViewChild('assemblyEdit') childComponent!: AssemblyFormComponent;

  tableHeaders = ['code', 'assemblyType', 'cdartikel', 'startSerialNumber', 'quantity', 'voorraad', 'gereserveerd', 'minvoorraad', 'maxvoorraad', 'checked', 'po', 'created'];
  objectSingle = 'Assembly';
  objectPlural = 'Assemblies';

  constructor(protected override toastr: ToastrService, private assemblyService: AbstractService<Assembly>) {
    super(toastr, assemblyService);
    this.toastr = toastr;
    this.abstractService = assemblyService;

    this.url = 'api/assemblies';
  }

  override setEditData() {
    console.log(this.editData)
    this.childComponent.setEditData(this.editData);
  }
  
  get editData(): any {
    return {
      id: this.selectedItem?.id,
      batch: this.selectedItem?.code,
      start_serial_number: this.selectedItem?.startSerialNumber,
      selectedOption: this.selectedItem?.assemblyType.id,
      quantity: this.selectedItem?.quantity,
    };
  }

  mapTableData(assemblies: Assembly[]): any[] {
    console.log(assemblies)
    return assemblies.map((assembly) => {
      return {
        id: { url: 'api/assemblies', value: assembly.id } as TableField,
        code: { url: null, value: assembly.code } as TableField,
        assemblyType: { url: null, value: assembly.assemblyType.name } as TableField,
        cdartikel: { url: null, value: assembly?.assemblyType?.stock?.cdartikel } as TableField,
        startSerialNumber: { url: null, value: assembly.startSerialNumber } as TableField,
        checked: { url: null, value: assembly.checked } as TableField,
        quantity: { url: null, value: assembly.quantity } as TableField,
        voorraad: { url: null, value: assembly?.assemblyType?.stock?.voorraad } as TableField,
        gereserveerd: { url: null, value: assembly?.assemblyType?.stock?.gereserveerd } as TableField,
        maxvoorraad: { url: null, value: assembly?.assemblyType?.stock?.maxvoorraad } as TableField,
        minvoorraad: { url: null, value: assembly?.assemblyType?.stock?.minvoorraad } as TableField,
        po: { url: null, value: assembly.po } as TableField,
        created: { url: null, value: assembly.created } as TableField,
      };
    });
  }

  override createUrlParams(): string {
    return `${this.url}?orderBy=${this.searchCriteria.orderBy.orderByColumn}&sort=${this.searchCriteria.orderBy.orderByDirection}&page=${this.data.page}&searchQuery=${encodeURIComponent(this.searchCriteria.searchValue!)}`;
  }
}
