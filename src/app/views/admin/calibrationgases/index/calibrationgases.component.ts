import { Component, OnInit, SimpleChanges, ViewChild } from "@angular/core";
import { HttpResponse } from "@angular/common/http";
import { PaginatedResult } from "../../../../models/utils/pagination";
import { SearchCriteria } from "../../../../models/utils/searchCriteria";
import { ModalWidth } from "../../../../models/enums/modalWidth.enum";
import { Assembly } from "../../../../models/entities/assembly";
import { CalGasService } from "../../../../services/calgas/calgas.service";
import { CalGas } from "../../../../models/entities/calgas";
import { TableField } from "../../../../models/utils/tableField";
import { AbstractComponent } from "../../abstract/abstract.component";
import { IAbstractComponent } from "../../../../models/interface/IAbstractComponent";
import { AbstractService } from "../../../../services/abstract/abstract.service";
import { ToastrService } from "ngx-toastr";
import { CalibrationGasesFormComponent } from "../form/calibrationgases-form.component";

@Component({
  selector: "app-calibrationgasses",
  templateUrl: "./calibrationgases.component.html",
})

export class CalibrationGasesComponent extends AbstractComponent<CalGas> implements OnInit, IAbstractComponent<CalGas> {


  @ViewChild('calibrationGasEdit') childComponent!: CalibrationGasesFormComponent;

  objectSingle = 'Calibration gas';
  objectPlural = 'Calibration gases';

  override setEditData() {
    console.log(this.editData)
    this.childComponent.setEditData(this.editData);
  }

  get editData(): any {
    return {
      id: this.selectedItem?.id,
      gas: this.selectedItem?.gas?.id,
      concentration: this.selectedItem?.concentration,
      cdartikel: this.selectedItem?.cdartikel,
      engineering_units: this.selectedItem?.engineering_units,
    };
  }
  

  constructor(protected override toastr: ToastrService, private calgasService: AbstractService<CalGas>) {
      super(toastr, calgasService);
      this.abstractService = calgasService;
      this.url = 'api/calgas';
  }

  tableHeaders : string[] = ['gas', 'concentration', 'engineering_units', 'created', 'cdartikel', 'by'];

  mapTableData(calGasses: CalGas[]): any[] {
    console.log(calGasses)
    return calGasses.map((calgas: CalGas) => {
      return {
        id: { url: 'api/calGasses', value: calgas.id } as TableField,
        gas: { url: null, value: calgas?.gas?.name } as TableField,
        concentration: { url: null, value: calgas?.concentration } as TableField,
        engineering_units: { url: null, value: calgas?.engineering_units } as TableField,
        cdartikel: { url: null, value: calgas?.cdartikel } as TableField,
        created: { url: null, value: calgas.created } as TableField,
        by: { url: null, value: calgas?.owner?.initials } as TableField,
      };
    });
  }

  override createUrlParams(): string {
    return `${this.url}?orderBy=${this.searchCriteria.orderBy.orderByColumn}&sort=${this.searchCriteria.orderBy.orderByDirection}&page=${this.data.page}&searchQuery=${encodeURIComponent(this.searchCriteria.searchValue!)}`;
  }

}
