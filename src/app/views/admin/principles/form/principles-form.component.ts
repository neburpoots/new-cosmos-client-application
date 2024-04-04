import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DetectorTypeService } from '../../../../services/detectorType/detectorType.service';
import DetectorType from '../../../../models/entities/detectorType';
import { DetectorDto } from '../../../../models/dto/detectorDto';
import { AbstractFormComponent } from '../../abstract/form/abstract-form.component';
import { IAbstractForm } from '../../../../models/interface/IAbstractForm';
import { AbstractService } from '../../../../services/abstract/abstract.service';
import { CalgasDto } from '../../../../models/dto/calgasDto';
import { Gas } from '../../../../models/entities/gas';
import { SearchCriteria } from '../../../../models/utils/searchCriteria';
import { BaseFormComponent } from '../../base/form/base-form.component';
import { AllGasesNoPaginationGQL, CreateCalGasGQL, UpdateCalGasGQL } from '../../../../../generated/graphql';
import { Query } from 'apollo-angular';
import { FormSelect } from '../../../../models/utils/formSelect';

@Component({
    selector: 'principles-form',
    templateUrl: './principles-form.component.html',
    styles: []
})
export class PrinciplesFormComponent extends BaseFormComponent<CalgasDto> {


    @Input() object: any = {
        concentration: null,
        engineering_units: '',
        gas: null,
        cdartikel: '',
    };

    myForm: FormGroup;
    gases: FormSelect[];


    constructor(protected override toastr: ToastrService, protected override fb: FormBuilder
        , gasesService: AllGasesNoPaginationGQL,
        createCalGasService: CreateCalGasGQL,
        editCalGasService: UpdateCalGasGQL
        ) {
        super(toastr, fb, createCalGasService, editCalGasService)
        
        this.gases = [];

        this.setUpDependentData(gasesService);
        this.myForm = this.fb.group({
            gas: [this.object.gas, [Validators.required]],
            concentration: [this.object.concentration, [Validators.required, Validators.pattern('^[0-9]+(\.[0-9]+)?$')]],
            cdartikel: [this.object.cdartikel, []],
            engineering_units: [this.object.engineering_units, [Validators.required]],
        });
    }

    createDto(): any {
        //todo setup owner_id, ownerId
        return {
            ownerId: 10,
            concentration: +this.myForm.value.concentration,
            engineeringUnits: this.myForm.value.engineering_units,
            gasId: +this.myForm.value.gas,
            cdartikel: this.myForm.value.cdartikel,
            created: new Date(),
            modified: new Date(),
        }

    }

    async setUpDependentData(gasesService: Query<any, any>) {
        gasesService.fetch().subscribe(result => {
            this.gases = result?.data?.allGases?.nodes || [];
        });
    }

    //on edit set to selected assembly
    setEditData(changes: any): void {
        this.object = {
            id: changes.id,
            concentration: changes.concentration,
            engineering_units: changes.engineering_units,
            cdartikel: changes.cdartikel,            
            gas: changes.gas,
        };

        this.myForm.patchValue(this.object);
    }
}