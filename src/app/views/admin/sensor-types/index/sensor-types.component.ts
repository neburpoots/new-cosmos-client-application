import { Component, OnInit, ViewChild } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { TableField } from "../../../../models/utils/tableField";

import { ToastrService } from "ngx-toastr";
import { ActivatedRoute, Router } from "@angular/router";
import { AllSensorTypesIndicesGQL, DeleteSensorTypeGQL, QueryAllSensorTypesIndicesArgs, SensorTypesIndex, SensorTypesIndicesOrderBy } from "../../../../../generated/graphql";
import { SearchFilters } from "../../../../models/utils/searchFilters";
import { BaseEntity } from "../../base/base-entity.component";
import { Observable } from "rxjs";
import { TableHead } from "../../../../models/utils/tableHead";
import { SensorTypesFormComponent } from "../form/sensor-types-form.component";
import { FileService } from "../../../../services/file/file.service";

@Component({
  selector: "app-sensor-types",
  templateUrl: "./sensor-types.component.html",
})

export class SensorTypeComponent extends BaseEntity<SensorTypesIndex> implements OnInit {

  @ViewChild('editModal') childComponent!: SensorTypesFormComponent;

  objectSingle = 'Sensor Type';
  objectPlural = 'Sensor Types';

  searchCriteria: QueryAllSensorTypesIndicesArgs = {
    orderBy: [SensorTypesIndicesOrderBy.IdDesc],
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

  get editData(): SensorTypesIndex | null {
    return this.selectedItem || null
  }

  //IMPORTANT THIS IS THE NAME OF THE OBJECT IN DATA: {allGases: {nodes: []}}
  //json return object for getter
  //This is the object name of the nodes: return
  //check the get all method and see what it returns and set to this object
  Key = 'sensorTypes';


  //This is the fallback order by on changes in the table
  baseOrderBy = SensorTypesIndicesOrderBy.IdDesc;

  override nodes$: Observable<Array<SensorTypesIndex>>;

  constructor(protected override toastr: ToastrService, protected override route: ActivatedRoute, protected override http: HttpClient,
    private sensorTypeService: AllSensorTypesIndicesGQL,
    private deleteSensorService: DeleteSensorTypeGQL,
    protected override router: Router,
protected override fileService : FileService
  ) {
    super(fileService, router, toastr, route, http, sensorTypeService, deleteSensorService);

    this.checkQueryParams();
    this.nodes$ = this.loadData(this.searchCriteria);
  }

  tableHeaders: TableHead<SensorTypesIndicesOrderBy>[] = [
    { type: 'string', key: 'sensorTypeCdartikel', label: "MV Part", asc: SensorTypesIndicesOrderBy.SensorTypeCdartikelAsc, desc: SensorTypesIndicesOrderBy.SensorTypeCdartikelDesc },
    { type: 'string', key: 'sensorTypeArtikelOmschr', label: "MV Description", asc: SensorTypesIndicesOrderBy.SensorTypeArtikelOmschrAsc, desc: SensorTypesIndicesOrderBy.SensorTypeArtikelOmschrDesc },
    { type: 'string', key: 'prefix', label: "Prefix", asc: SensorTypesIndicesOrderBy.PrefixAsc, desc: SensorTypesIndicesOrderBy.PrefixDesc },
    { type: 'string', key: 'code', label: "Code", asc: SensorTypesIndicesOrderBy.CodeAsc, desc: SensorTypesIndicesOrderBy.CodeDesc },
    { type: 'string', key: 'suffix', label: "Suffix", asc: SensorTypesIndicesOrderBy.SuffixAsc, desc: SensorTypesIndicesOrderBy.SuffixDesc },
    { type: 'string', key: 'target', label: "Target", asc: SensorTypesIndicesOrderBy.TargetAsc, desc: SensorTypesIndicesOrderBy.TargetDesc },
    { type: 'number', key: 'highEu', label: "Range", asc: SensorTypesIndicesOrderBy.HighEuAsc, desc: SensorTypesIndicesOrderBy.HighEuDesc },
    { type: 'string', key: 'engineeringUnits', label: "Units", asc: SensorTypesIndicesOrderBy.EngineeringUnitsAsc, desc: SensorTypesIndicesOrderBy.EngineeringUnitsDesc },
    { type: 'string', key: 'electrolyteName', label: "Electrolyte", asc: SensorTypesIndicesOrderBy.ElectrolyteNameAsc, desc: SensorTypesIndicesOrderBy.ElectrolyteNameDesc },
    { type: 'string', key: 'membraneName', label: "Membrane", asc: SensorTypesIndicesOrderBy.MembraneNameAsc, desc: SensorTypesIndicesOrderBy.MembraneNameDesc },
    { type: 'string', key: 'oRingName', label: "O-Ring", asc: SensorTypesIndicesOrderBy.ORingNameAsc, desc: SensorTypesIndicesOrderBy.ORingNameDesc },
    { type: 'string', key: 'pyrolyserName', label: "Pyro", asc: SensorTypesIndicesOrderBy.PyrolyserNameAsc, desc: SensorTypesIndicesOrderBy.PyrolyserNameDesc },
    { type: 'string', key: 'filterName', label: "Filter", asc: SensorTypesIndicesOrderBy.FilterNameAsc, desc: SensorTypesIndicesOrderBy.FilterNameDesc },
    { type: 'number', key: 'maintenanceIntervalMonths', label: "Maint. Int.", asc: SensorTypesIndicesOrderBy.MaintenanceIntervalMonthsAsc, desc: SensorTypesIndicesOrderBy.MaintenanceIntervalMonthsDesc },
    { type: 'number', key: 'replacementIntervalMonths', label: "Rep. Int.", asc: SensorTypesIndicesOrderBy.ReplacementIntervalMonthsAsc, desc: SensorTypesIndicesOrderBy.ReplacementIntervalMonthsDesc },
    { type: 'string', key: 'principleName', label: "Principle", asc: SensorTypesIndicesOrderBy.PrincipleNameAsc, desc: SensorTypesIndicesOrderBy.PrincipleNameDesc },
  ]


  mapTableData(sensorTypes: SensorTypesIndex[]): any[] {
    return sensorTypes.map((sensorType: SensorTypesIndex) => {
      return {
        id: { url: null, value: sensorType.id } as TableField,
        sensorTypeCdartikel: { url: null, value: sensorType?.sensorTypeCdartikel } as TableField,
        sensorTypeArtikelOmschr: { url: null, value: sensorType?.sensorTypeArtikelOmschr } as TableField,
        prefix: { url: null, value: sensorType?.prefix } as TableField,
        code: { url: null, value: sensorType?.code } as TableField,
        suffix: { url: null, value: sensorType?.suffix } as TableField,
        target: { url: null, value: sensorType?.target } as TableField,
        highEu: { url: null, value: sensorType?.highEu } as TableField,
        engineeringUnits: { url: null, value: sensorType?.engineeringUnits } as TableField,
        electrolyteName: { url: null, value: sensorType?.electrolyteName } as TableField,
        membraneName: { url: null, value: sensorType?.membraneName } as TableField,
        oRingName: { url: null, value: sensorType?.oRingName } as TableField,
        pyrolyserName: { url: null, value: sensorType?.pyrolyserName } as TableField,
        filterName: { url: null, value: sensorType?.filterName } as TableField,
        maintenanceIntervalMonths: { url: null, value: sensorType?.maintenanceIntervalMonths } as TableField,
        replacementIntervalMonths: { url: null, value: sensorType?.replacementIntervalMonths } as TableField,
        principleName: { url: null, value: sensorType?.principleName } as TableField,
      };
    });
  }


}
