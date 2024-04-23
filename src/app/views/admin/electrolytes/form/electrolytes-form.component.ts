import { Component, Input,  } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { BaseFormComponent } from '../../base/form/base-form.component';
import { CreateElectrolyteGQL, ElectrolyteInput, UpdateElectrolyteGQL } from '../../../../../generated/graphql';
import { AuthService } from '../../../../services/authentication/auth.service';


@Component({
    selector: 'electrolytes-form',
    templateUrl: './electrolytes-form.component.html',
})
export class ElectrolytesFormComponent extends BaseFormComponent<ElectrolyteInput> {


    @Input() object: any = {
        name: '',
        cdartikel: '',
        replacement_interval_months: '',
        volume: '',
    };

    myForm: FormGroup;

    constructor(protected override toastr: ToastrService, protected override fb: FormBuilder
        ,
        createService: CreateElectrolyteGQL,
        editService: UpdateElectrolyteGQL,
        authService: AuthService
        ) {
        super(authService, toastr, fb, createService, editService)

        this.myForm = this.fb.group({
            name: [this.object.name, [Validators.required]],
            cdartikel: [this.object.cdartikel, [Validators.required]],
            replacement_interval_months: [this.object.replacement_interval_months, [Validators.required, Validators.pattern('^[0-9]+$')]],
            volume: [this.object.volume, [Validators.required, Validators.pattern('^[0-9]+$')]],
        });
    }

    createDto(): ElectrolyteInput {
        //todo setup owner_id, ownerId
        return {
            name: this.myForm.value.name,
            cdartikel: this.myForm.value.cdartikel,
            replacementIntervalMonths: +this.myForm.value.replacement_interval_months,
            volume: +this.myForm.value.volume,
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
            volume: changes.volume,
        };

        this.myForm.patchValue(this.object);
    }
}