import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { BaseFormComponent } from '../../base/form/base-form.component';
import { AllGasesNoPaginationGQL, CreateCalGasGQL, CreatePrincipleGQL, PrincipleInput, UpdateCalGasGQL, UpdatePrincipleGQL } from '../../../../../generated/graphql';

@Component({
    selector: 'principles-form',
    templateUrl: './principles-form.component.html',
    styles: []
})
export class PrinciplesFormComponent extends BaseFormComponent<PrincipleInput> {


    @Input() object: any = {
        name: null,
    };

    myForm: FormGroup;

    constructor(protected override toastr: ToastrService, protected override fb: FormBuilder
        ,
        createService: CreatePrincipleGQL,
        editService: UpdatePrincipleGQL
        ) {
        super(toastr, fb, createService, editService)

        this.myForm = this.fb.group({
            name: [this.object.name, [Validators.required]],
        });
    }

    createDto(): PrincipleInput {
        //todo setup owner_id, ownerId
        return {
            name: this.myForm.value.name,
            created: new Date(),
            modified: new Date(),
            ownerId: 10
        }
    }

    // async setUpDependentData(gasesService: Query<any, any>) {
    //     gasesService.fetch().subscribe(result => {
    //         this.gases = result?.data?.allGases?.nodes || [];
    //     });
    // }

    //on edit set to selected assembly
    setEditData(changes: any): void {
        this.object = {
            id: changes.id,           
            name: changes.name,
        };

        this.myForm.patchValue(this.object);
    }
}