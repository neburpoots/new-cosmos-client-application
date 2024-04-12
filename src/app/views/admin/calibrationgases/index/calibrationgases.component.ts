import { Component, OnInit, SimpleChanges, ViewChild } from "@angular/core";
import { HttpClient, HttpResponse } from "@angular/common/http";

import { TableField } from "../../../../models/utils/tableField";
import { ToastrService } from "ngx-toastr";
import { CalibrationGasesFormComponent } from "../form/calibrationgases-form.component";
import { TableHeader } from "../../../../models/utils/tableHeader";
import { ActivatedRoute, Router } from "@angular/router";
import { AllCalibrationGasesGQL, CalGasesOrderBy, CalgasEntitiesOrderBy, CalgasEntity, DeleteCalGasGQL, QueryAllCalgasEntitiesArgs } from "../../../../../generated/graphql";
import { SearchFilters } from "../../../../models/utils/searchFilters";
import { BaseEntity } from "../../base/base-entity.component";
import { Observable } from "rxjs";
import { TableHead } from "../../../../models/utils/tableHead";

@Component({
  selector: "app-calibrationgasses",
  templateUrl: "./calibrationgases.component.html",
})

export class CalibrationGasesComponent extends BaseEntity<CalgasEntity> implements OnInit {


  @ViewChild('editModal') childComponent!: CalibrationGasesFormComponent;

  objectSingle = 'Calibration gas';
  objectPlural = 'Calibration gases';

  searchCriteria: QueryAllCalgasEntitiesArgs = {
    orderBy: [CalgasEntitiesOrderBy.IdDesc],
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
      gas: this.selectedItem?.gasId,
      concentration: this.selectedItem?.concentration,
      cdartikel: this.selectedItem?.cdartikel,
      engineering_units: this.selectedItem?.engineeringUnits,
    };
  }


  //json return object for getter
  //This is the object name of the nodes: return
  //check the get all method and see what it returns and set to this object
  Key = 'calGases';

  baseOrderBy = CalgasEntitiesOrderBy.IdDesc;

  override nodes$: Observable<Array<CalgasEntity>>;

  constructor(protected override toastr: ToastrService, protected override route: ActivatedRoute, protected override http: HttpClient,
    private calGasService: AllCalibrationGasesGQL,
    private deleteCalGasService: DeleteCalGasGQL
    ,
    protected override router: Router
  ) {
    super(router, toastr, route, http, calGasService, deleteCalGasService);

    this.checkQueryParams();

    this.nodes$ = this.loadData(this.searchCriteria);
  }


  // tableHeaders : TableHeader[] = [
  //   { displayName: 'Gas', sortValue: 'gas.name', key: 'gas'  },
  //   { displayName: 'Concentration', sortValue: 'concentration', key: 'concentration'},
  //   { displayName: 'Engineering Units', sortValue: 'engineering_units', key: 'engineering_units'},
  //   { displayName: 'CD Artikel', sortValue: 'cdartikel', key: 'cdartikel'},
  //   { displayName: 'Created', sortValue: 'created', key: 'created'},
  //   { displayName: 'By', sortValue: 'owner.initials', key: 'by'},
  // ];

  tableHeaders: TableHead<CalgasEntitiesOrderBy>[] = [
    { type: 'string', key: 'name', label: "Gas", asc: CalgasEntitiesOrderBy.NameAsc, desc: CalgasEntitiesOrderBy.NameDesc },
    { type: 'number', key: 'concentration', label: "Concentration", asc: CalgasEntitiesOrderBy.ConcentrationAsc, desc: CalgasEntitiesOrderBy.ConcentrationDesc },
    { type: 'string', key: 'engineeringUnits', label: "Engineering Units", asc: CalgasEntitiesOrderBy.EngineeringUnitsAsc, desc: CalgasEntitiesOrderBy.EngineeringUnitsDesc },
    { type: 'string', key: 'cdartikel', label: "CD Artikel", asc: CalgasEntitiesOrderBy.CdartikelAsc, desc: CalgasEntitiesOrderBy.CdartikelDesc },
    { type: 'datetime', key: 'created', label: "Created", asc: CalgasEntitiesOrderBy.CreatedAsc, desc: CalgasEntitiesOrderBy.CreatedDesc },
    { type: 'string', key: 'initials', label: "By", asc: CalgasEntitiesOrderBy.InitialsAsc, desc: CalgasEntitiesOrderBy.InitialsDesc },
  ]


  mapTableData(calGasses: CalgasEntity[]): any[] {
    console.log(calGasses)
    return calGasses.map((calgas: CalgasEntity) => {
      return {
        id: { url: 'api/calGasses', value: calgas.id } as TableField,
        name: { url: null, value: calgas?.name } as TableField,
        concentration: { url: null, value: calgas?.concentration } as TableField,
        engineeringUnits: { url: null, value: calgas?.engineeringUnits } as TableField,
        cdartikel: { url: null, value: calgas?.cdartikel } as TableField,
        created: { url: null, value: calgas.created } as TableField,
        initials: { url: null, value: calgas?.initials } as TableField,
      };
    });
  }


}
