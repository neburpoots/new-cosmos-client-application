import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { BaseFormComponent } from '../../base/form/base-form.component';
import { AllGasesNoPaginationGQL, ChemicalCompoundInput, CreateCalGasGQL, CreateChemicalCompoundGQL, UpdateCalGasGQL, UpdateChemicalCompoundGQL } from '../../../../../generated/graphql';
import { Query } from 'apollo-angular';
import { FormSelect } from '../../../../models/utils/formSelect';

@Component({
    selector: 'chemical-compounds-form',
    templateUrl: './chemical-compounds-form.component.html',
})
export class ChemicalCompoundsFormComponent extends BaseFormComponent<ChemicalCompoundInput> {


    @Input() object: any = {
        name: '',
        otherName: '',
        cas: '',
        icsc: '',
        formula: '',
        molarMass: '',
        density: '',
        url: '',
    };

    myForm: FormGroup;


    constructor(
        protected override toastr: ToastrService,
        protected override fb: FormBuilder,
        createService: CreateChemicalCompoundGQL,
        editService: UpdateChemicalCompoundGQL
    ) {
        super(toastr, fb, createService, editService)

        this.myForm = this.fb.group({
            name: [this.object.name, [Validators.required]],
            otherName: [this.object.otherName, [Validators.required]],
            formula: [this.object.formula, [Validators.required]],
            cas: [this.object.cas, [Validators.required]],
            icsc: [this.object.icsc, [Validators.required]],
            molarMass: [this.object.molarMass, [Validators.pattern('^[0-9]+(\.[0-9]+)?$')]],
            density: [this.object.density, [Validators.pattern('^[0-9]+(\.[0-9]+)?$')]],
            url: [this.object.url, []],
        });
    }

    createDto(): ChemicalCompoundInput {

        return {
            name: this.myForm.value.name,
            otherName: this.myForm.value.otherName,
            cas: this.myForm.value.cas,
            icsc: this.myForm.value.icsc,
            formula: this.myForm.value.formula,
            molarMass: +this.myForm.value.molarMass,
            density: +this.myForm.value.density,
            url: this.myForm.value.url,
            ownerId: 10,
            created: new Date(),
            modified: new Date(),
        }

    }

    //on edit set to selected
    setEditData(changes: any): void {
        this.object = {
            id: changes.id,
            name: changes.name,
            otherName: changes.otherName,
            formula: changes.formula,
            cas: changes.cas,
            icsc: changes.icsc,
            molarMass: changes.molarMass,
            density: changes.density,
            url: changes.url,
        };

        this.myForm.patchValue(this.object);
    }
}