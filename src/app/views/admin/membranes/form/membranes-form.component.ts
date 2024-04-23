import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { BaseFormComponent } from '../../base/form/base-form.component';
import { CreateGasGQL, CreateMembraneGQL, CreateORingGQL, MembraneInput, ORingInput, UpdateMembraneGQL, UpdateORingGQL } from '../../../../../generated/graphql';
import { AuthService } from '../../../../services/authentication/auth.service';


@Component({
    selector: 'membranes-form',
    templateUrl: './membranes-form.component.html',
})
export class MembranesFormComponent extends BaseFormComponent<MembraneInput> {


    @Input() object: any = {
        name: '',
        cdartikel: '',
        replacement_interval_months: '',
        quantity: '',
    };

    myForm: FormGroup;

    constructor(protected override toastr: ToastrService, protected override fb: FormBuilder
        ,
        createService: CreateMembraneGQL,
        editService: UpdateMembraneGQL,
        authService: AuthService
        ) {
        super(authService, toastr, fb, createService, editService)

        this.myForm = this.fb.group({
            name: [this.object.name, [Validators.required]],
            cdartikel: [this.object.cdartikel, [Validators.required]],
            replacement_interval_months: [this.object.replacement_interval_months, [Validators.required, Validators.pattern('^[0-9]+$')]],
            quantity: [this.object.quantity, [Validators.required, Validators.pattern('^[0-9]+$')]],
        });
    }

    createDto(): MembraneInput {
        //todo setup owner_id, ownerId
        return {
            name: this.myForm.value.name,
            cdartikel: this.myForm.value.cdartikel,
            replacementIntervalMonths: +this.myForm.value.replacement_interval_months,
            quantity: +this.myForm.value.quantity,
            created: !this.id ? this.dayjs().format() : undefined,
            modified: this.dayjs().format(),
            ownerId: this.authService?.currentUserInfo?.id,
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