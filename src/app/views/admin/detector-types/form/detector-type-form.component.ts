import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { BaseFormComponent } from '../../base/form/base-form.component';
import { CreateDetectorTypeGQL, DetectorTypeInput, UpdateDetectorTypeGQL } from '../../../../../generated/graphql';

@Component({
    selector: 'detector-type-form',
    templateUrl: './detector-type-form.component.html',
    styles: []
})
export class DetectorTypeFormComponent extends BaseFormComponent<DetectorTypeInput> {


    @Input() object: any = {
        prefix: '',
        code: '',
        suffix: '',
        sensor_count: '',
    };

    myForm: FormGroup;


    constructor(protected override toastr: ToastrService, protected override fb: FormBuilder
        ,
        createService: CreateDetectorTypeGQL,
        editService: UpdateDetectorTypeGQL
    ) {
        super(toastr, fb, createService, editService)

        this.myForm = this.fb.group({
            prefix: [this.object.prefix, []],
            code: [this.object.code, []],
            suffix: [this.object.suffix, []],
            sensor_count: [this.object.sensor_count, [Validators.required, Validators.pattern('^[0-9]+(\.[0-9]+)?$')]],
        });
    }

    get type() {
        return `${this.myForm.controls['prefix'].value}-${this.myForm.controls['code'].value}-${this.myForm.controls['suffix'].value}`
    }

    createDto(): any {
        return {
            ownerId: 10,
            prefix: this.myForm.value.prefix,
            code: this.myForm.value.code,
            suffix: this.myForm.value.suffix,
            sensorCount: +this.myForm.value.sensor_count,
            created: new Date(),
            modified: new Date(),
        }
    }

    //on edit set to selected assembly
    setEditData(changes: any): void {
        this.object = {
            id: changes.id,
            prefix: changes.prefix,
            code: changes.code,
            suffix: changes.suffix,
            sensor_count: changes.sensor_count,
        };

        this.myForm.patchValue(this.object);
    }
}