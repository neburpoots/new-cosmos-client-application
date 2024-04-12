import { Component, OnInit, ViewChild } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { TableField } from "../../../../models/utils/tableField";

import { ToastrService } from "ngx-toastr";
import { ActivatedRoute, Router } from "@angular/router";
import { AllSensorTypesIndicesGQL,  DeleteSensorTypeGQL,  QueryAllSensorTypesIndicesArgs,  SensorTypesIndex, SensorTypesIndicesOrderBy } from "../../../../../generated/graphql";
import { SearchFilters } from "../../../../models/utils/searchFilters";
import { BaseEntity } from "../../base/base-entity.component";
import { Observable } from "rxjs";
import { TableHead } from "../../../../models/utils/tableHead";
import { SensorTypesFormComponent } from "../../sensor-types/form/sensor-types-form.component";

@Component({
  selector: "app-sensor-types-assembly",
  templateUrl: "./sensor-types-assembly.component.html",
})

export class SensorTypeAssembliesComponent extends BaseEntity<SensorTypesIndex> implements OnInit {

  @ViewChild('editModal') childComponent!: SensorTypesFormComponent;

  objectSingle = 'Sensor Type';
  objectPlural = 'Sensor Types Assembly';

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
    { type: 'string', key: 'prefix', label: "Prefix", asc: SensorTypesIndicesOrderBy.PrefixAsc, desc: SensorTypesIndicesOrderBy.PrefixDesc },
    { type: 'string', key: 'code', label: "Code", asc: SensorTypesIndicesOrderBy.CodeAsc, desc: SensorTypesIndicesOrderBy.CodeDesc },
    { type: 'string', key: 'suffix', label: "Suffix", asc: SensorTypesIndicesOrderBy.SuffixAsc, desc: SensorTypesIndicesOrderBy.SuffixDesc },
    { type: 'string', key: 'model', label: "Model", asc: SensorTypesIndicesOrderBy.ModelAsc, desc: SensorTypesIndicesOrderBy.ModelDesc },
    { type: 'string', key: 'target', label: "Target", asc: SensorTypesIndicesOrderBy.TargetAsc, desc: SensorTypesIndicesOrderBy.TargetDesc },
    { type: 'number', key: 'highEu', label: "Range", asc: SensorTypesIndicesOrderBy.HighEuAsc, desc: SensorTypesIndicesOrderBy.HighEuDesc },
    { type: 'number', key: 'engineeringUnits', label: "Units", asc: SensorTypesIndicesOrderBy.EngineeringUnitsAsc, desc: SensorTypesIndicesOrderBy.EngineeringUnitsDesc },
    { type: 'number', key: 'flowRate', label: "Flow", asc: SensorTypesIndicesOrderBy.FlowRateAsc, desc: SensorTypesIndicesOrderBy.FlowRateDesc },
    { type: 'string', key: 'calGasName', label: "Cal. Gas", asc: SensorTypesIndicesOrderBy.CalGasNameAsc, desc: SensorTypesIndicesOrderBy.CalGasNameDesc },
    { type: 'number', key: 'calGasConcentration', label: "Cal. Conc.", asc: SensorTypesIndicesOrderBy.CalGasConcentrationAsc, desc: SensorTypesIndicesOrderBy.CalGasConcentrationDesc },
    { type: 'number', key: 'calEngineeringUnits', label: "Cal. Units.", asc: SensorTypesIndicesOrderBy.CalEngineeringUnitsAsc, desc: SensorTypesIndicesOrderBy.CalEngineeringUnitsDesc },
    { type: 'number', key: 'calResponse', label: "Cal. Resp.", asc: SensorTypesIndicesOrderBy.CalResponseAsc, desc: SensorTypesIndicesOrderBy.CalResponseDesc},
    { type: 'number', key: 'calFlowRate', label: "Cal. Flow", asc: SensorTypesIndicesOrderBy.CalFlowRateAsc, desc: SensorTypesIndicesOrderBy.CalFlowRateDesc },
    { type: 'string', key: 'electrolyteName', label: "Electrolyte", asc: SensorTypesIndicesOrderBy.ElectrolyteNameAsc, desc: SensorTypesIndicesOrderBy.ElectrolyteNameDesc },
    { type: 'string', key: 'membraneName', label: "Membrane", asc: SensorTypesIndicesOrderBy.MembraneNameAsc, desc: SensorTypesIndicesOrderBy.MembraneNameDesc },
    { type: 'string', key: 'oRingName', label: "O-Ring", asc: SensorTypesIndicesOrderBy.ORingNameAsc, desc: SensorTypesIndicesOrderBy.ORingNameDesc },
    { type: 'boolean', key: 'siliconeSheet', label: "Sheet", asc: SensorTypesIndicesOrderBy.SiliconeSheetAsc, desc: SensorTypesIndicesOrderBy.SiliconeSheetDesc },
    { type: 'string', key: 'pyrolyserName', label: "Pyro", asc: SensorTypesIndicesOrderBy.PyrolyserNameAsc, desc: SensorTypesIndicesOrderBy.PyrolyserNameDesc },
    { type: 'string', key: 'filterName', label: "Filter", asc: SensorTypesIndicesOrderBy.FilterNameAsc, desc: SensorTypesIndicesOrderBy.FilterNameDesc },
    { type: 'boolean', key: 'restrictor', label: "Restr.", asc: SensorTypesIndicesOrderBy.RestrictorAsc, desc: SensorTypesIndicesOrderBy.RestrictorDesc },
    { type: 'boolean', key: 'battery', label: "Batt.", asc: SensorTypesIndicesOrderBy.BatteryAsc, desc: SensorTypesIndicesOrderBy.BatteryDesc },
    { type: 'boolean', key: 'membraneSeal', label: "Seal", asc: SensorTypesIndicesOrderBy.MembraneSealAsc, desc: SensorTypesIndicesOrderBy.MembraneSealDesc },
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
        model: { url: null, value: sensorType?.model } as TableField,
        target: { url: null, value: sensorType?.target } as TableField,
        highEu: { url: null, value: sensorType?.highEu } as TableField,
        engineeringUnits: { url: null, value: sensorType?.engineeringUnits } as TableField,
        flowRate: { url: null, value: sensorType?.flowRate } as TableField,
        calGasName: { url: null, value: sensorType?.calGasName } as TableField,
        calEngineeringUnits: { url: null, value: sensorType?.calEngineeringUnits } as TableField,
        calResponse: { url: null, value: sensorType?.calResponse } as TableField,
        calFlowRate: { url: null, value: sensorType?.calFlowRate } as TableField,
        calGasConcentration: { url: null, value: sensorType?.calGasConcentration } as TableField,
        electrolyteName: { url: null, value: sensorType?.electrolyteName } as TableField,
        membraneName: { url: null, value: sensorType?.membraneName } as TableField,
        oRingName: { url: null, value: sensorType?.oRingName } as TableField,
        siliconeSheet: { url: null, value: sensorType?.siliconeSheet } as TableField,
        pyrolyserName: { url: null, value: sensorType?.pyrolyserName } as TableField,
        filterName: { url: null, value: sensorType?.filterName } as TableField,
        restrictor: { url: null, value: sensorType?.restrictor } as TableField,
        battery: { url: null, value: sensorType?.battery } as TableField,
        membraneSeal: { url: null, value: sensorType?.membraneSeal } as TableField,
      };
    });
  }


}
