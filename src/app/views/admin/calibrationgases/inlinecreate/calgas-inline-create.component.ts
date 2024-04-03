import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AssemblyTypeService } from '../../../../services/assemblyType/assemblyType.service';
import { AssemblyService } from '../../../../services/assembly/assembly.service';
import { ToastrService } from 'ngx-toastr';
import AssemblyType from '../../../../models/entities/assemblyType';
import { ErrorResponse } from '../../../../models/utils/errorResponse';
import { AssemblyDto } from '../../../../models/dto/assemblyDto';
import { TableHeader } from '../../../../models/utils/tableHeader';
import { AbstractFormComponent } from '../../abstract/form/abstract-form.component';
import { AbstractService } from '../../../../services/abstract/abstract.service';
import { IAbstractForm } from '../../../../models/interface/IAbstractForm';
import { SearchCriteria } from '../../../../models/utils/searchCriteria';
import { CalgasDto } from '../../../../models/dto/calgasDto';
import { BaseFormComponent } from '../../base/form/base-form.component';
import { FormSelect } from '../../../../models/utils/formSelect';
import { AllGasesNoPaginationGQL, CreateCalGasGQL, UpdateCalGasGQL } from '../../../../../generated/graphql';
import { Query } from 'apollo-angular';

@Component({
    selector: 'calgas-inline-create',
    templateUrl: './calgas-inline-create.component.html',
    styles: []
})
export class CalGasInlineCreate extends BaseFormComponent<CalgasDto> {

    @Input() cellWidths: number[] = [];

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
