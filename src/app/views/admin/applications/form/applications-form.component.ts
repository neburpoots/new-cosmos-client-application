import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { BaseFormComponent } from '../../base/form/base-form.component';
import { ApplicationInput, CreateApplicationGQL, CreateGasGQL, GasInput, UpdateApplicationGQL, UpdateGasGQL } from '../../../../../generated/graphql';


@Component({
    selector: 'applications-form',
    templateUrl: './applications-form.component.html',
})
export class ApplicationsFormComponent extends BaseFormComponent<ApplicationInput> {


    @Input() object: any = {
        name: null,
    };

    myForm: FormGroup;

    constructor(protected override toastr: ToastrService, protected override fb: FormBuilder
        ,
        createService: CreateApplicationGQL,
        editService: UpdateApplicationGQL
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