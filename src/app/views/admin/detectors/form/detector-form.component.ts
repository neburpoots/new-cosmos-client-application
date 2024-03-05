import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AssemblyTypeService } from '../../../../services/assemblyType/assemblyType.service';
import { AssemblyService } from '../../../../services/assembly/assembly.service';
import { ToastrService } from 'ngx-toastr';
import AssemblyType from '../../../../models/entities/assemblyType';
import { AssemblyDto } from '../../../../models/dto/assemblyDto';
import { ErrorResponse } from '../../../../models/utils/errorResponse';
import { Assembly } from '../../../../models/entities/assembly';
import { DetectorTypeService } from '../../../../services/detectorType/detectorType.service';
import DetectorType from '../../../../models/entities/detectorType';
import { DetectorDto } from '../../../../models/dto/detectorDto';
import { AbstractFormComponent } from '../../abstract/form/abstract-form.component';
import { IAbstractForm } from '../../../../models/interface/IAbstractForm';
import { AbstractService } from '../../../../services/abstract/abstract.service';

@Component({
    selector: 'detector-form',
    templateUrl: './detector-form.component.html',
    styles: []
})
export class DetectorFormComponent extends AbstractFormComponent<DetectorDto> implements IAbstractForm<DetectorDto> {

    override url = 'api/detectors';

    @Input() object: DetectorDto = {
        invoiceAssignment: '',
        detectorType: null,
        serial_number: '',
        label_date: null,
        remark: '',
    };

    myForm: FormGroup;

    detectorTypes: DetectorType[] = [];

    constructor(protected override toastr: ToastrService, protected override fb: FormBuilder, private detectorTypeService: DetectorTypeService, protected override abstractService: AbstractService<DetectorDto>) {
        super(toastr, fb, abstractService)
        this.myForm = this.fb.group({
            invoiceAssignment: [this.object.invoiceAssignment, [Validators.required, Validators.minLength(6)]],
            detectorType: [this.object.detectorType, [Validators.required]],
            serial_number: [this.object.serial_number, [Validators.required, Validators.pattern('^[0-9]+$')]],
            label_date: [this.object.label_date, [Validators.required]],
            remark: [this.object.remark]
        });
    }

    createDto(): DetectorDto {

        //get the detectorType from the array
        let selectedDetectorType = this.detectorTypes.find((detectorType) => detectorType.id === +this.myForm.value.detectorType);

        if (!selectedDetectorType) {
            this.toastr.error('Please select an detector Type', 'Error');
            throw new Error('Please select an detector Type');
        }

        return {
            invoiceAssignment: this.myForm.value.invoiceAssignment,
            detectorType: selectedDetectorType,
            serial_number: this.myForm.value.serial_number,
            label_date: new Date(this.myForm.value.label_date),
            remark: this.myForm.value.remark,
        }
    }

    ngOnInit(): void {
        this.setUpDependentData();
    }

    async setUpDependentData(): Promise<void> {
        this.detectorTypes = await this.getDependentData('api/detector-types');
    }


    //on edit set to selected assembly
    setEditData(changes: any): void {
        this.myForm.patchValue({
            batch: changes.batch,
            start_serial_number: changes.start_serial_number,
            quantity: changes.quantity,
            selectedOption: changes.selectedOption
        });
    }
}
