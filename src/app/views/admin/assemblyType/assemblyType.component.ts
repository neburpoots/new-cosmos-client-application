import { Component, OnInit, SimpleChanges, ViewChild } from "@angular/core";
import { HttpResponse } from "@angular/common/http";

import AssemblyType from "../../../models/entities/assemblyType";
import { AbstractComponent } from "../abstract/abstract.component";
import { ToastrService } from "ngx-toastr";
import { AbstractService } from "../../../services/abstract/abstract.service";
import { TableField } from "../../../models/utils/tableField";
import { IAbstractComponent } from "../../../models/interface/IAbstractComponent";
import { TableHeader } from "../../../models/utils/tableHeader";

@Component({
  selector: "app-calibrationgasses",
  templateUrl: "./assemblyType.component.html",
})

export class AssemblyTypeComponent extends AbstractComponent<AssemblyType> implements OnInit, IAbstractComponent<AssemblyType> {


  // @ViewChild('calibrationGasEdit') childComponent!: CalibrationGasesFormComponent;

  objectSingle = 'Assembly type';
  objectPlural = 'Assembly types';

  // override setEditData() {
  //   console.log(this.editData)
  //   this.childComponent.setEditData(this.editData);
  // }

  get editData(): any {
    return {
      id: this.selectedItem?.id,

    };
  }
  

  constructor(protected override toastr: ToastrService, private assemblyTypeService: AbstractService<AssemblyType>) {
      super(toastr, assemblyTypeService);
      this.abstractService = assemblyTypeService;
      this.url = 'api/assembly-types';
  }

  // tableHeaders : string[] = ['name', 'cdartikel', 'free', 'res', 'min', 'max', 'advice', 'created'];

  tableHeaders : TableHeader[] = [
    { displayName: 'Name', sortValue: 'name', key: 'name'  },
    { displayName: 'CDArticle', sortValue: 'cdartikel.cdartikel', key: 'cdartikel'},
    { displayName: 'Free', sortValue: 'cdartikel.stock.voorraad', key: 'free'},
    { displayName: 'Res', sortValue: 'cdartikel.stock.gereserveerd', key: 'res'},
    { displayName: 'Min', sortValue: 'cdartikel.stock.minvoorraad', key: 'min'},
    { displayName: 'Max', sortValue: 'cdartikel.stock.maxvoorraad', key: 'max'},
    { displayName: 'Advice', sortValue: 'cdartikel.advice', key: 'advice'},
    { displayName: 'Created', sortValue: 'created', key: 'created'},
  ];


  mapTableData(assemblyTypes: AssemblyType[]): any[] {
    console.log(assemblyTypes)
    return assemblyTypes.map((assemblyType: AssemblyType) => {
      return {
        id: { url: null, value: assemblyType.id } as TableField,
        name: { url: null, value: assemblyType.name } as TableField,
        cdartikel: { url: null, value: assemblyType?.cdartikel?.cdartikel } as TableField,
        free: { url: null, value: assemblyType?.cdartikel?.stock?.voorraad } as TableField,
        res: { url: null, value: assemblyType?.cdartikel?.stock?.gereserveerd } as TableField,
        min: { url: null, value: assemblyType?.cdartikel?.stock?.minvoorraad } as TableField,
        max: { url: null, value: assemblyType?.cdartikel?.stock?.maxvoorraad } as TableField,
        advice: { url: null, value: assemblyType?.cdartikel?.advice } as TableField,
        created: { url: null, value: assemblyType.created } as TableField,
      };
    });
  }

  override createUrlParams(): string {
    return `${this.url}?orderBy=${this.searchCriteria.orderBy.orderByColumn}&sort=${this.searchCriteria.orderBy.orderByDirection}&page=${this.data.page}&searchQuery=${encodeURIComponent(this.searchCriteria.searchValue!)}`;
  }

}
