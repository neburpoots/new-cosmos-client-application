import { Component, OnInit, ViewChild } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { TableField } from "../../../../models/utils/tableField";

import { ToastrService } from "ngx-toastr";
import { ActivatedRoute, Router } from "@angular/router";
import { AllSensorTypesIndicesGQL,  DeleteSensorTypeGQL,  SensorTypesIndex, SensorTypesIndicesOrderBy } from "../../../../../generated/graphql";
import { SearchFilters } from "../../../../models/utils/searchFilters";
import { BaseEntity } from "../../base/base-entity.component";
import { Observable } from "rxjs";
import { TableHead } from "../../../../models/utils/tableHead";
import { SensorTypesFormComponent } from "../form/sensor-types-form.component";

@Component({
  selector: "app-sensor-types",
  templateUrl: "./sensor-types.component.html",
})

export class SensorTypeComponent extends BaseEntity<SensorTypesIndex> implements OnInit {

  @ViewChild('editModal') childComponent!: SensorTypesFormComponent;

  objectSingle = 'Sensor Type';
  objectPlural = 'Sensor Types';

  searchCriteria: SearchFilters = {
    orderBy: [SensorTypesIndicesOrderBy.IdDesc],
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

    };
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
    protected override router: Router
  ) {
    super(router, toastr, route, http, sensorTypeService, deleteSensorService);

this.checkQueryParams();

this.nodes$ = this.loadData(this.searchCriteria);  }

  tableHeaders: TableHead<SensorTypesIndicesOrderBy>[] = [
    { key: 'cdartikel', label: "MV Part", asc: SensorTypesIndicesOrderBy.SensorTypeCdartikelAsc, desc: SensorTypesIndicesOrderBy.SensorTypeCdartikelDesc },
    { key: 'description', label: "MV Description", asc: SensorTypesIndicesOrderBy.SensorTypeArtikelOmschrAsc, desc: SensorTypesIndicesOrderBy.SensorTypeArtikelOmschrDesc },
    { key: 'prefix', label: "Prefix", asc: SensorTypesIndicesOrderBy.PrefixAsc, desc: SensorTypesIndicesOrderBy.PrefixDesc },
    { key: 'code', label: "Code", asc: SensorTypesIndicesOrderBy.CodeAsc, desc: SensorTypesIndicesOrderBy.CodeDesc },
    { key: 'suffix', label: "Suffix", asc: SensorTypesIndicesOrderBy.SuffixAsc, desc: SensorTypesIndicesOrderBy.SuffixDesc },
    { key: 'target', label: "Target", asc: SensorTypesIndicesOrderBy.TargetAsc, desc: SensorTypesIndicesOrderBy.TargetDesc },
    { key: 'range', label: "Range", asc: SensorTypesIndicesOrderBy.HighEuAsc, desc: SensorTypesIndicesOrderBy.HighEuDesc },
    { key: 'engineering_units', label: "Units", asc: SensorTypesIndicesOrderBy.EngineeringUnitsAsc, desc: SensorTypesIndicesOrderBy.EngineeringUnitsDesc },
    { key: 'electrolyte', label: "Electrolyte", asc: SensorTypesIndicesOrderBy.ElectrolyteNameAsc, desc: SensorTypesIndicesOrderBy.ElectrolyteNameDesc },
    { key: 'membrane', label: "Membrane", asc: SensorTypesIndicesOrderBy.MembraneNameAsc, desc: SensorTypesIndicesOrderBy.MembraneNameDesc },
    { key: 'o_ring', label: "O-Ring", asc: SensorTypesIndicesOrderBy.ORingNameAsc, desc: SensorTypesIndicesOrderBy.ORingNameDesc },
    { key: 'pyrolyser', label: "Pyro", asc: SensorTypesIndicesOrderBy.PyrolyserNameAsc, desc: SensorTypesIndicesOrderBy.PyrolyserNameDesc },
    { key: 'filter', label: "Filter", asc: SensorTypesIndicesOrderBy.FilterNameAsc, desc: SensorTypesIndicesOrderBy.FilterNameDesc},
    { key: 'maintenance_interval_months', label: "Maint. Int.", asc: SensorTypesIndicesOrderBy.MaintenanceIntervalMonthsAsc, desc: SensorTypesIndicesOrderBy.MaintenanceIntervalMonthsDesc},
    { key: 'replacement_interval_months', label: "Rep. Int.", asc: SensorTypesIndicesOrderBy.ReplacementIntervalMonthsAsc, desc: SensorTypesIndicesOrderBy.ReplacementIntervalMonthsDesc },
    { key: 'principle', label: "Principle", asc: SensorTypesIndicesOrderBy.PrincipleNameAsc, desc: SensorTypesIndicesOrderBy.PrincipleNameDesc },
  ]


  mapTableData(sensorTypes: SensorTypesIndex[]): any[] {
    return sensorTypes.map((sensorType: SensorTypesIndex) => { 
      return {
        id: { url: null, value: sensorType.id } as TableField,
        cdartikel: { url: null, value: sensorType?.sensorTypeCdartikel } as TableField,
        description: { url: null, value: sensorType?.sensorTypeArtikelOmschr } as TableField,
        prefix: { url: null, value: sensorType?.prefix } as TableField,
        code: { url: null, value: sensorType?.code } as TableField,
        suffix: { url: null, value: sensorType?.suffix } as TableField,
        target: { url: null, value: sensorType?.target } as TableField,
        range: { url: null, value: sensorType?.highEu } as TableField,
        engineering_units: { url: null, value: sensorType?.engineeringUnits } as TableField,
        electrolyte: { url: null, value: sensorType?.electrolyteName } as TableField,
        membrane: { url: null, value: sensorType?.membraneName } as TableField,
        o_ring: { url: null, value: sensorType?.oRingName } as TableField,
        pyrolyser: { url: null, value: sensorType?.pyrolyserName } as TableField,
        filter: { url: null, value: sensorType?.filterName } as TableField,
        maintenance_interval_months: { url: null, value: sensorType?.maintenanceIntervalMonths } as TableField,
        replacement_interval_months: { url: null, value: sensorType?.replacementIntervalMonths } as TableField,
        principle: { url: null, value: sensorType?.principleName } as TableField,
      };
    });
  }


}
