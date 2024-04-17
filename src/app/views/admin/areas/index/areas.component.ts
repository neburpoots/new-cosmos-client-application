import { Component, OnInit, ViewChild } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { TableField } from "../../../../models/utils/tableField";

import { ToastrService } from "ngx-toastr";
import { ActivatedRoute, Router } from "@angular/router";
import { AllAreaEntitiesGQL, AreaEntitiesOrderBy, AreaEntity, DeleteAreaGQL, QueryAllAreaEntitiesArgs} from "../../../../../generated/graphql";
import { SearchFilters } from "../../../../models/utils/searchFilters";
import { BaseEntity } from "../../base/base-entity.component";
import { Observable } from "rxjs";
import { TableHead } from "../../../../models/utils/tableHead";
import { AreasFormComponent } from "../form/areas-form.component";
import { FileService } from "../../../../services/file/file.service";

@Component({
  selector: "app-areas",
  templateUrl: "./areas.component.html",
})

export class AreasComponent extends BaseEntity<AreaEntity> implements OnInit {


  @ViewChild('editModal') childComponent!: AreasFormComponent;

  objectSingle = 'Area';
  objectPlural = 'Areas';

  searchCriteria: QueryAllAreaEntitiesArgs = {
    orderBy: [AreaEntitiesOrderBy.IdDesc],
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
  ,
    protected override router: Router,
protected override fileService : FileService
  ) {
    super(fileService, router, toastr, route, http, areasService, deleteAreaService);

this.checkQueryParams();

this.nodes$ = this.loadData(this.searchCriteria);  }

  tableHeaders: TableHead<AreaEntitiesOrderBy>[] = [
    { type: 'string', key: 'endUserName', label: "End User", asc: AreaEntitiesOrderBy.EndUserNameAsc, desc: AreaEntitiesOrderBy.EndUserNameDesc },
    { type: 'string', key: 'buildingName', label: "Building", asc: AreaEntitiesOrderBy.BuildingNameAsc, desc: AreaEntitiesOrderBy.BuildingNameDesc },
    { type: 'string', key: 'floorName', label: "Floor", asc: AreaEntitiesOrderBy.FloorNameAsc, desc: AreaEntitiesOrderBy.FloorNameDesc },
    { type: 'string', key: 'name', label: "Area", asc: AreaEntitiesOrderBy.NameAsc, desc: AreaEntitiesOrderBy.NameDesc },
    { type: 'datetime', key: 'created', label: "Created", asc: AreaEntitiesOrderBy.CreatedAsc, desc: AreaEntitiesOrderBy.CreatedDesc },
    { type: 'string', key: 'initials', label: "By", asc: AreaEntitiesOrderBy.InitialsAsc, desc: AreaEntitiesOrderBy.InitialsDesc },
  ]


  mapTableData(areas: AreaEntity[]): any[] {
    console.log(areas)
    return areas.map((area: AreaEntity) => {
      return {
        id: { url: null, value: area.id } as TableField,
        endUserName: { url: null, value: area?.endUserName } as TableField,
        buildingName: { url: null, value: area?.buildingName } as TableField,
        floorName: { url: null, value: area?.floorName } as TableField,
        name: { url: null, value: area?.name } as TableField,
        created: { url: null, value: area?.created } as TableField,
        initials: { url: null, value: area?.initials } as TableField,
      };
    });
  }


}
