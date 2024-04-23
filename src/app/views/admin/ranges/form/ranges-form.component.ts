import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { BaseFormComponent } from '../../base/form/base-form.component';
import { AllGasesNoPaginationGQL, ChemicalCompoundInput, CreateCalGasGQL, CreateChemicalCompoundGQL, CreateRangeGQL, RangeInput, UpdateChemicalCompoundGQL, UpdateRangeGQL } from '../../../../../generated/graphql';
import { Query } from 'apollo-angular';
import { FormSelect } from '../../../../models/utils/formSelect';
import { AuthService } from '../../../../services/authentication/auth.service';

@Component({
    selector: 'ranges-form',
    templateUrl: './ranges-form.component.html',
})
export class RangesFormComponent extends BaseFormComponent<RangeInput> {


    @Input() object: any = {
        gasId: null,
        lowEu: '',
        highEu: '',
        engineeringUnits: '',
        alarmUnits: false,
        alarm1Level: '',
        alarm1DirectionUp: false,
        alarm2Level: '',
        alarm2DirectionUp: false,
        warning1Level: '',
        warning2Level: '',
        precision: '',
    };

    myForm: FormGroup;

    gases: FormSelect[];


    constructor(
        protected override toastr: ToastrService,
        protected override fb: FormBuilder,
        gasesService: AllGasesNoPaginationGQL,
        createService: CreateRangeGQL,
        editService: UpdateRangeGQL,
        authService: AuthService
    ) {
        super(authService, toastr, fb, createService, editService)

        this.gases = [];

        this.setUpDependentData(gasesService);

        this.myForm = this.fb.group({
            gas: [this.object.gasId, [Validators.required]],
            lowEu: [this.object.lowEu, [ Validators.pattern('^[0-9]+(\.[0-9]+)?$')]],
            highEu: [this.object.highEu, [ Validators.pattern('^[0-9]+(\.[0-9]+)?$')]],
            engineeringUnits: [this.object.engineeringUnits, []],
            alarmUnits: [this.object.alarmUnits],
            alarm1Level: [this.object.alarm1Level, [Validators.pattern('^[0-9]+(\.[0-9]+)?$')]],
            alarm1DirectionUp: [this.object.alarm1DirectionUp, []],
            alarm2Level: [this.object.alarm2Level, [Validators.pattern('^[0-9]+(\.[0-9]+)?$')]],
            alarm2DirectionUp: [this.object.alarm2DirectionUp, []],
            warning1Level: [this.object.warning1Level, [Validators.pattern('^[0-9]+(\.[0-9]+)?$')]],
            warning2Level: [this.object.warning2Level, [Validators.pattern('^[0-9]+(\.[0-9]+)?$')]],
            precision: [this.object.precision, [Validators.pattern('^[0-9]+(\.[0-9]+)?$')]],
        });
    }

    createDto(): RangeInput {
        console.log(this.myForm.value)
        return {
            gasId: +this.myForm.value.gas,
            lowEu: +this.myForm.value.lowEu,
            highEu: +this.myForm.value.highEu,
            engineeringUnits: this.myForm.value.engineeringUnits,
            alarmUnits: this.myForm.value.alarmUnits,
            alarm1Level: +this.myForm.value.alarm1Level,
            alarm1DirectionUp: this.myForm.value.alarm1DirectionUp,
            alarm2Level: +this.myForm.value.alarm2Level,
            alarm2DirectionUp: this.myForm.value.alarm2DirectionUp,
            warning1Level: +this.myForm.value.warning1Level,
            warning2Level: +this.myForm.value.warning2Level,
            precision: +this.myForm.value.precision,
        }

    }

    async setUpDependentData(gasesService: Query<any, any>) {
        gasesService.fetch().subscribe(result => {
            this.gases = result?.data?.allGases?.nodes || [];
        });
    }

    //on edit set to selected
    setEditData(changes: any): void {
        this.object = {
            id: changes.id,
            gas: changes.gasId,
            lowEu: changes.lowEu,
            highEu: changes.highEu,
            engineeringUnits: changes.engineeringUnits,
            alarmUnits: changes.alarmUnits,
            alarm1Level: changes.alarm1Level,
            alarm1DirectionUp: changes.alarm1DirectionUp,
            alarm2Level: changes.alarm2Level,
            alarm2DirectionUp: changes.alarm2DirectionUp,
            warning1Level: changes.warning1Level,
            warning2Level: changes.warning2Level,
            precision: changes.precision,
        };

        this.myForm.patchValue(this.object);
    }
}