import { Component, OnInit, ViewChild } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { TableField } from "../../../../models/utils/tableField";

import { ToastrService } from "ngx-toastr";
import { ActivatedRoute, Router } from "@angular/router";
import { AllAreaEntitiesGQL, AllFloorEntitiesGQL, AreaEntitiesOrderBy, AreaEntity, DeleteAreaGQL, DeleteFloorGQL, FloorEntitiesOrderBy, FloorEntity, QueryAllFloorEntitiesArgs} from "../../../../../generated/graphql";
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

  searchCriteria: QueryAllFloorEntitiesArgs = {
    orderBy: [FloorEntitiesOrderBy.IdDesc],
    first: 10,
    offset: 0,
    filter: {
      and: [

      ]
    },
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
  ,
    protected override router: Router
  ) {
    super(router, toastr, route, http, floorService, deleteFloorService);

this.checkQueryParams();

this.nodes$ = this.loadData(this.searchCriteria);  }

  tableHeaders: TableHead<FloorEntitiesOrderBy>[] = [
    { type: 'string', key: 'endUserName', label: "End User", asc: FloorEntitiesOrderBy.EndUserNameAsc, desc: FloorEntitiesOrderBy.EndUserNameDesc },
    { type: 'string', key: 'buildingName', label: "Building", asc: FloorEntitiesOrderBy.BuildingNameAsc, desc: FloorEntitiesOrderBy.BuildingNameDesc },
    { type: 'string', key: 'name', label: "Floor", asc: FloorEntitiesOrderBy.NameAsc, desc: FloorEntitiesOrderBy.NameDesc },
    { type: 'datetime', key: 'created', label: "Created", asc: FloorEntitiesOrderBy.CreatedAsc, desc: FloorEntitiesOrderBy.CreatedDesc },
    { type: 'string', key: 'initials', label: "By", asc: FloorEntitiesOrderBy.InitialsAsc, desc: FloorEntitiesOrderBy.InitialsDesc },
  ]


  mapTableData(floors: FloorEntity[]): any[] {
    console.log(floors)
    return floors.map((floor: FloorEntity) => {
      return {
        id: { url: null, value: floor.id } as TableField,
        endUserName: { url: null, value: floor?.endUserName } as TableField,
        buildingName: { url: null, value: floor?.buildingName } as TableField,
        name: { url: null, value: floor?.name } as TableField,
        created: { url: null, value: floor?.created } as TableField,
        initials: { url: null, value: floor?.initials } as TableField,
      };
    });
  }
}
