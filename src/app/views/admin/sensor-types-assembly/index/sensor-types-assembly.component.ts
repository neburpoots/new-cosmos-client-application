import { Component, OnInit, ViewChild } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { TableField } from "../../../../models/utils/tableField";

import { ToastrService } from "ngx-toastr";
import { ActivatedRoute } from "@angular/router";
import { AllSensorTypesIndicesGQL,  DeleteSensorTypeGQL,  SensorTypesIndex, SensorTypesIndicesOrderBy } from "../../../../../generated/graphql";
import { SearchFilters } from "../../../../models/utils/searchFilters";
import { BaseEntity } from "../../base/base-entity.component";
import { Observable } from "rxjs";
import { TableHead } from "../../../../models/utils/tableHead";
import { SensorTypesFormComponent } from "../../sensor-types/form/sensor-types-form.component";

@Component({
  selector: "app-sensor-types",
  templateUrl: "./sensor-types-assembly.component.html",
})

export class SensorTypeAssembliesComponent extends BaseEntity<SensorTypesIndex> implements OnInit {

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
    private deleteSensorService: DeleteSensorTypeGQL
  ) {
    super(toastr, route, http, sensorTypeService, deleteSensorService);

    this.nodes$ = this.loadData(this.searchCriteria);
  }

  tableHeaders: TableHead<SensorTypesIndicesOrderBy>[] = [
    { key: 'prefix', label: "Prefix", asc: SensorTypesIndicesOrderBy.PrefixAsc, desc: SensorTypesIndicesOrderBy.PrefixDesc },
    { key: 'code', label: "Code", asc: SensorTypesIndicesOrderBy.CodeAsc, desc: SensorTypesIndicesOrderBy.CodeDesc },
    { key: 'suffix', label: "Suffix", asc: SensorTypesIndicesOrderBy.SuffixAsc, desc: SensorTypesIndicesOrderBy.SuffixDesc },
    { key: 'model', label: "Model", asc: SensorTypesIndicesOrderBy.ModelAsc, desc: SensorTypesIndicesOrderBy.ModelDesc },
    { key: 'target', label: "Target", asc: SensorTypesIndicesOrderBy.TargetAsc, desc: SensorTypesIndicesOrderBy.TargetDesc },
    { key: 'range', label: "Range", asc: SensorTypesIndicesOrderBy.HighEuAsc, desc: SensorTypesIndicesOrderBy.HighEuDesc },
    { key: 'engineering_units', label: "Units", asc: SensorTypesIndicesOrderBy.EngineeringUnitsAsc, desc: SensorTypesIndicesOrderBy.EngineeringUnitsDesc },
    { key: 'flow', label: "Flow", asc: SensorTypesIndicesOrderBy.FlowRateAsc, desc: SensorTypesIndicesOrderBy.FlowRateDesc },
    { key: 'calgasname', label: "Cal. Gas", asc: SensorTypesIndicesOrderBy.CalGasNameAsc, desc: SensorTypesIndicesOrderBy.CalGasNameDesc },
    { key: 'calgasconcentration', label: "Cal. Conc.", asc: SensorTypesIndicesOrderBy.CalGasConcentrationAsc, desc: SensorTypesIndicesOrderBy.CalGasConcentrationDesc },
    { key: 'calunits', label: "Cal. Units.", asc: SensorTypesIndicesOrderBy.CalEngineeringUnitsAsc, desc: SensorTypesIndicesOrderBy.CalEngineeringUnitsDesc },
    { key: 'calresponse', label: "Cal. Resp.", asc: SensorTypesIndicesOrderBy.CalResponseAsc, desc: SensorTypesIndicesOrderBy.CalResponseDesc},
    { key: 'calflow', label: "Cal. Flow", asc: SensorTypesIndicesOrderBy.CalFlowRateAsc, desc: SensorTypesIndicesOrderBy.CalFlowRateDesc },
    { key: 'electrolyte', label: "Electrolyte", asc: SensorTypesIndicesOrderBy.ElectrolyteNameAsc, desc: SensorTypesIndicesOrderBy.ElectrolyteNameDesc },
    { key: 'membrane', label: "Membrane", asc: SensorTypesIndicesOrderBy.MembraneNameAsc, desc: SensorTypesIndicesOrderBy.MembraneNameDesc },
    { key: 'o_ring', label: "O-Ring", asc: SensorTypesIndicesOrderBy.ORingNameAsc, desc: SensorTypesIndicesOrderBy.ORingNameDesc },
    { key: 'sheet', label: "Sheet", asc: SensorTypesIndicesOrderBy.SiliconeSheetAsc, desc: SensorTypesIndicesOrderBy.SiliconeSheetDesc },
    { key: 'pyrolyser', label: "Pyro", asc: SensorTypesIndicesOrderBy.PyrolyserNameAsc, desc: SensorTypesIndicesOrderBy.PyrolyserNameDesc },
    { key: 'filter', label: "Filter", asc: SensorTypesIndicesOrderBy.FilterNameAsc, desc: SensorTypesIndicesOrderBy.FilterNameDesc },
    { key: 'restrictor', label: "Restr.", asc: SensorTypesIndicesOrderBy.RestrictorAsc, desc: SensorTypesIndicesOrderBy.RestrictorDesc },
    { key: 'battery', label: "Batt.", asc: SensorTypesIndicesOrderBy.BatteryAsc, desc: SensorTypesIndicesOrderBy.BatteryDesc },
    { key: 'seal', label: "Seal", asc: SensorTypesIndicesOrderBy.MembraneSealAsc, desc: SensorTypesIndicesOrderBy.MembraneSealDesc },
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
        model: { url: null, value: sensorType?.model } as TableField,
        target: { url: null, value: sensorType?.target } as TableField,
        range: { url: null, value: sensorType?.highEu } as TableField,
        engineering_units: { url: null, value: sensorType?.engineeringUnits } as TableField,
        flow: { url: null, value: sensorType?.flowRate } as TableField,
        calgasname: { url: null, value: sensorType?.calGasName } as TableField,
        calunits: { url: null, value: sensorType?.calEngineeringUnits } as TableField,
        calresponse: { url: null, value: sensorType?.calResponse } as TableField,
        calflow: { url: null, value: sensorType?.calFlowRate } as TableField,
        calgasconcentration: { url: null, value: sensorType?.calGasConcentration } as TableField,
        electrolyte: { url: null, value: sensorType?.electrolyteName } as TableField,
        membrane: { url: null, value: sensorType?.membraneName } as TableField,
        o_ring: { url: null, value: sensorType?.oRingName } as TableField,
        sheet: { url: null, value: sensorType?.siliconeSheet } as TableField,
        pyrolyser: { url: null, value: sensorType?.pyrolyserName } as TableField,
        filter: { url: null, value: sensorType?.filterName } as TableField,
        restrictor: { url: null, value: sensorType?.restrictor } as TableField,
        battery: { url: null, value: sensorType?.battery } as TableField,
        seal: { url: null, value: sensorType?.membraneSeal } as TableField,
      };
    });
  }


}
