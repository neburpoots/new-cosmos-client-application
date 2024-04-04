import { Component, OnInit, ViewChild } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { TableField } from "../../../../models/utils/tableField";
import { ToastrService } from "ngx-toastr";
import { ActivatedRoute } from "@angular/router";
import { AllRangesGQL, DeleteRangeGQL, Range, RangesOrderBy } from "../../../../../generated/graphql";
import { SearchFilters } from "../../../../models/utils/searchFilters";
import { BaseEntity } from "../../base/base-entity.component";
import { Observable } from "rxjs";
import { TableHead } from "../../../../models/utils/tableHead";
import { RangesFormComponent } from "../form/ranges-form.component";

@Component({
  selector: "app-ranges",
  templateUrl: "./ranges.component.html",
})

export class RangesComponent extends BaseEntity<Range> implements OnInit {

  @ViewChild('editModal') childComponent!: RangesFormComponent;

  objectSingle = 'Range';
  objectPlural = 'Ranges';

  searchCriteria: SearchFilters = {
    orderBy: [RangesOrderBy.IdDesc],
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
      gasId: this.selectedItem?.gasByGasId?.id,
      lowEu: this.selectedItem?.lowEu,
      highEu: this.selectedItem?.highEu,
      engineeringUnits: this.selectedItem?.engineeringUnits,
      alarmUnits: this.selectedItem?.alarmUnits,
      alarm1Level: this.selectedItem?.alarm1Level,
      alarm1DirectionUp: this.selectedItem?.alarm1DirectionUp,
      alarm2Level: this.selectedItem?.alarm2Level,
      alarm2DirectionUp: this.selectedItem?.alarm2DirectionUp,
      warning1Level: this.selectedItem?.warning1Level,
      warning2Level: this.selectedItem?.warning2Level,
      precision: this.selectedItem?.precision,
    };
  }


  //json return object for getter
  //This is the object name of the nodes: return
  //check the get all method and see what it returns and set to this object
  Key = 'allRanges';

  baseOrderBy = RangesOrderBy.IdDesc;

  override nodes$: Observable<Array<Range>>;

  constructor(protected override toastr: ToastrService, protected override route: ActivatedRoute, protected override http: HttpClient,
    private rangeService: AllRangesGQL,
    private deleteRangeService: DeleteRangeGQL
  ) {
    super(toastr, route, http, rangeService, deleteRangeService);

    this.nodes$ = this.loadData(this.searchCriteria);
  }

  tableHeaders: TableHead<RangesOrderBy>[] = [
    { key: 'gas', label: "Gas", asc: RangesOrderBy.GasByGasIdNameAsc, desc: RangesOrderBy.GasByGasIdNameDesc },
    { key: 'lowEu', label: "Low Eu", asc: RangesOrderBy.LowEuAsc, desc: RangesOrderBy.LowEuDesc },
    { key: 'highEu', label: "High Eu", asc: RangesOrderBy.HighEuAsc, desc: RangesOrderBy.HighEuDesc },
    { key: 'engineeringUnits', label: "Engineering Units", asc: RangesOrderBy.EngineeringUnitsAsc, desc: RangesOrderBy.EngineeringUnitsDesc },
    { key: 'alarm1Level', label: "A1 Level", asc: RangesOrderBy.Alarm_1LevelAsc, desc: RangesOrderBy.Alarm_1LevelDesc },
    { key: 'alarm1DirectionUp', label: "A1 Dir.", asc: RangesOrderBy.Alarm_1DirectionUpAsc, desc: RangesOrderBy.Alarm_1DirectionUpDesc },
    { key: 'alarm2Level', label: "A2 Level", asc: RangesOrderBy.Alarm_2LevelAsc, desc: RangesOrderBy.Alarm_2LevelDesc },
    { key: 'alarm2DirectionUp', label: "A2 Dir.", asc: RangesOrderBy.Alarm_2DirectionUpAsc, desc: RangesOrderBy.Alarm_2DirectionUpDesc },
    { key: 'warning1Level', label: "W1 Level", asc: RangesOrderBy.Warning_1LevelAsc, desc: RangesOrderBy.Warning_1LevelDesc },
    { key: 'warning2Level', label: "W2 Level", asc: RangesOrderBy.Warning_2LevelAsc, desc: RangesOrderBy.Warning_2LevelDesc },
    { key: 'alarmUnits', label: "Alarm Units", asc: RangesOrderBy.AlarmUnitsAsc, desc: RangesOrderBy.AlarmUnitsDesc},
    { key: 'precision', label: "Precision", asc: RangesOrderBy.PrecisionAsc, desc: RangesOrderBy.PrecisionDesc },
  ]


  mapTableData(ranges: Range[]): any[] {
    console.log(ranges)
    return ranges.map((range: Range) => {
      return {
        id: { url: 'user/ranges', value: range.id } as TableField,
        gas: { url: null, value: range?.gasByGasId?.name } as TableField,
        lowEu: { url: null, value: range?.lowEu } as TableField,
        highEu: { url: null, value: range?.highEu } as TableField,
        engineeringUnits: { url: null, value: range?.engineeringUnits } as TableField,
        alarm1Level: { url: null, value: range?.alarm1Level } as TableField,
        alarm1DirectionUp: { url: null, value: range?.alarm1DirectionUp } as TableField,
        alarm2Level: { url: null, value: range?.alarm2Level } as TableField,
        alarm2DirectionUp: { url: null, value: range?.alarm2DirectionUp } as TableField,
        warning1Level: { url: null, value: range?.warning1Level } as TableField,
        warning2Level: { url: null, value: range.warning2Level } as TableField,
        alarmUnits: { url: null, value: range?.alarmUnits } as TableField,
        precision: { url: null, value: range?.precision } as TableField,
      };
    });
  }
}