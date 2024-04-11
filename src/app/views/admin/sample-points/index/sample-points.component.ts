import { Component, OnInit, ViewChild } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { TableField } from "../../../../models/utils/tableField";

import { ToastrService } from "ngx-toastr";
import { ActivatedRoute, Router } from "@angular/router";
import { AllAreaEntitiesGQL, AllSamplePointEntitiesGQL, AreaEntitiesOrderBy, AreaEntity, DeleteAreaGQL, DeleteSamplePointGQL, SamplePointEntitiesOrderBy, SamplePointEntity} from "../../../../../generated/graphql";
import { SearchFilters } from "../../../../models/utils/searchFilters";
import { BaseEntity } from "../../base/base-entity.component";
import { Observable } from "rxjs";
import { TableHead } from "../../../../models/utils/tableHead";
import { SamplePointsFormComponent } from "../form/sample-point-form.component";

@Component({
  selector: "app-sample-points",
  templateUrl: "./sample-points.component.html",
})

export class SamplePointsComponent extends BaseEntity<SamplePointEntity> implements OnInit {

  @ViewChild('editModal') childComponent!: SamplePointsFormComponent;

  objectSingle = 'Sample Point';
  objectPlural = 'Sample Points';

  searchCriteria: SearchFilters = {
    orderBy: [SamplePointEntitiesOrderBy.IdDesc],
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
      area: this.selectedItem?.areaId,
    };
  }

  //IMPORTANT THIS IS THE NAME OF THE OBJECT IN DATA: {allGases: {nodes: []}}
  //json return object for getter
  //This is the object name of the nodes: return
  //check the get all method and see what it returns and set to this object
  Key = 'allSamplePointEntities';

  baseOrderBy = SamplePointEntitiesOrderBy.IdDesc;

  override nodes$: Observable<Array<SamplePointEntity>>;

  constructor(protected override toastr: ToastrService, protected override route: ActivatedRoute, protected override http: HttpClient,
    private samplePointService: AllSamplePointEntitiesGQL,
    private deleteSamplePointService: DeleteSamplePointGQL
  ,
    protected override router: Router
  ) {
    super(router, toastr, route, http, samplePointService, deleteSamplePointService);

this.checkQueryParams();

this.nodes$ = this.loadData(this.searchCriteria);  }

  tableHeaders: TableHead<SamplePointEntitiesOrderBy>[] = [
    { key: 'end_user_name', label: "End User", asc: SamplePointEntitiesOrderBy.EndUserNameAsc, desc: SamplePointEntitiesOrderBy.EndUserNameDesc },
    { key: 'building_name', label: "Building", asc: SamplePointEntitiesOrderBy.BuildingNameAsc, desc: SamplePointEntitiesOrderBy.BuildingNameDesc },
    { key: 'floor_name', label: "Floor", asc: SamplePointEntitiesOrderBy.FloorNameAsc, desc: SamplePointEntitiesOrderBy.FloorNameDesc },
    { key: 'area_name', label: "Area", asc: SamplePointEntitiesOrderBy.AreaNameAsc, desc: SamplePointEntitiesOrderBy.AreaNameDesc },
    { key: 'name', label: "Tool", asc: SamplePointEntitiesOrderBy.NameAsc, desc: SamplePointEntitiesOrderBy.NameDesc },
    { key: 'created', label: "Created", asc: SamplePointEntitiesOrderBy.CreatedAsc, desc: SamplePointEntitiesOrderBy.CreatedDesc },
    { key: 'by', label: "By", asc: SamplePointEntitiesOrderBy.InitialsAsc, desc: SamplePointEntitiesOrderBy.InitialsDesc },
  ]


  mapTableData(areas: SamplePointEntity[]): any[] {
    console.log(areas)
    return areas.map((area: SamplePointEntity) => {
      return {
        id: { url: null, value: area.id } as TableField,
        end_user_name: { url: null, value: area?.endUserName } as TableField,
        building_name: { url: null, value: area?.buildingName } as TableField,
        floor_name: { url: null, value: area?.floorName } as TableField,
        area_name: { url: null, value: area?.areaName } as TableField,
        name: { url: null, value: area?.name } as TableField,
        created: { url: null, value: area?.created } as TableField,
        by: { url: null, value: area?.initials } as TableField,
      };
    });
  }


}
