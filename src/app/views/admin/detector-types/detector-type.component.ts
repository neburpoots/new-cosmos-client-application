import { Component, OnInit, ViewChild } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { TableField } from "../../../models/utils/tableField";
import { ToastrService } from "ngx-toastr";
import { TableHeader } from "../../../models/utils/tableHeader";
import { ActivatedRoute, Router } from "@angular/router";
import { BaseEntity } from "../base/base-entity.component";
import { AllDetectorTypeEntitiesGQL, AllDetectorsEntitiesGQL, DeleteDetectorTypeGQL, DetectorEntitiesOrderBy, DetectorEntity, DetectorTypesEntitiesOrderBy, DetectorTypesEntity, QueryAllDetectorTypesEntitiesArgs } from "../../../../generated/graphql";
import { SearchFilters } from "../../../models/utils/searchFilters";
import { Observable } from "rxjs";
import { TableHead } from "../../../models/utils/tableHead";
import { DetectorTypeFormComponent } from "./form/detector-type-form.component";
import { FileService } from "../../../services/file/file.service";
import { AuthService } from "../../../services/authentication/auth.service";

@Component({
  selector: "app-detector",
  templateUrl: "./detector-type.component.html",
})

export class DetectorTypeComponent extends BaseEntity<DetectorTypesEntity> implements OnInit {

  @ViewChild('editModal') childComponent!: DetectorTypeFormComponent;

  //Name of the object
  objectSingle = 'Detector Type';
  objectPlural = 'Detector Types';


  //These are the search filters that are passed around to the pagination and table.
  //These values are updated in these components and then send as a paremeter to the fetch data component
  searchCriteria: QueryAllDetectorTypesEntitiesArgs = {
    orderBy: [DetectorTypesEntitiesOrderBy.IdDesc],
    first: 10,
    offset: 0,
    filter: {
      and: [

      ]
    },
  }

  //json return object for getter
  //This is the object name of the nodes: return
  //check the get all method and see what it returns and set to this object
  Key = 'detectorTypes';


  //This is the default order by for the table
  baseOrderBy = DetectorTypesEntitiesOrderBy.IdDesc;

  //The observable data that is retrieved
  override nodes$: Observable<Array<DetectorTypesEntity>>;

  ngOnInit(): void {
    console.log(this.nodes$);
    this.nodes$.subscribe(result => console.log(result));
  }

  override setEditData() {
    this.childComponent.setEditData(this.editData);
  }


  constructor(protected override toastr: ToastrService, protected override route: ActivatedRoute, protected override http: HttpClient,
    private detectorTypeEntitiesService: AllDetectorTypeEntitiesGQL,
    private deleteDetectorTypeService: DeleteDetectorTypeGQL,
    protected override router: Router,
    protected override fileService: FileService,
    protected override authService: AuthService
  ) {
    super(authService, fileService, router, toastr, route, http, detectorTypeEntitiesService, deleteDetectorTypeService);

    this.checkQueryParams();

    this.nodes$ = this.loadData(this.searchCriteria);
  }


  get editData(): any {
    console.log(this.selectedItem)
    return {
      id: this.selectedItem?.id,
      prefix: this.selectedItem?.prefix,
      code: this.selectedItem?.code,
      suffix: this.selectedItem?.suffix,
      sensor_count: this.selectedItem?.sensorCount,
    };
  }

  mapTableData(detectorTypes: DetectorTypesEntity[]): any[] {
    console.log(detectorTypes)
    return detectorTypes.map((detectorType: DetectorTypesEntity) => {
      return {
        id: { url: 'api/detectors', value: detectorType.id } as TableField,
        name: { url: 'api/detectorType', value: detectorType.name } as TableField,
        prefix: { url: null, value: detectorType?.prefix } as TableField,
        code: { url: null, value: detectorType?.code } as TableField,
        suffix: { url: null, value: detectorType?.suffix } as TableField,
        sensorCount: { url: null, value: detectorType?.sensorCount } as TableField,
        created: { url: null, value: detectorType?.created } as TableField,
        initials: { url: 'user/' + detectorType?.ownerId, value: detectorType?.initials } as TableField,
      };
    });
  }

  tableHeaders: TableHead<DetectorTypesEntitiesOrderBy>[] = [
    { type: 'string', key: 'name', label: "Type", asc: DetectorTypesEntitiesOrderBy.NameAsc, desc: DetectorTypesEntitiesOrderBy.NameDesc },
    { type: 'string', key: 'prefix', label: "Prefix", asc: DetectorTypesEntitiesOrderBy.PrefixAsc, desc: DetectorTypesEntitiesOrderBy.PrefixDesc },
    { type: 'string', key: 'code', label: "Code", asc: DetectorTypesEntitiesOrderBy.CodeAsc, desc: DetectorTypesEntitiesOrderBy.CodeDesc },
    { type: 'string', key: 'suffix', label: "Suffix", asc: DetectorTypesEntitiesOrderBy.SuffixAsc, desc: DetectorTypesEntitiesOrderBy.SuffixDesc },
    { type: 'number', key: 'sensorCount', label: "Sensors", asc: DetectorTypesEntitiesOrderBy.SensorCountAsc, desc: DetectorTypesEntitiesOrderBy.SensorCountDesc },
    { type: 'datetime', key: 'created', label: "Created", asc: DetectorTypesEntitiesOrderBy.CreatedAsc, desc: DetectorTypesEntitiesOrderBy.CreatedDesc },
    { type: 'string', key: 'initials', label: "By", asc: DetectorTypesEntitiesOrderBy.InitialsAsc, desc: DetectorTypesEntitiesOrderBy.InitialsDesc },
  ]

}
