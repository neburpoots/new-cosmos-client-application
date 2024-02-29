import { Component, OnInit, SimpleChanges, ViewChild } from "@angular/core";
import { HttpResponse } from "@angular/common/http";
import { PaginatedResult } from "../../../models/utils/pagination";
import { CalGas } from "../../../models/entities/calgas";
import { SearchCriteria } from "../../../models/utils/searchCriteria";
import { ModalWidth } from "../../../models/enums/modalWidth.enum";
import { CalGasService } from "../../../services/calgas/calgas.service";
import { IAbstractComponent } from "../../../models/interface/IAbstractComponent";
import { AbstractService } from "../../../services/abstract/abstract.service";
import { Detector } from "../../../models/entities/detector";
import { AbstractComponent } from "../abstract/abstract.component";
import { TableField } from "../../../models/utils/tableField";
import { ToastrService } from "ngx-toastr";
import { DetectorFormComponent } from "./form/detector-form.component";

@Component({
    selector: "app-detector",
    templateUrl: "./detector.component.html",
})

export class DetectorComponent extends AbstractComponent<Detector> implements OnInit, IAbstractComponent<Detector> {

    @ViewChild('detectorEdit') childComponent!: DetectorFormComponent;

    tableHeaders: string[] = ['detectorType', 'serial_number', 'label_date', 'created', 'by'];

    objectSingle = 'Detector';
    objectPlural = 'Detectors';

    constructor(protected override toastr: ToastrService, private detectorService: AbstractService<Detector>) {
        super(toastr, detectorService);
        this.abstractService = detectorService;
        this.url = 'api/detectors';
    }

    override setEditData() {
        console.log(this.editData)
        this.childComponent.setEditData(this.editData);
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

    override createUrlParams(): string {
        return `${this.url}?orderBy=${this.searchCriteria.orderBy.orderByColumn}&sort=${this.searchCriteria.orderBy.orderByDirection}&page=${this.data.page}&searchQuery=${encodeURIComponent(this.searchCriteria.searchValue!)}`;
    }
    
    mapTableData(detectors: Detector[]): any[] {
        console.log(detectors)
        return detectors.map((detector: Detector) => {
            return {
                id: { url: 'api/detectors', value: detector.id } as TableField,
                detectorType: { url: 'api/detectorType', value: `${detector?.detectorType?.prefix ?? ''}${detector?.detectorType?.code ?? ''}${detector?.detectorType?.suffix ?? ''}` } as TableField,
                serial_number: { url: null, value: detector?.serial_number } as TableField,
                label_date: { url: null, value: detector?.label_date } as TableField,
                created: { url: null, value: detector?.created } as TableField,
                by: { url: 'user/' + detector?.owner?.id, value: detector?.owner?.initials } as TableField,
            };
        });
    }

}
