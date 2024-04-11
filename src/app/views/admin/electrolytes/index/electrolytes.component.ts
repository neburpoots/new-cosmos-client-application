import { Component, OnInit, ViewChild } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { TableField } from "../../../../models/utils/tableField";

import { ToastrService } from "ngx-toastr";
import { ActivatedRoute, Router } from "@angular/router";
import { AllElectrolyteEntitiesGQL, AllMembraneEntitiesGQL, AllORingEntitiesGQL, AllPyrolyserEntitiesGQL,  DeleteElectrolyteGQL,  DeleteMembraneGQL,  DeletePyrolyserGQL, ElectrolyteEntitiesOrderBy, ElectrolyteEntity, ElectrolytesOrderBy, MembraneEntitiesOrderBy, MembraneEntity, ORingEntitiesOrderBy, ORingEntity, PyrolyserEntitiesOrderBy, PyrolyserEntity } from "../../../../../generated/graphql";
import { SearchFilters } from "../../../../models/utils/searchFilters";
import { BaseEntity } from "../../base/base-entity.component";
import { Observable } from "rxjs";
import { TableHead } from "../../../../models/utils/tableHead";
import { ElectrolytesFormComponent } from "../form/electrolytes-form.component";

@Component({
  selector: "app-electrolytes",
  templateUrl: "./electrolytes.component.html",
})

export class ElectrolytesComponent extends BaseEntity<ElectrolyteEntity> implements OnInit {

  @ViewChild('editModal') childComponent!: ElectrolytesFormComponent;

  objectSingle = 'Electrolyte';
  objectPlural = 'Electrolytes';

  searchCriteria: SearchFilters = {
    orderBy: [ElectrolyteEntitiesOrderBy.IdDesc],
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
      name: this.selectedItem?.name,
      cdartikel: this.selectedItem?.cdartikel,
      replacement_interval_months: this.selectedItem?.replacementIntervalMonths,
      volume: this.selectedItem?.volume,
    };
  }

  //IMPORTANT THIS IS THE NAME OF THE OBJECT IN DATA: {allGases: {nodes: []}}
  //json return object for getter
  //This is the object name of the nodes: return
  //check the get all method and see what it returns and set to this object
  Key = 'allElectrolyteEntities';


  //This is the fallback order by on changes in the table
  baseOrderBy = ElectrolytesOrderBy.IdDesc;

  override nodes$: Observable<Array<ElectrolyteEntity>>;

  constructor(protected override toastr: ToastrService, protected override route: ActivatedRoute, protected override http: HttpClient,
    private electrolyteService: AllElectrolyteEntitiesGQL,
    private deleteElectrolyteService: DeleteElectrolyteGQL
  ,
    protected override router: Router
  ) {
    super(router, toastr, route, http, electrolyteService, deleteElectrolyteService);

this.checkQueryParams();

this.nodes$ = this.loadData(this.searchCriteria);  }

  tableHeaders: TableHead<ElectrolyteEntitiesOrderBy>[] = [
    { key: 'part', label: "Part", asc: ElectrolyteEntitiesOrderBy.CdartikelAsc, desc: ElectrolyteEntitiesOrderBy.CdartikelDesc },
    { key: 'name', label: "Name", asc: ElectrolyteEntitiesOrderBy.NameAsc, desc: ElectrolyteEntitiesOrderBy.NameDesc },
    { key: 'omschr', label: "Description", asc: ElectrolyteEntitiesOrderBy.OmschrAsc, desc: ElectrolyteEntitiesOrderBy.OmschrDesc },
    { key: 'replacement_interval_months', label: "Rep. Int.", asc: ElectrolyteEntitiesOrderBy.ReplacementIntervalMonthsAsc, desc: ElectrolyteEntitiesOrderBy.ReplacementIntervalMonthsDesc },
    { key: 'volume', label: "Volume", asc: ElectrolyteEntitiesOrderBy.VolumeAsc, desc: ElectrolyteEntitiesOrderBy.VolumeDesc },
    { key: 'created', label: "Created", asc: ElectrolyteEntitiesOrderBy.CreatedAsc, desc: ElectrolyteEntitiesOrderBy.CreatedDesc },
    { key: 'by', label: "By", asc: ElectrolyteEntitiesOrderBy.InitialsAsc, desc: ElectrolyteEntitiesOrderBy.InitialsDesc },
  ]


  mapTableData(electrolytes: ElectrolyteEntity[]): any[] {
    return electrolytes.map((electrolyte: ElectrolyteEntity) => {
      return {
        id: { url: null, value: electrolyte.id } as TableField,
        part: { url: null, value: electrolyte?.cdartikel } as TableField,
        name: { url: null, value: electrolyte?.name } as TableField,
        omschr: { url: null, value: electrolyte?.omschr } as TableField,
        replacement_interval_months: { url: null, value: electrolyte?.replacementIntervalMonths } as TableField,
        volume: { url: null, value: electrolyte?.volume } as TableField,
        created: { url: null, value: electrolyte?.created } as TableField,
        by: { url: null, value: electrolyte?.initials } as TableField,
      };
    });
  }


}
