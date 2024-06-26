import { Component, OnInit, ViewChild } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { TableField } from "../../../../models/utils/tableField";

import { ToastrService } from "ngx-toastr";
import { ActivatedRoute, Router } from "@angular/router";
import { AllSensorTypesIndicesGQL, DeleteSensorTypeGQL, DetectorSensorLocationIndicesGQL, DetectorSensorLocationsEndUsersGQL, DetectorSensorLocationsEndUsersOrderBy, DetectorSensorLocationsIndex, DetectorSensorLocationsIndicesOrderBy, QueryAllDetectorSensorLocationsIndicesArgs, QueryAllSensorTypesIndicesArgs, SensorTypesIndex, SensorTypesIndicesOrderBy } from "../../../../../generated/graphql";
import { SearchFilters } from "../../../../models/utils/searchFilters";
import { BaseEntity } from "../../base/base-entity.component";
import { Observable } from "rxjs";
import { TableHead } from "../../../../models/utils/tableHead";
import { FileService } from "../../../../services/file/file.service";
import { AuthService } from "../../../../services/authentication/auth.service";
import { SensorListFormComponent } from "../form/sensor-list-form.component";

@Component({
  selector: "app-sensor-list",
  templateUrl: "./sensor-list.component.html",
})
export class SensorListComponent extends BaseEntity<DetectorSensorLocationsIndex> {

  @ViewChild('editModal') childComponent!: SensorListFormComponent;

  objectSingle = 'Sensor List';
  objectPlural = 'Sensor Lists';

