import { Component, Input, } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { BaseFormComponent } from '../../base/form/base-form.component';
import { AllPrinciplesNoPaginationGQL, CreateMembraneGQL,  CreateSensorBaseTypeGQL,  Principle,  SensorBaseTypeInput,  SensorTypeInput, UpdateMembraneGQL, UpdateSensorBaseTypeGQL } from '../../../../../generated/graphql';
import { Query } from 'apollo-angular';
import { AuthService } from '../../../../services/authentication/auth.service';


@Component({
    selector: 'sensor-base-types-form',
    templateUrl: './sensor-base-types-form.component.html',
})
export class SensorBaseTypesFormComponent extends BaseFormComponent<SensorBaseTypeInput> {

    @Input() object: any = {
        prefix: '',
        suffix: '',
        series: '',
        maintenance_interval_months: '',
        replacement_interval_months: '',
        quotation_interval_months: '',
        principleId: null,
        volume: '',
    };

    myForm: FormGroup;

    principles: Principle[];

    constructor(protected override toastr: ToastrService, protected override fb: FormBuilder
        ,
        createService: CreateSensorBaseTypeGQL,
        editService: UpdateSensorBaseTypeGQL,
        principleService: AllPrinciplesNoPaginationGQL,
        authService: AuthService
        ) {
        super(authService, toastr, fb, createService, editService)

        this.principles = [];

        this.setUpDependentData(principleService);

        this.myForm = this.fb.group({
            prefix: [this.object.prefix, [Validators.required]],
            suffix: [this.object.suffix],
            series: [this.object.series],
            maintenance_interval_months: [this.object.maintenance_interval_months, [Validators.pattern('^[0-9]+$')]],
            replacement_interval_months: [this.object.replacement_interval_months, [Validators.pattern('^[0-9]+$')]],
            quotation_interval_months: [this.object.quotation_interval_months, [Validators.pattern('^[0-9]+$')]],
            principleId: [this.object.principleId, [Validators.required, Validators.pattern('^[0-9]+$')]],
            volume: [this.object.volume, [Validators.pattern('^[0-9]+$')]],
        });
    }

    createDto(): SensorBaseTypeInput {
        //todo setup owner_id, ownerId
        return {
            prefix: this.myForm.value.prefix,
            suffix: this.myForm.value.suffix,
            series: this.myForm.value.series,
            maintenanceIntervalMonths: +this.myForm.value.maintenance_interval_months,
            replacementIntervalMonths: +this.myForm.value.replacement_interval_months,
            quotationIntervalMonths: +this.myForm.value.quotation_interval_months,
            principleId: +this.myForm.value.principleId,
            volume: +this.myForm.value.volume,
            created: !this.id ? this.dayjs().format() : undefined,
            modified: this.dayjs().format(),
            ownerId: this.authService?.currentUserInfo?.id,
        }
    }

    async setUpDependentData(principleService: Query<any, any>) {
        principleService.fetch().subscribe(result => {
            this.principles = result?.data?.allPrinciples?.nodes || [];
        });
    }


    //on edit set to selected assembly
    setEditData(changes: any): void {
        console.log(changes);
        this.object = {
            id: changes.id,
            prefix: changes.prefix,
            suffix: changes.suffix,
            series: changes.series,
            maintenance_interval_months: changes.maintenance_interval_months,
            replacement_interval_months: changes.replacement_interval_months,
            quotation_interval_months: changes.quotation_interval_months,
            principleId: changes.principleId,
            volume: changes.volume,
        };

        this.myForm.patchValue(this.object);
    }
}