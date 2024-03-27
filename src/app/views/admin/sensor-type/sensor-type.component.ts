import { Component, OnInit, SimpleChanges, ViewChild } from "@angular/core";
import { HttpClient, HttpResponse } from "@angular/common/http";
import { AbstractComponent } from "../abstract/abstract.component";
import SensorBaseType from "../../../models/entities/sensorBaseType";
import { IAbstractComponent } from "../../../models/interface/IAbstractComponent";
import { AbstractService } from "../../../services/abstract/abstract.service";
import { CalibrationGasesFormComponent } from "../calibrationgases/form/calibrationgases-form.component";
import { ToastrService } from "ngx-toastr";
import { TableField } from "../../../models/utils/tableField";
// import { SensorBaseTypeFormComponent } from "./form/sensorBaseTypeForm.component";
import { TableHeader } from "../../../models/utils/tableHeader";
import { ActivatedRoute } from "@angular/router";
import SensorType from "../../../models/entities/sensor-type";
import { SensorTypeIndex } from "../../../models/entities/sensor-type-index";

@Component({
  selector: "app-calibrationgasses",
  templateUrl: "./sensor-type.component.html",
})

export class SensorTypeComponent extends AbstractComponent<SensorType> implements OnInit, IAbstractComponent<SensorType> {


  // @ViewChild('sensorBaseTypeFormComponent') childComponent!: SensorBaseTypeFormComponent;

  objectSingle = 'Sensor Type';
  objectPlural = 'Sensor Types';

  override setEditData() {
    console.log(this.editData)
    // this.childComponent.setEditData(this.editData);
  }

  get editData(): any {
    return {
      id: this.selectedItem?.id,
      // prefix: this.selectedItem?.prefix,
      // suffix: this.selectedItem?.suffix,
      // series: this.selectedItem?.series,
      // maintenance_interval_months: this.selectedItem?.maintenance_interval_months,
      // replacement_interval_months: this.selectedItem?.replacement_interval_months,
      // quotation_interval_months: this.selectedItem?.quotation_interval_months,
      // principle: this.selectedItem?.principle,
      // volume: this.selectedItem?.volume,
      
    };
  }
  

  constructor(protected override toastr: ToastrService, private sensorTypeService: AbstractService<SensorType>, protected override route: ActivatedRoute, protected override http: HttpClient) {
      super(toastr, sensorTypeService, route, http);
      this.url = 'api/sensor-types';
  }

  tableHeaders : TableHeader[] = [
    { displayName: 'Prefix', sortValue: 'prefix', key: 'prefix'  },
    { displayName: 'Code', sortValue: 'code', key: 'code'},
    { displayName: 'Suffix', sortValue: 'suffix', key: 'suffix'},
    { displayName: 'Model', sortValue: 'model', key: 'model'},
    { displayName: 'Target', sortValue: 'target', key: 'target'},
    { displayName: 'Range', sortValue: 'high_eu', key: 'range'},
    { displayName: 'Units', sortValue: 'engineering_units', key: 'units'},
    { displayName: 'Flow', sortValue: 'flow_rate', key: 'flow'},
    { displayName: 'Cal. Gas', sortValue: 'cal_gas_name', key: 'calgas'},
    { displayName: 'Cal. Conc.', sortValue: 'cal_gas_concentration', key: 'concentration'},
    { displayName: 'Cal. Units.', sortValue: 'cal_engineering_units', key: 'cal_units'},
    { displayName: 'Cal. Resp.', sortValue: 'cal_response', key: 'cal_response'},
    { displayName: 'Cal. Flow.', sortValue: 'cal_flow_rate', key: 'cal_flow'},
    { displayName: 'Electrolyte', sortValue: 'electrolyte_name', key: 'electrolyte_name'},
    { displayName: 'O-Ring', sortValue: 'o_ring_name', key: 'o_ring_name'},
    { displayName: 'Sheet', sortValue: 'silicone_sheet', key: 'silicone_sheet'},
    { displayName: 'Pyro', sortValue: 'pyrolyser_name', key: 'pyrolyser_name'},
    { displayName: 'Filter', sortValue: 'filter_name', key: 'filter_name'},
    { displayName: 'Rest.', sortValue: 'restrictor', key: 'restrictor'},
    { displayName: 'Batt.', sortValue: 'battery', key: 'battery'},
    { displayName: 'Seal.', sortValue: 'membrane_seal', key: 'membrane_seal'}
  ];


  mapTableData(sensorBaseTypes: SensorTypeIndex[]): any[] {
    console.log(sensorBaseTypes)
    return sensorBaseTypes.map((sensorType: SensorTypeIndex) => {
      return {
        id: { url: '', value: sensorType.id } as TableField,
        prefix: { url: '', value: sensorType?.prefix } as TableField,
        code: { url: '', value: sensorType?.code } as TableField,
        suffix: { url: '', value: sensorType?.suffix } as TableField,
        model: { url: '', value: sensorType?.model } as TableField,
        target: { url: '', value: sensorType?.target } as TableField,
        range: { url: '', value: sensorType?.high_eu } as TableField,
        units: { url: '', value: sensorType?.engineering_units } as TableField,
        flow: { url: '', value: sensorType?.flow_rate } as TableField,
        calgas: { url: '', value: sensorType?.cal_gas_name } as TableField,
        concentration: { url: '', value: sensorType?.cal_gas_concentration } as TableField,
        cal_units: { url: '', value: sensorType?.cal_engineering_units } as TableField,
        cal_response: { url: '', value: sensorType?.cal_response } as TableField,
        cal_flow: { url: '', value: sensorType?.cal_flow_rate } as TableField,
        electrolyte_name: { url: '', value: sensorType?.electrolyte_name } as TableField,
        membrane_name: { url: '', value: sensorType?.membrane_name } as TableField,
        o_ring_name: { url: '', value: sensorType?.o_ring_name } as TableField,
        silicone_sheet: { url: '', value: sensorType?.silicone_sheet } as TableField,
        pyrolyser_name: { url: '', value: sensorType?.pyrolyser_name } as TableField,
        filter_name: { url: '', value: sensorType?.filter_name } as TableField,
        restrictor: { url: '', value: sensorType?.restrictor } as TableField,
        battery: { url: '', value: sensorType?.battery } as TableField,
        membrane_seal: { url: '', value: sensorType?.membrane_seal } as TableField,
    };
    });
  }

  override createUrlParams(): string {
    return `${this.url}?orderBy=${this.searchCriteria.orderBy.orderByColumn}&sort=${this.searchCriteria.orderBy.orderByDirection}&page=${this.data.page}&limit=${this.data.limit}&searchQuery=${encodeURIComponent(this.searchCriteria.searchValue!)}`;
  }

}
