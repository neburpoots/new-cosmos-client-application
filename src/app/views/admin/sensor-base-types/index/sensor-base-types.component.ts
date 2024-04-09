import { Component, OnInit, ViewChild } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { TableField } from "../../../../models/utils/tableField";

import { ToastrService } from "ngx-toastr";
import { ActivatedRoute } from "@angular/router";
import { AllSensorBaseTypesGQL, AllSensorTypesIndicesGQL,  DeleteSensorBaseTypeGQL,  DeleteSensorTypeGQL,  SensorBaseType,  SensorBaseTypesOrderBy,  SensorTypesIndex, SensorTypesIndicesOrderBy } from "../../../../../generated/graphql";
import { SearchFilters } from "../../../../models/utils/searchFilters";
import { BaseEntity } from "../../base/base-entity.component";
import { Observable } from "rxjs";
import { TableHead } from "../../../../models/utils/tableHead";
import { SensorBaseTypesFormComponent } from "../form/sensor-base-types-form.component";

@Component({
  selector: "app-sensor-base-types",
  templateUrl: "./sensor-base-types.component.html",
})

export class SensorBaseTypeComponent extends BaseEntity<SensorBaseType> implements OnInit {

  @ViewChild('editModal') childComponent!: SensorBaseTypesFormComponent;

  objectSingle = 'Sensor Base Type';
  objectPlural = 'Sensor Base Types';

  searchCriteria: SearchFilters = {
    orderBy: [SensorBaseTypesOrderBy.IdDesc],
    search: "",
    limit: 10,
    offset: 0,
    totalPages: 0,
    total: 0,
    page: 1,
  }

  ngOnInit(): void {
    console.log(this.nodes$);
    this.nodes$.subscribe(result => console.log(result));
  }

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
      maintenance_interval_months: this.selectedItem?.maintenanceIntervalMonths,
      replacement_interval_months: this.selectedItem?.replacementIntervalMonths,
      quotation_interval_months: this.selectedItem?.quotationIntervalMonths,
      principleId: this.selectedItem?.principleByPrincipleId?.id,
      volume: this.selectedItem?.volume,
    };
  }

  //IMPORTANT THIS IS THE NAME OF THE OBJECT IN DATA: {allGases: {nodes: []}}
  //json return object for getter
  //This is the object name of the nodes: return
  //check the get all method and see what it returns and set to this object
  Key = 'allSensorBaseTypes';


  //This is the fallback order by on changes in the table
  baseOrderBy = SensorBaseTypesOrderBy.IdDesc;

  override nodes$: Observable<Array<SensorBaseType>>;

  constructor(protected override toastr: ToastrService, protected override route: ActivatedRoute, protected override http: HttpClient,
    private sensorBaseTypeService: AllSensorBaseTypesGQL,
    private deleteSensorBaseTypeService: DeleteSensorBaseTypeGQL
  ) {
    super(toastr, route, http, sensorBaseTypeService, deleteSensorBaseTypeService);

    this.nodes$ = this.loadData(this.searchCriteria);
  }

  tableHeaders: TableHead<SensorBaseTypesOrderBy>[] = [
    { key: 'prefix', label: "Prefix", asc: SensorBaseTypesOrderBy.PrefixAsc, desc: SensorBaseTypesOrderBy.PrefixDesc },
    { key: 'suffix', label: "Suffix", asc: SensorBaseTypesOrderBy.SuffixAsc, desc: SensorBaseTypesOrderBy.SuffixDesc },
    { key: 'series', label: "Series", asc: SensorBaseTypesOrderBy.SeriesAsc, desc: SensorBaseTypesOrderBy.SeriesDesc },
    { key: 'maintenance_interval_months', label: "Maint. Int.", asc: SensorBaseTypesOrderBy.MaintenanceIntervalMonthsAsc, desc: SensorBaseTypesOrderBy.MaintenanceIntervalMonthsDesc},
    { key: 'replacement_interval_months', label: "Rep. Int.", asc: SensorBaseTypesOrderBy.ReplacementIntervalMonthsAsc, desc: SensorBaseTypesOrderBy.ReplacementIntervalMonthsDesc },
    { key: 'quotation_interval_months', label: "Quo. Int.", asc: SensorBaseTypesOrderBy.QuotationIntervalMonthsAsc, desc: SensorBaseTypesOrderBy.QuotationIntervalMonthsDesc },
    { key: 'principle', label: "Principle", asc: SensorBaseTypesOrderBy.PrincipleByPrincipleIdNameAsc, desc: SensorBaseTypesOrderBy.PrincipleByPrincipleIdNameDesc },
    { key: 'volume', label: "Volume", asc: SensorBaseTypesOrderBy.VolumeAsc, desc: SensorBaseTypesOrderBy.VolumeDesc },
  ]

  mapTableData(sensorBaseTypes: SensorBaseType[]): any[] {
    return sensorBaseTypes.map((sensorBaseType: SensorBaseType) => { 
      return {
        id: { url: null, value: sensorBaseType.id } as TableField,
        prefix: { url: null, value: sensorBaseType?.prefix } as TableField,
        suffix: { url: null, value: sensorBaseType?.suffix } as TableField,
        series: { url: null, value: sensorBaseType?.series } as TableField,
        maintenance_interval_months: { url: null, value: sensorBaseType?.maintenanceIntervalMonths } as TableField,
        replacement_interval_months: { url: null, value: sensorBaseType?.replacementIntervalMonths } as TableField,
        quotation_interval_months: { url: null, value: sensorBaseType?.quotationIntervalMonths } as TableField,
        principle: { url: null, value: sensorBaseType?.principleByPrincipleId?.name } as TableField,
        volume: { url: null, value: sensorBaseType?.volume } as TableField,
      };
    });
  }
}