  searchCriteria: QueryAllDetectorSensorLocationsIndicesArgs = {
    orderBy: [DetectorSensorLocationsIndicesOrderBy.DetectorSensorLocationIdDesc],
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

  get editData(): DetectorSensorLocationsIndex | null {
    return this.selectedItem || null
  }

  //IMPORTANT THIS IS THE NAME OF THE OBJECT IN DATA: {allGases: {nodes: []}}
  //json return object for getter
  //This is the object name of the nodes: return
  //check the get all method and see what it returns and set to this object
  Key = 'detectorSensorLocationIndices';

  customFilters : any[] = []

  //This is the fallback order by on changes in the table
  baseOrderBy = DetectorSensorLocationsIndicesOrderBy.DetectorSensorLocationIdDesc;

  constructor(protected override toastr: ToastrService, protected override route: ActivatedRoute, protected override http: HttpClient,
    private sensorListService: DetectorSensorLocationIndicesGQL,
    protected override router: Router,
    protected override fileService: FileService,
    protected override authService : AuthService,
    protected endUserFilterService : DetectorSensorLocationsEndUsersGQL
  ) {
    super(authService, fileService, router, toastr, route, http, sensorListService, null);

    this.getCustomFilters();

    this.checkQueryParams();
    this.loadData(this.searchCriteria);
  }



  private getCustomFilters() {
    this.endUserFilterService.fetch({ orderBy: [DetectorSensorLocationsEndUsersOrderBy.NameAsc], filter: { and: []}}, { fetchPolicy: 'no-cache' }).subscribe(result => {
      console.log('test')
      let endUsers = result?.data?.allDetectorSensorLocationsEndUsers?.nodes || [];

      let filter = endUsers.map((endUser) => {
        return {
          id: endUser.id,
          name: endUser.name
        }
      });

      this.customFilters = [{ filter, name: 'endUserId' }];

      console.log(this.customFilters)

    });
  }

  tableHeaders: TableHead<DetectorSensorLocationsIndicesOrderBy>[] = [
    { type: 'string', key: 'simsTag', label: "TAG", asc: DetectorSensorLocationsIndicesOrderBy.SimsTagAsc, desc: DetectorSensorLocationsIndicesOrderBy.SimsTagDesc },
    { type: 'string', key: 'simsChannel', label: "Ch.", asc: DetectorSensorLocationsIndicesOrderBy.SimsChannelAsc, desc: DetectorSensorLocationsIndicesOrderBy.SimsChannelDesc },
    { type: 'string', key: 'buildingName', label: "Building", asc: DetectorSensorLocationsIndicesOrderBy.BuildingNameAsc, desc: DetectorSensorLocationsIndicesOrderBy.BuildingNameDesc },
    { type: 'string', key: 'areaName', label: "Area", asc: DetectorSensorLocationsIndicesOrderBy.AreaNameAsc, desc: DetectorSensorLocationsIndicesOrderBy.AreaNameDesc },
    { type: 'string', key: 'samplePointName', label: "Sample Point", asc: DetectorSensorLocationsIndicesOrderBy.SamplePointNameAsc, desc: DetectorSensorLocationsIndicesOrderBy.SamplePointNameDesc },
    { type: 'string', key: 'detectorModel', label: "Detector", asc: DetectorSensorLocationsIndicesOrderBy.DetectorModelAsc, desc: DetectorSensorLocationsIndicesOrderBy.DetectorModelDesc },
    { type: 'string', key: 'sensorModel', label: "Sensor", asc: DetectorSensorLocationsIndicesOrderBy.SensorModelAsc, desc: DetectorSensorLocationsIndicesOrderBy.SensorModelAsc },
    { type: 'string', key: 'sensorMaintenanceDueDate', label: "Sens. Mnt. Due", asc: DetectorSensorLocationsIndicesOrderBy.SensorMaintenanceDueDateAsc, desc: DetectorSensorLocationsIndicesOrderBy.SensorMaintenanceDueDateDesc },
    { type: 'string', key: 'sensorInstallDueDate', label: "Sens. Rep. Due", asc: DetectorSensorLocationsIndicesOrderBy.SensorInstallDueDateAsc, desc: DetectorSensorLocationsIndicesOrderBy.SensorInstallDueDateDesc },
    { type: 'string', key: 'filterInstallDueDate', label: "Filter Rep. Due", asc: DetectorSensorLocationsIndicesOrderBy.FilterInstallDueDateAsc, desc: DetectorSensorLocationsIndicesOrderBy.FilterInstallDueDateDesc },
    { type: 'string', key: 'pyrolyserInstallDueDate', label: "Pyro Rep. Due", asc: DetectorSensorLocationsIndicesOrderBy.PyrolyserInstallDueDateAsc, desc: DetectorSensorLocationsIndicesOrderBy.PyrolyserInstallDueDateDesc },

  ]


  mapTableData(sensorList: DetectorSensorLocationsIndex[]): any[] {
    return sensorList.map((sensor: DetectorSensorLocationsIndex) => {
      return {
        id: { url: null, value: sensor.detectorSensorLocationId } as TableField,
        simsTag: { url: null, value: sensor?.simsTag } as TableField,
        simsChannel: { url: null, value: sensor?.simsChannel } as TableField,
        buildingName: { url: null, value: sensor?.buildingName } as TableField,
        areaName: { url: null, value: sensor?.areaName } as TableField,
        samplePointName: { url: null, value: sensor?.samplePointName } as TableField,
        detectorModel: { url: null, value: sensor?.detectorModel } as TableField,
        sensorModel: { url: null, value: sensor?.sensorModel } as TableField,
        sensorMaintenanceDueDate: { url: null, value: sensor?.sensorMaintenanceDueDate, color: new Date(sensor.sensorMaintenanceDueDate) > new Date() ? undefined : 'dark:bg-red-600 bg-red-200'} as TableField,
        sensorInstallDueDate: { url: null, value: sensor?.sensorInstallDueDate, color: new Date(sensor.sensorInstallDueDate) > new Date() ? undefined : 'dark:bg-red-600 bg-red-200' } as TableField,
        filterInstallDueDate: { url: null, value: sensor?.filterInstallDueDate } as TableField,
        pyrolyserInstallDueDate: { url: null, value: sensor?.pyrolyserInstallDueDate, color: new Date(sensor.pyrolyserInstallDueDate) > new Date() || !sensor.pyrolyserInstallDueDate ? undefined : 'dark:bg-red-600 bg-red-200' } as TableField,
      };
    });
  }


}
