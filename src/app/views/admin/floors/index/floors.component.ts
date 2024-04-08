import { Component, OnInit, ViewChild } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { TableField } from "../../../../models/utils/tableField";

import { ToastrService } from "ngx-toastr";
import { ActivatedRoute } from "@angular/router";
import { AllAreaEntitiesGQL, AllFloorEntitiesGQL, AreaEntitiesOrderBy, AreaEntity, DeleteAreaGQL, DeleteFloorGQL, FloorEntitiesOrderBy, FloorEntity} from "../../../../../generated/graphql";
import { SearchFilters } from "../../../../models/utils/searchFilters";
import { BaseEntity } from "../../base/base-entity.component";
import { Observable } from "rxjs";
import { TableHead } from "../../../../models/utils/tableHead";
import { FloorFormComponent } from "../form/floors-form.component";

@Component({
  selector: "app-floors",
  templateUrl: "./floors.component.html",
})

export class FloorsComponent extends BaseEntity<FloorEntity> implements OnInit {


  @ViewChild('editModal') childComponent!: FloorFormComponent;

  objectSingle = 'Floor';
  objectPlural = 'Floors';

  searchCriteria: SearchFilters = {
    orderBy: [FloorEntitiesOrderBy.IdDesc],
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
      endUser: this.selectedItem?.endUserId,
      building: this.selectedItem?.buildingId,

    };
  }

  //IMPORTANT THIS IS THE NAME OF THE OBJECT IN DATA: {allGases: {nodes: []}}
  //json return object for getter
  //This is the object name of the nodes: return
  //check the get all method and see what it returns and set to this object
  Key = 'allFloorEntities';

  baseOrderBy = FloorEntitiesOrderBy.IdDesc;

  override nodes$: Observable<Array<FloorEntity>>;

  constructor(protected override toastr: ToastrService, protected override route: ActivatedRoute, protected override http: HttpClient,
    private floorService: AllFloorEntitiesGQL,
    private deleteFloorService: DeleteFloorGQL
  ) {
    super(toastr, route, http, floorService, deleteFloorService);

    this.nodes$ = this.loadData(this.searchCriteria);
  }

  tableHeaders: TableHead<FloorEntitiesOrderBy>[] = [
    { key: 'end_user_name', label: "End User", asc: FloorEntitiesOrderBy.EndUserNameAsc, desc: FloorEntitiesOrderBy.EndUserNameDesc },
    { key: 'building_name', label: "Building", asc: FloorEntitiesOrderBy.BuildingNameAsc, desc: FloorEntitiesOrderBy.BuildingNameDesc },
    { key: 'name', label: "Floor", asc: FloorEntitiesOrderBy.NameAsc, desc: FloorEntitiesOrderBy.NameDesc },
    { key: 'created', label: "Created", asc: FloorEntitiesOrderBy.CreatedAsc, desc: FloorEntitiesOrderBy.CreatedDesc },
    { key: 'by', label: "By", asc: FloorEntitiesOrderBy.InitialsAsc, desc: FloorEntitiesOrderBy.InitialsDesc },
  ]


  mapTableData(floors: FloorEntity[]): any[] {
    console.log(floors)
    return floors.map((floor: FloorEntity) => {
      return {
        id: { url: null, value: floor.id } as TableField,
        end_user_name: { url: null, value: floor?.endUserName } as TableField,
        building_name: { url: null, value: floor?.buildingName } as TableField,
        name: { url: null, value: floor?.name } as TableField,
        created: { url: null, value: floor?.created } as TableField,
        by: { url: null, value: floor?.initials } as TableField,
      };
    });
  }
}
