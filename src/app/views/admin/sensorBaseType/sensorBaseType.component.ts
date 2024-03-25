import { Component, OnInit, SimpleChanges, ViewChild } from "@angular/core";
import { HttpResponse } from "@angular/common/http";
import { AbstractComponent } from "../abstract/abstract.component";
import SensorBaseType from "../../../models/entities/sensorBaseType";
import { IAbstractComponent } from "../../../models/interface/IAbstractComponent";
import { AbstractService } from "../../../services/abstract/abstract.service";
import { CalibrationGasesFormComponent } from "../calibrationgases/form/calibrationgases-form.component";
import { ToastrService } from "ngx-toastr";
import { TableField } from "../../../models/utils/tableField";
import { SensorBaseTypeFormComponent } from "./form/sensorBaseTypeForm.component";
import { TableHeader } from "../../../models/utils/tableHeader";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-calibrationgasses",
  templateUrl: "./sensorBaseType.component.html",
})

export class SensorBaseTypeComponent extends AbstractComponent<SensorBaseType> implements OnInit, IAbstractComponent<SensorBaseType> {


  @ViewChild('sensorBaseTypeFormComponent') childComponent!: SensorBaseTypeFormComponent;

  objectSingle = 'Sensor Base Type';
  objectPlural = 'Sensor Base Types';

  override setEditData() {
    console.log(this.editData)
    this.childComponent.setEditData(this.editData);
  }

  get editData(): any {
    return {
      id: this.selectedItem?.id,
      prefix: this.selectedItem?.prefix,
      suffix: this.selectedItem?.suffix,
      series: this.selectedItem?.series,
      maintenance_interval_months: this.selectedItem?.maintenance_interval_months,
      replacement_interval_months: this.selectedItem?.replacement_interval_months,
      quotation_interval_months: this.selectedItem?.quotation_interval_months,
      principle: this.selectedItem?.principle,
      volume: this.selectedItem?.volume,
      
    };
  }
  

  constructor(protected override toastr: ToastrService, private calgasService: AbstractService<SensorBaseType>, protected override route: ActivatedRoute) {
      super(toastr, calgasService, route);
      this.abstractService = calgasService;
      this.url = 'api/sensor-base-types';
  }

  tableHeaders : TableHeader[] = [
    { displayName: 'Prefix', sortValue: 'prefix', key: 'prefix'  },
    { displayName: 'Suffix', sortValue: 'suffix', key: 'suffix'},
    { displayName: 'Series', sortValue: 'series', key: 'series'},
    { displayName: 'Maintenance Interval', sortValue: 'maintenance_interval_months', key: 'maintenance_interval'},
    { displayName: 'Replacement Interval', sortValue: 'replacement_interval_months', key: 'replacement_interval'},
    { displayName: 'Quotation Interval', sortValue: 'quotation_interval_months', key: 'quotation_interval'},
    { displayName: 'Principle', sortValue: 'principle', key: 'principle'},
    { displayName: 'Volume', sortValue: 'volume', key: 'volume'},
  ];


  mapTableData(sensorBaseTypes: SensorBaseType[]): any[] {
    console.log(sensorBaseTypes)
    return sensorBaseTypes.map((sensorBaseType: SensorBaseType) => {
      return {
        id: { url: '', value: sensorBaseType.id } as TableField,
        prefix: { url: '', value: sensorBaseType.prefix } as TableField,
        suffix: { url: '', value: sensorBaseType.suffix } as TableField,
        series: { url: '', value: sensorBaseType.series } as TableField,
        maintenance_interval: { url: '', value: sensorBaseType.maintenance_interval_months } as TableField,
        replacement_interval: { url: '', value: sensorBaseType.replacement_interval_months } as TableField,
        quotation_interval: { url: '', value: sensorBaseType.quotation_interval_months } as TableField,
        principle: { url: '', value: sensorBaseType.principle.name } as TableField,
        volume: { url: '', value: sensorBaseType.volume } as TableField,
    };
    });
  }

  override createUrlParams(): string {
    return `${this.url}?orderBy=${this.searchCriteria.orderBy.orderByColumn}&sort=${this.searchCriteria.orderBy.orderByDirection}&page=${this.data.page}&limit=${this.data.limit}&searchQuery=${encodeURIComponent(this.searchCriteria.searchValue!)}`;
  }

}
