import { Component, OnInit, ViewChild } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { TableField } from "../../../../models/utils/tableField";

import { ToastrService } from "ngx-toastr";
import { ActivatedRoute, Router } from "@angular/router";
import { AllSensorBaseTypesGQL, AllSensorTypesIndicesGQL, DeleteSensorBaseTypeGQL, DeleteSensorTypeGQL, QueryAllSensorBaseTypesArgs, SensorBaseType, SensorBaseTypesOrderBy, SensorTypesIndex, SensorTypesIndicesOrderBy } from "../../../../../generated/graphql";
import { SearchFilters } from "../../../../models/utils/searchFilters";
import { BaseEntity } from "../../base/base-entity.component";
import { Observable } from "rxjs";
import { TableHead } from "../../../../models/utils/tableHead";
import { SensorBaseTypesFormComponent } from "../form/sensor-base-types-form.component";
import { FileService } from "../../../../services/file/file.service";

@Component({
  selector: "app-sensor-base-types",
  templateUrl: "./sensor-base-types.component.html",
})

export class SensorBaseTypeComponent extends BaseEntity<SensorBaseType> implements OnInit {

  @ViewChild('editModal') childComponent!: SensorBaseTypesFormComponent;

  objectSingle = 'Sensor Base Type';
  objectPlural = 'Sensor Base Types';

  searchCriteria: QueryAllSensorBaseTypesArgs = {
    orderBy: [SensorBaseTypesOrderBy.IdDesc],
    first: 10,
    offset: 0,
    filter: {
      and: [

      ]
    },
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
    private deleteSensorBaseTypeService: DeleteSensorBaseTypeGQL,
    protected override router: Router,
protected override fileService : FileService
  ) {
    super(fileService, router, toastr, route, http, sensorBaseTypeService, deleteSensorBaseTypeService);

    this.checkQueryParams();


    this.nodes$ = this.loadData(this.searchCriteria);
  }

  tableHeaders: TableHead<SensorBaseTypesOrderBy>[] = [
    { type: 'string', key: 'prefix', label: "Prefix", asc: SensorBaseTypesOrderBy.PrefixAsc, desc: SensorBaseTypesOrderBy.PrefixDesc },
    { type: 'string', key: 'suffix', label: "Suffix", asc: SensorBaseTypesOrderBy.SuffixAsc, desc: SensorBaseTypesOrderBy.SuffixDesc },
    { type: 'string', key: 'series', label: "Series", asc: SensorBaseTypesOrderBy.SeriesAsc, desc: SensorBaseTypesOrderBy.SeriesDesc },
    { type: 'number', key: 'maintenanceIntervalMonths', label: "Maint. Int.", asc: SensorBaseTypesOrderBy.MaintenanceIntervalMonthsAsc, desc: SensorBaseTypesOrderBy.MaintenanceIntervalMonthsDesc },
    { type: 'number', key: 'replacementIntervalMonths', label: "Rep. Int.", asc: SensorBaseTypesOrderBy.ReplacementIntervalMonthsAsc, desc: SensorBaseTypesOrderBy.ReplacementIntervalMonthsDesc },
    { type: 'number', key: 'quotationIntervalMonths', label: "Quo. Int.", asc: SensorBaseTypesOrderBy.QuotationIntervalMonthsAsc, desc: SensorBaseTypesOrderBy.QuotationIntervalMonthsDesc },
    { type: 'string', key: 'principleByPrincipleId$name', label: "Principle", asc: SensorBaseTypesOrderBy.PrincipleByPrincipleIdNameAsc, desc: SensorBaseTypesOrderBy.PrincipleByPrincipleIdNameDesc },
    { type: 'number', key: 'volume', label: "Volume", asc: SensorBaseTypesOrderBy.VolumeAsc, desc: SensorBaseTypesOrderBy.VolumeDesc },
  ]

  mapTableData(sensorBaseTypes: SensorBaseType[]): any[] {
    return sensorBaseTypes.map((sensorBaseType: SensorBaseType) => {
      return {
        id: { url: null, value: sensorBaseType.id } as TableField,
        prefix: { url: null, value: sensorBaseType?.prefix } as TableField,
        suffix: { url: null, value: sensorBaseType?.suffix } as TableField,
        series: { url: null, value: sensorBaseType?.series } as TableField,
        maintenanceIntervalMonths: { url: null, value: sensorBaseType?.maintenanceIntervalMonths } as TableField,
        replacementIntervalMonths: { url: null, value: sensorBaseType?.replacementIntervalMonths } as TableField,
        quotationIntervalMonths: { url: null, value: sensorBaseType?.quotationIntervalMonths } as TableField,
        principleByPrincipleId$name: { url: null, value: sensorBaseType?.principleByPrincipleId?.name } as TableField,
        volume: { url: null, value: sensorBaseType?.volume } as TableField,
      };
    });
  }
}
