import { Component, OnInit, SimpleChanges, ViewChild } from "@angular/core";
import { HttpClient, HttpResponse } from "@angular/common/http";

import { TableField } from "../../../models/utils/tableField";
import { ToastrService } from "ngx-toastr";
import { DetectorFormComponent } from "./form/detector-form.component";
import { TableHeader } from "../../../models/utils/tableHeader";
import { ActivatedRoute, Router } from "@angular/router";
import { BaseEntity } from "../base/base-entity.component";
import { AllDetectorsEntitiesGQL, DeleteDetectorGQL, DetectorEntitiesOrderBy, DetectorEntity, DetectorTypesOrderBy, DetectorsOrderBy, QueryAllDetectorEntitiesArgs } from "../../../../generated/graphql";
import { SearchFilters } from "../../../models/utils/searchFilters";
import { Observable } from "rxjs";
import { TableHead } from "../../../models/utils/tableHead";
import { FileService } from "../../../services/file/file.service";

@Component({
  selector: "app-detector",
  templateUrl: "./detector.component.html",
})

export class DetectorComponent extends BaseEntity<DetectorEntity> implements OnInit {

  @ViewChild('detectorEdit') childComponent!: DetectorFormComponent;


  objectSingle = 'Detector';
  objectPlural = 'Detectors';


  searchCriteria: QueryAllDetectorEntitiesArgs = {
    orderBy: [DetectorEntitiesOrderBy.IdDesc],
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
  Key = 'detectors';

  baseOrderBy = DetectorEntitiesOrderBy.IdDesc;

  override nodes$: Observable<Array<DetectorEntity>>;

  ngOnInit(): void {
    console.log(this.nodes$);
    this.nodes$.subscribe(result => console.log(result));
  }


  override setEditData() {
    console.log(this.editData)
    this.childComponent.setEditData(this.editData);
  }


  constructor(protected override toastr: ToastrService, protected override route: ActivatedRoute, protected override http: HttpClient,
    private detectorEntitiesService: AllDetectorsEntitiesGQL,
    private deleteDetectorService: DeleteDetectorGQL
    ,
    protected override router: Router,
    protected override fileService: FileService
  ) {
    super(fileService, router, toastr, route, http, detectorEntitiesService, deleteDetectorService);

    this.checkQueryParams();

    this.nodes$ = this.loadData(this.searchCriteria);
  }


  get editData(): any {
    return {
      id: this.selectedItem?.id,
      // batch: this.selectedItem?.code,
      // start_serial_number: this.selectedItem?.startSerialNumber,
      // selectedOption: this.selectedItem?.assemblyType.id,
      // quantity: this.selectedItem?.quantity,
    };
  }

  tableHeaders: TableHead<DetectorEntitiesOrderBy>[] = [
    { type: 'string', key: 'name', label: "Detector Type", asc: DetectorEntitiesOrderBy.PrefixAsc, desc: DetectorEntitiesOrderBy.PrefixDesc },
    { type: 'string', key: 'serialNumber', label: "Serial Number", asc: DetectorEntitiesOrderBy.SerialNumberAsc, desc: DetectorEntitiesOrderBy.SerialNumberDesc },
    { type: 'datetime', key: 'labelDate', label: "Label Date", asc: DetectorEntitiesOrderBy.LabelDateAsc, desc: DetectorEntitiesOrderBy.LabelDateDesc },
    { type: 'datetime', key: 'created', label: "Created", asc: DetectorEntitiesOrderBy.CreatedAsc, desc: DetectorEntitiesOrderBy.CreatedDesc },
    { type: 'string', key: 'initials', label: "By", asc: DetectorEntitiesOrderBy.InitialsAsc, desc: DetectorEntitiesOrderBy.InitialsDesc },
  ]

  mapTableData(detectors: DetectorEntity[]): any[] {

    return detectors.map((detector: DetectorEntity) => {
      return {
        id: { url: 'api/detectors', value: detector.id } as TableField,
        name: { url: 'api/detectorType', value: detector?.name } as TableField,
        serialNumber: { url: null, value: detector?.serialNumber } as TableField,
        labelDate: { url: null, value: detector?.labelDate } as TableField,
        created: { url: null, value: detector?.created } as TableField,
        initials: { url: 'user/' + detector?.ownerId, value: detector?.initials } as TableField,
      };
    });
  }

}
