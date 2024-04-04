import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { BaseFormComponent } from '../../base/form/base-form.component';
import { CreateGasGQL, GasInput, UpdateGasGQL } from '../../../../../generated/graphql';


@Component({
    selector: 'gases-form',
    templateUrl: './gases-form.component.html',
})
export class GasesFormComponent extends BaseFormComponent<GasInput> {


    @Input() object: any = {
        name: null,
    };

    myForm: FormGroup;

    constructor(protected override toastr: ToastrService, protected override fb: FormBuilder
        ,
        createService: CreateGasGQL,
        editService: UpdateGasGQL
        ) {
        super(toastr, fb, createService, editService)

        this.myForm = this.fb.group({
            name: [this.object.name, [Validators.required]],
        });
    }

    createDto(): any {
        //todo setup owner_id, ownerId
        return {
            name: this.myForm.value.name,
            created: new Date(),
            modified: new Date(),
            ownerId: 10
        }
    }

    //on edit set to selected assembly
    setEditData(changes: any): void {
        this.object = {
            id: changes.id,           
            name: changes.name,
        };

        this.myForm.patchValue(this.object);
    }
}