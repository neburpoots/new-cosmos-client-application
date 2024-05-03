import { Component, OnInit, ViewChild } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { TableField } from "../../../../models/utils/tableField";

import { ToastrService } from "ngx-toastr";
import { ActivatedRoute, Router } from "@angular/router";
import { AllSensorBaseTypesGQL, AllSensorTestResultsGQL, AllSensorTypesIndicesGQL, DeleteSensorBaseTypeGQL, DeleteSensorTestResultGQL, DeleteSensorTypeGQL, QueryAllSensorBaseTypesArgs, QueryAllSensorTestResultsArgs, SensorBaseType, SensorBaseTypesOrderBy, SensorTestResultsEntitiesOrderBy, SensorTestResultsEntity, SensorTestResultsOrderBy, SensorTypesIndex, SensorTypesIndicesOrderBy } from "../../../../../generated/graphql";
import { SearchFilters } from "../../../../models/utils/searchFilters";
import { BaseEntity } from "../../base/base-entity.component";
import { Observable } from "rxjs";
import { TableHead } from "../../../../models/utils/tableHead";
import { FileService } from "../../../../services/file/file.service";
import { AuthService } from "../../../../services/authentication/auth.service";
import { SensorTestResultsFormComponent } from "../form/sensor-test-results-form.component";

@Component({
  selector: "app-sensor-test-results",
  templateUrl: "./sensor-test-results.component.html",
})

export class SensorTestResultsComponent extends BaseEntity<SensorTestResultsEntity> {

  @ViewChild('editModal') childComponent!: SensorTestResultsFormComponent;

  objectSingle = 'Sensor Test Result';
  objectPlural = 'Sensor Test Results';

  searchCriteria: QueryAllSensorTestResultsArgs = {
    orderBy: [SensorTestResultsOrderBy.IdDesc],
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
    return this.selectedItem;
  }

  //IMPORTANT THIS IS THE NAME OF THE OBJECT IN DATA: {allGases: {nodes: []}}
  //json return object for getter
  //This is the object name of the nodes: return
  //check the get all method and see what it returns and set to this object
  Key = 'allSensorTestResultsEntities';


  //This is the fallback order by on changes in the table
  baseOrderBy = SensorTestResultsEntitiesOrderBy.IdDesc;

  constructor(protected override toastr: ToastrService, protected override route: ActivatedRoute, protected override http: HttpClient,
    private sensorTestResultsService: AllSensorTestResultsGQL,
    private deleteSensorTestResult: DeleteSensorTestResultGQL,
    protected override router: Router,
    protected override fileService: FileService,
    protected override authService: AuthService
  ) {
    super(authService, fileService, router, toastr, route, http, sensorTestResultsService, deleteSensorTestResult);

    this.checkQueryParams();


    this.loadData(this.searchCriteria);
  }

  tableHeaders: TableHead<SensorTestResultsEntitiesOrderBy>[] = [
    { type: 'string', key: 'factuuropdracht', label: "SO", asc: SensorTestResultsEntitiesOrderBy.FactuuropdrachtAsc, desc: SensorTestResultsEntitiesOrderBy.FactuuropdrachtDesc },
    { type: 'string', key: 'sensorTypeAndMode', label: "Sensor Type", asc: SensorTestResultsEntitiesOrderBy.SensorTypeAndModeAsc, desc: SensorTestResultsEntitiesOrderBy.SensorTypeAndModeDesc },
    { type: 'string', key: 'sensorSerialNumber', label: "S/N", asc: SensorTestResultsEntitiesOrderBy.SensorSerialNumberAsc, desc: SensorTestResultsEntitiesOrderBy.SensorSerialNumberDesc },
    { type: 'string', key: 'sensorRange', label: "Range", asc: SensorTestResultsEntitiesOrderBy.SensorRangeAsc, desc: SensorTestResultsEntitiesOrderBy.SensorRangeDesc },
    { type: 'string', key: 'gasName', label: "Gas", asc: SensorTestResultsEntitiesOrderBy.GasNameAsc, desc: SensorTestResultsEntitiesOrderBy.GasNameDesc },
    { type: 'datetime', key: 'date', label: "Date", asc: SensorTestResultsEntitiesOrderBy.DateAsc, desc: SensorTestResultsEntitiesOrderBy.DateDesc },
    { type: 'number', key: 'zeroResponse', label: "Z-Resp.", asc: SensorTestResultsEntitiesOrderBy.ZeroResponseAsc, desc: SensorTestResultsEntitiesOrderBy.ZeroResponseDesc },
    { type: 'string', key: 'calRange', label: "S-Range", asc: SensorTestResultsEntitiesOrderBy.CalRangeAsc, desc: SensorTestResultsEntitiesOrderBy.CalRangeDesc },
    { type: 'string', key: 'calGasName', label: "S-Gas", asc: SensorTestResultsEntitiesOrderBy.CalGasNameAsc, desc: SensorTestResultsEntitiesOrderBy.CalGasNameDesc },
    { type: 'number', key: 'usedSpanConcentration', label: "Used S-Con.", asc: SensorTestResultsEntitiesOrderBy.UsedSpanConcentrationAsc, desc: SensorTestResultsEntitiesOrderBy.UsedSpanConcentrationDesc },
    { type: 'number', key: 'spanResponse', label: "S-Resp.", asc: SensorTestResultsEntitiesOrderBy.SpanResponseAsc, desc: SensorTestResultsEntitiesOrderBy.SpanResponseDesc },
    { type: 'string', key: 'userInitials', label: "Perf.", asc: SensorTestResultsEntitiesOrderBy.UserInitialsAsc, desc: SensorTestResultsEntitiesOrderBy.UserInitialsDesc },
    { type: 'datetime', key: 'created', label: "Created", asc: SensorTestResultsEntitiesOrderBy.CreatedAsc, desc: SensorTestResultsEntitiesOrderBy.CreatedDesc },
    { type: 'string', key: 'ownerInitials', label: "By", asc: SensorTestResultsEntitiesOrderBy.OwnerInitialsAsc, desc: SensorTestResultsEntitiesOrderBy.OwnerInitialsDesc },
  ]

  mapTableData(sensorTestResults: SensorTestResultsEntity[]): any[] {
    return sensorTestResults.map((sensorTestResult: SensorTestResultsEntity) => {
      return {
        id: { url: null, value: sensorTestResult.id } as TableField,
        factuuropdracht: { url: null, value: sensorTestResult?.factuuropdracht } as TableField,
        sensorTypeAndMode: { url: null, value: sensorTestResult?.sensorTypeAndMode } as TableField,
        sensorSerialNumber: { url: null, value: sensorTestResult?.sensorSerialNumber } as TableField,
        sensorRange: { url: null, value: sensorTestResult?.sensorRange } as TableField,
        gasName: { url: null, value: sensorTestResult?.gasName } as TableField,
        date: { url: null, value: sensorTestResult?.date } as TableField,
        zeroResponse: { url: null, value: sensorTestResult?.zeroResponse} as TableField,
        calRange: { url: null, value: sensorTestResult?.calRange} as TableField,
        calGasName: { url: null, value: sensorTestResult?.calGasName} as TableField,
        usedSpanConcentration: { url: null, value: sensorTestResult?.usedSpanConcentration } as TableField,
        spanResponse: { url: null, value: sensorTestResult?.spanResponse } as TableField,
        userInitials: { url: null, value: sensorTestResult?.userInitials } as TableField,
        created: { url: null, value: sensorTestResult?.created } as TableField,
        ownerInitials: { url: null, value: sensorTestResult?.ownerInitials } as TableField,
      };
    });
  }
}
