import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { BaseFormComponent } from '../../base/form/base-form.component';
import { ApplicationInput, CreateApplicationGQL, CreateGasGQL, GasInput, UpdateApplicationGQL, UpdateGasGQL } from '../../../../../generated/graphql';
import { AuthService } from '../../../../services/authentication/auth.service';


@Component({
    selector: 'applications-form',
    templateUrl: './applications-form.component.html',
})
export class ApplicationsFormComponent extends BaseFormComponent<ApplicationInput> {


    @Input() object: any = {
        name: null,
    };

    myForm: FormGroup;

    constructor(protected override toastr: ToastrService, protected override fb: FormBuilder,
        createService: CreateApplicationGQL,
        editService: UpdateApplicationGQL,
        authService: AuthService
        ) {
        super(authService, toastr, fb, createService, editService)

        this.myForm = this.fb.group({
            name: [this.object.name, [Validators.required]],
        });
    }

    createDto(): any {
        return {
            name: this.myForm.value.name,
            created: !this.id ? this.dayjs().format() : undefined,
            modified: this.dayjs().format(),
            ownerId: this.authService?.currentUserInfo?.id,
        }
    }

    //on edit set to selected assembly
    setEditData(changes: any): void {

        console.log(changes)
        this.object = {
            id: changes.id,           
            name: changes.name,
        };

        this.myForm.patchValue(this.object);
    }
}