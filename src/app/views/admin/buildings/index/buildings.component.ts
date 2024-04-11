import { Component, OnInit, ViewChild } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { TableField } from "../../../../models/utils/tableField";

import { ToastrService } from "ngx-toastr";
import { ActivatedRoute, Router } from "@angular/router";
import { AllAreaEntitiesGQL, AllBuildingsGQL, AllFloorEntitiesGQL, AreaEntitiesOrderBy, AreaEntity, Building, BuildingsOrderBy, DeleteAreaGQL, DeleteBuildingGQL, DeleteFloorGQL, FloorEntitiesOrderBy, FloorEntity} from "../../../../../generated/graphql";
import { SearchFilters } from "../../../../models/utils/searchFilters";
import { BaseEntity } from "../../base/base-entity.component";
import { Observable } from "rxjs";
import { TableHead } from "../../../../models/utils/tableHead";
import { BuildingFormComponent } from "../form/building-form.component";

@Component({
  selector: "app-buildings",
  templateUrl: "./buildings.component.html",
})

export class BuildingsComponent extends BaseEntity<Building> implements OnInit {


  @ViewChild('editModal') childComponent!: BuildingFormComponent;

  objectSingle = 'Building';
  objectPlural = 'Buildings';

  searchCriteria: SearchFilters = {
    orderBy: [BuildingsOrderBy.IdDesc],
    search: "",
    limit: 10,
    offset: 0,
    totalPages: 0,
    total: 0,
    page: 1,
  }

  //Just a console log to check the data
  ngOnInit(): void {
    console.log(this.nodes$);
    this.nodes$.subscribe(result => console.log(result));
  }

  override setEditData() {
    console.log(this.editData)
    this.childComponent.setEditData(this.editData);
  }

  get editData(): any {
    console.log(this.selectedItem)
    return {
      id: this.selectedItem?.id,
      name: this.selectedItem?.name,
      endUser: this.selectedItem?.endUserByEndUserId?.id,
    };
  }

  //IMPORTANT THIS IS THE NAME OF THE OBJECT IN DATA: {allGases: {nodes: []}}
  //json return object for getter
  //This is the object name of the nodes: return
  //check the get all method and see what it returns and set to this object
  Key = 'allBuildings';

  baseOrderBy = BuildingsOrderBy.IdDesc;

  override nodes$: Observable<Array<Building>>;

  constructor(protected override toastr: ToastrService, protected override route: ActivatedRoute, protected override http: HttpClient,
    private buildingService: AllBuildingsGQL,
    private deleteBuildingService: DeleteBuildingGQL,
    protected override router: Router
  ) {
    super(router, toastr, route, http, buildingService, deleteBuildingService);

this.checkQueryParams();

this.nodes$ = this.loadData(this.searchCriteria);  }

  tableHeaders: TableHead<BuildingsOrderBy>[] = [
    { key: 'end_user_name', label: "End User", asc: BuildingsOrderBy.EndUserByEndUserIdNameAsc, desc: BuildingsOrderBy.EndUserByEndUserIdNameDesc },
    { key: 'name', label: "Building", asc: BuildingsOrderBy.NameAsc, desc: BuildingsOrderBy.NameDesc },
    { key: 'created', label: "Created", asc: BuildingsOrderBy.CreatedAsc, desc: BuildingsOrderBy.CreatedDesc },
    { key: 'by', label: "By", asc: BuildingsOrderBy.UserByOwnerIdInitialsAsc, desc: BuildingsOrderBy.UserByOwnerIdInitialsDesc },
  ]


  mapTableData(buildings: Building[]): any[] {
    return buildings.map((building: Building) => {
      return {
        id: { url: null, value: building.id } as TableField,
        end_user_name: { url: null, value: building?.endUserByEndUserId?.name } as TableField,
        name: { url: null, value: building?.name } as TableField,
        created: { url: null, value: building?.created } as TableField,
        by: { url: null, value: building?.userByOwnerId?.initials } as TableField,
      };
    });
  }
}
