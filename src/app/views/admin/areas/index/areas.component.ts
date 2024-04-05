import { Component, OnInit, ViewChild } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { TableField } from "../../../../models/utils/tableField";

import { ToastrService } from "ngx-toastr";
import { ActivatedRoute } from "@angular/router";
import { AllAreaEntitiesGQL, AreaEntitiesOrderBy, AreaEntity, DeleteAreaGQL} from "../../../../../generated/graphql";
import { SearchFilters } from "../../../../models/utils/searchFilters";
import { BaseEntity } from "../../base/base-entity.component";
import { Observable } from "rxjs";
import { TableHead } from "../../../../models/utils/tableHead";
import { AreasFormComponent } from "../form/areas-form.component";

@Component({
  selector: "app-areas",
  templateUrl: "./areas.component.html",
})

export class AreasComponent extends BaseEntity<AreaEntity> implements OnInit {


  @ViewChild('editModal') childComponent!: AreasFormComponent;

  objectSingle = 'Area';
  objectPlural = 'Areas';

  searchCriteria: SearchFilters = {
    orderBy: [AreaEntitiesOrderBy.IdDesc],
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
    console.log(this.selectedItem)
    return {
      id: this.selectedItem?.id,
      name: this.selectedItem?.name,
      endUser: this.selectedItem?.endUserId,
      building: this.selectedItem?.buildingId,
      floor: this.selectedItem?.floorId,
      remarks: this.selectedItem?.remarks,
    };
  }

  //IMPORTANT THIS IS THE NAME OF THE OBJECT IN DATA: {allGases: {nodes: []}}
  //json return object for getter
  //This is the object name of the nodes: return
  //check the get all method and see what it returns and set to this object
  Key = 'allAreaEntities';

  baseOrderBy = AreaEntitiesOrderBy.IdDesc;

  override nodes$: Observable<Array<AreaEntity>>;

  constructor(protected override toastr: ToastrService, protected override route: ActivatedRoute, protected override http: HttpClient,
    private areasService: AllAreaEntitiesGQL,
    private deleteAreaService: DeleteAreaGQL
  ) {
    super(toastr, route, http, areasService, deleteAreaService);

    this.nodes$ = this.loadData(this.searchCriteria);
  }

  tableHeaders: TableHead<AreaEntitiesOrderBy>[] = [
    { key: 'end_user_name', label: "End User", asc: AreaEntitiesOrderBy.EndUserNameAsc, desc: AreaEntitiesOrderBy.EndUserNameDesc },
    { key: 'building_name', label: "Building", asc: AreaEntitiesOrderBy.BuildingNameAsc, desc: AreaEntitiesOrderBy.BuildingNameDesc },
    { key: 'floor_name', label: "Floor", asc: AreaEntitiesOrderBy.FloorNameAsc, desc: AreaEntitiesOrderBy.FloorNameDesc },
    { key: 'name', label: "Area", asc: AreaEntitiesOrderBy.NameAsc, desc: AreaEntitiesOrderBy.NameDesc },
    { key: 'created', label: "Created", asc: AreaEntitiesOrderBy.CreatedAsc, desc: AreaEntitiesOrderBy.CreatedDesc },
    { key: 'by', label: "By", asc: AreaEntitiesOrderBy.InitialsAsc, desc: AreaEntitiesOrderBy.InitialsDesc },
  ]


  mapTableData(areas: AreaEntity[]): any[] {
    console.log(areas)
    return areas.map((area: AreaEntity) => {
      return {
        id: { url: null, value: area.id } as TableField,
        end_user_name: { url: null, value: area?.endUserName } as TableField,
        building_name: { url: null, value: area?.buildingName } as TableField,
        floor_name: { url: null, value: area?.floorName } as TableField,
        name: { url: null, value: area?.name } as TableField,
        created: { url: null, value: area?.created } as TableField,
        by: { url: null, value: area?.initials } as TableField,
      };
    });
  }


}
