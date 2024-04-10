import { Component, OnInit, SimpleChanges, ViewChild } from "@angular/core";
import { HttpClient, HttpResponse } from "@angular/common/http";

import { TableField } from "../../../models/utils/tableField";
import { ToastrService } from "ngx-toastr";
import { DetectorFormComponent } from "./form/detector-form.component";
import { TableHeader } from "../../../models/utils/tableHeader";
import { ActivatedRoute } from "@angular/router";
import { BaseEntity } from "../base/base-entity.component";
import { AllDetectorsEntitiesGQL, DeleteDetectorGQL, DetectorEntitiesOrderBy, DetectorEntity, DetectorTypesOrderBy, DetectorsOrderBy } from "../../../../generated/graphql";
import { SearchFilters } from "../../../models/utils/searchFilters";
import { Observable } from "rxjs";
import { TableHead } from "../../../models/utils/tableHead";

@Component({
    selector: "app-detector",
    templateUrl: "./detector.component.html",
})

export class DetectorComponent extends BaseEntity<DetectorEntity> implements OnInit {

    @ViewChild('detectorEdit') childComponent!: DetectorFormComponent;

    tableHeaders: TableHead<DetectorEntitiesOrderBy>[] = [
        { key: 'detectorType', label: "Detector Type", asc: DetectorEntitiesOrderBy.PrefixAsc, desc: DetectorEntitiesOrderBy.PrefixDesc },
        { key: 'serial_number', label: "Serial Number", asc: DetectorEntitiesOrderBy.SerialNumberAsc, desc: DetectorEntitiesOrderBy.SerialNumberDesc },
        { key: 'label_date', label: "Label Date", asc: DetectorEntitiesOrderBy.LabelDateAsc, desc: DetectorEntitiesOrderBy.LabelDateDesc },
        { key: 'created', label: "Created", asc: DetectorEntitiesOrderBy.CreatedAsc, desc: DetectorEntitiesOrderBy.CreatedDesc },
        { key: 'by', label: "By", asc: DetectorEntitiesOrderBy.InitialsAsc, desc: DetectorEntitiesOrderBy.InitialsDesc },
      ]

    objectSingle = 'Detector';
    objectPlural = 'Detectors';

    
  searchCriteria: SearchFilters = {
    orderBy: [DetectorEntitiesOrderBy.IdDesc],
    search: "",
    limit: 10,
    offset: 0,
    totalPages: 0,
    total: 0,
    page: 1,
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
  ) {
    super(toastr, route, http, detectorEntitiesService, deleteDetectorService);

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
    
    mapTableData(detectors: DetectorEntity[]): any[] {
        console.log(detectors)
        return detectors.map((detector: DetectorEntity) => {
            return {
                id: { url: 'api/detectors', value: detector.id } as TableField,
                detectorType: { url: 'api/detectorType', value: `${detector?.prefix ?? ''}${detector?.code ?? ''}${detector?.suffix ?? ''}` } as TableField,
                serial_number: { url: null, value: detector?.serialNumber } as TableField,
                label_date: { url: null, value: detector?.labelDate } as TableField,
                created: { url: null, value: detector?.created } as TableField,
                by: { url: 'user/' + detector?.ownerId, value: detector?.initials } as TableField,
            };
        });
    }

}
