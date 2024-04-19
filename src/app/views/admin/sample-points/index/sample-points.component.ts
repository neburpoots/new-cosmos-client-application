import { Component, OnInit, ViewChild } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { TableField } from "../../../../models/utils/tableField";

import { ToastrService } from "ngx-toastr";
import { ActivatedRoute, Router } from "@angular/router";
import { AllAreaEntitiesGQL, AllSamplePointEntitiesGQL, AreaEntitiesOrderBy, AreaEntity, DeleteAreaGQL, DeleteSamplePointGQL, QueryAllSamplePointEntitiesArgs, SamplePointEntitiesOrderBy, SamplePointEntity } from "../../../../../generated/graphql";
import { SearchFilters } from "../../../../models/utils/searchFilters";
import { BaseEntity } from "../../base/base-entity.component";
import { Observable } from "rxjs";
import { TableHead } from "../../../../models/utils/tableHead";
import { SamplePointsFormComponent } from "../form/sample-point-form.component";
import { FileService } from "../../../../services/file/file.service";
import { AuthService } from "../../../../services/authentication/auth.service";

@Component({
  selector: "app-sample-points",
  templateUrl: "./sample-points.component.html",
})

export class SamplePointsComponent extends BaseEntity<SamplePointEntity> implements OnInit {

  @ViewChild('editModal') childComponent!: SamplePointsFormComponent;

  objectSingle = 'Sample Point';
  objectPlural = 'Sample Points';

  searchCriteria: QueryAllSamplePointEntitiesArgs = {
    orderBy: [SamplePointEntitiesOrderBy.IdDesc],
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
    private deleteSamplePointService: DeleteSamplePointGQL,
    protected override router: Router,
    protected override fileService: FileService,
    protected override authService : AuthService

  ) {
    super(authService, fileService, router, toastr, route, http, samplePointService, deleteSamplePointService);

    this.checkQueryParams();

    this.nodes$ = this.loadData(this.searchCriteria);
  }

  tableHeaders: TableHead<SamplePointEntitiesOrderBy>[] = [
    { type: 'string', key: 'endUserName', label: "End User", asc: SamplePointEntitiesOrderBy.EndUserNameAsc, desc: SamplePointEntitiesOrderBy.EndUserNameDesc },
    { type: 'string', key: 'buildingName', label: "Building", asc: SamplePointEntitiesOrderBy.BuildingNameAsc, desc: SamplePointEntitiesOrderBy.BuildingNameDesc },
    { type: 'string', key: 'floorName', label: "Floor", asc: SamplePointEntitiesOrderBy.FloorNameAsc, desc: SamplePointEntitiesOrderBy.FloorNameDesc },
    { type: 'string', key: 'areaName', label: "Area", asc: SamplePointEntitiesOrderBy.AreaNameAsc, desc: SamplePointEntitiesOrderBy.AreaNameDesc },
    { type: 'string', key: 'name', label: "Tool", asc: SamplePointEntitiesOrderBy.NameAsc, desc: SamplePointEntitiesOrderBy.NameDesc },
    { type: 'datetime', key: 'created', label: "Created", asc: SamplePointEntitiesOrderBy.CreatedAsc, desc: SamplePointEntitiesOrderBy.CreatedDesc },
    { type: 'string', key: 'initials', label: "By", asc: SamplePointEntitiesOrderBy.InitialsAsc, desc: SamplePointEntitiesOrderBy.InitialsDesc },
  ]


  mapTableData(samplePoints: SamplePointEntity[]): any[] {
    return samplePoints.map((samplePoint: SamplePointEntity) => {
      return {
        id: { url: null, value: samplePoint.id } as TableField,
        endUserName: { url: null, value: samplePoint?.endUserName } as TableField,
        buildingName: { url: null, value: samplePoint?.buildingName } as TableField,
        floorName: { url: null, value: samplePoint?.floorName } as TableField,
        areaName: { url: null, value: samplePoint?.areaName } as TableField,
        name: { url: null, value: samplePoint?.name } as TableField,
        created: { url: null, value: samplePoint?.created } as TableField,
        initials: { url: null, value: samplePoint?.initials } as TableField,
      };
    });
  }


}
