import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';

import { DetectorDto } from '../../../../models/dto/detectorDto';

import { BaseFormComponent } from '../../base/form/base-form.component';
import { FormSelect } from '../../../../models/utils/formSelect';
import { CreateDetectorGQL } from '../../../../../generated/graphql';

@Component({
    selector: 'detector-form',
    templateUrl: './detector-form.component.html',
    styles: []
})
export class DetectorFormComponent extends BaseFormComponent<DetectorDto> {

    @Input() object: DetectorDto = {
        invoiceAssignment: '',
        detectorType: null,
        serial_number: '',
        label_date: null,
        remark: '',
    };

    myForm: FormGroup;

    detectorTypes: FormSelect[] = [];



    constructor(protected override toastr: ToastrService, 
        protected override fb: FormBuilder, 
        // private detectorTypeService: DetectorTypeService, 
        
        private tempService: CreateDetectorGQL
        ) {
        super(toastr, fb, tempService, tempService)
        this.detectorTypes = [];

        this.myForm = this.fb.group({
            invoiceAssignment: [this.object.invoiceAssignment, [Validators.required, Validators.minLength(6)]],
            detectorType: [this.object.detectorType, [Validators.required]],
            serial_number: [this.object.serial_number, [Validators.required, Validators.pattern('^[0-9]+$')]],
            label_date: [this.object.label_date, [Validators.required]],
            remark: [this.object.remark]
        });
    }

    createDto(): any {

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
        // this.detectorTypes = await this.getDependentData('api/detector-types');
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
