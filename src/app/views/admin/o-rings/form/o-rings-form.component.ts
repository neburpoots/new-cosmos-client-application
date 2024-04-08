import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { BaseFormComponent } from '../../base/form/base-form.component';
import { CreateGasGQL, CreateORingGQL, ORingInput, UpdateORingGQL } from '../../../../../generated/graphql';


@Component({
    selector: 'o-rings-form',
    templateUrl: './o-rings-form.component.html',
})
export class ORingsFormComponent extends BaseFormComponent<ORingInput> {


    @Input() object: any = {
        name: '',
        cdartikel: '',
        replacement_interval_months: '',
        quantity: '',
    };

    myForm: FormGroup;

    constructor(protected override toastr: ToastrService, protected override fb: FormBuilder
        ,
        createService: CreateORingGQL,
        editService: UpdateORingGQL
        ) {
        super(toastr, fb, createService, editService)

        this.myForm = this.fb.group({
            name: [this.object.name, [Validators.required]],
            cdartikel: [this.object.cdartikel, [Validators.required]],
            replacement_interval_months: [this.object.replacement_interval_months, [Validators.required, Validators.pattern('^[0-9]+$')]],
            quantity: [this.object.quantity, [Validators.required, Validators.pattern('^[0-9]+$')]],
        });
    }

    createDto(): ORingInput {
        //todo setup owner_id, ownerId
        return {
            name: this.myForm.value.name,
            cdartikel: this.myForm.value.cdartikel,
            replacementIntervalMonths: +this.myForm.value.replacement_interval_months,
            quantity: +this.myForm.value.quantity,
            created: this.object.id ? this.object.created : new Date(), //if id exists then it is an edit
            modified: new Date(),
            ownerId: 10
        }
    }

    //on edit set to selected assembly
    setEditData(changes: any): void {
        this.object = {
            id: changes.id,
            created: changes.created,           
            name: changes.name,
            cdartikel: changes.cdartikel,
            replacement_interval_months: changes.replacement_interval_months,
            quantity: changes.quantity,
        };

        this.myForm.patchValue(this.object);
    }
}