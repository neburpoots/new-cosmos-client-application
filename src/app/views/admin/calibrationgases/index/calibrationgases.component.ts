import { Component, OnInit, SimpleChanges, ViewChild } from "@angular/core";
import { HttpClient, HttpResponse } from "@angular/common/http";

import { TableField } from "../../../../models/utils/tableField";
import { ToastrService } from "ngx-toastr";
import { CalibrationGasesFormComponent } from "../form/calibrationgases-form.component";
import { TableHeader } from "../../../../models/utils/tableHeader";
import { ActivatedRoute } from "@angular/router";
import { CalGasEntitiesGQL, CalGasesOrderBy, CalgasEntitiesOrderBy, CalgasEntity, DeleteCalGasGQL } from "../../../../../generated/graphql";
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

  searchCriteria: SearchFilters = {
    orderBy: [CalgasEntitiesOrderBy.IdDesc],
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
    private calGasService: CalGasEntitiesGQL,
    private deleteCalGasService: DeleteCalGasGQL
  ) {
    super(toastr, route, http, calGasService, deleteCalGasService);

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
    { key: 'gas', label: "Gas", asc: CalgasEntitiesOrderBy.NameAsc, desc: CalgasEntitiesOrderBy.NameDesc },
    { key: 'concentration', label: "Concentration", asc: CalgasEntitiesOrderBy.ConcentrationAsc, desc: CalgasEntitiesOrderBy.ConcentrationDesc },
    { key: 'engineering_units', label: "Engineering Units", asc: CalgasEntitiesOrderBy.EngineeringUnitsAsc, desc: CalgasEntitiesOrderBy.EngineeringUnitsDesc },
    { key: 'cdartikel', label: "CD Artikel", asc: CalgasEntitiesOrderBy.CdartikelAsc, desc: CalgasEntitiesOrderBy.CdartikelDesc },
    { key: 'created', label: "Created", asc: CalgasEntitiesOrderBy.CreatedAsc, desc: CalgasEntitiesOrderBy.CreatedDesc },
    { key: 'by', label: "By", asc: CalgasEntitiesOrderBy.InitialsAsc, desc: CalgasEntitiesOrderBy.InitialsDesc },
  ]


  mapTableData(calGasses: CalgasEntity[]): any[] {
    console.log(calGasses)
    return calGasses.map((calgas: CalgasEntity) => {
      return {
        id: { url: 'api/calGasses', value: calgas.id } as TableField,
        gas: { url: null, value: calgas?.name } as TableField,
        concentration: { url: null, value: calgas?.concentration } as TableField,
        engineering_units: { url: null, value: calgas?.engineeringUnits } as TableField,
        cdartikel: { url: null, value: calgas?.cdartikel } as TableField,
        created: { url: null, value: calgas.created } as TableField,
        by: { url: null, value: calgas?.initials } as TableField,
      };
    });
  }


}
