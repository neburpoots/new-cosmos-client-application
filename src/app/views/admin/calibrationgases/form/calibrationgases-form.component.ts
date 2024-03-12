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

@Component({
    selector: 'calgas-form',
    templateUrl: './calibrationgases-form.component.html',
    styles: []
})
export class CalibrationGasesFormComponent extends AbstractFormComponent<CalgasDto> implements IAbstractForm<CalgasDto> {

    override url = 'api/calgas';

    @Input() object: CalgasDto = {
        concentration: null,
        engineering_units: '',
        gas: null,
        cdartikel: '',
    };

    myForm: FormGroup;

    gases: Gas[] = [];

    constructor(protected override toastr: ToastrService, protected override fb: FormBuilder, private detectorTypeService: DetectorTypeService, protected override abstractService: AbstractService<CalgasDto>) {
        super(toastr, fb, abstractService)
        this.myForm = this.fb.group({
            gas: [this.object.gas, [Validators.required]],
            concentration: [this.object.concentration, [Validators.required, Validators.pattern('^[0-9]+(\.[0-9]+)?$')]],
            cdartikel: [this.object.cdartikel, []],
            engineering_units: [this.object.engineering_units, [Validators.required]],
        });
    }

    createDto(): CalgasDto {

        this.myForm.value;

        //get the detectorType from the array
        let selectedGas = this.gases.find((gases) => gases.id === +this.myForm.value.gas);

        if (!selectedGas) {
            this.toastr.error('Please select an gas', 'Error');
            throw new Error('Please select an gas');
        }

        return {
            concentration: +this.myForm.value.concentration,
            engineering_units: this.myForm.value.engineering_units,
            gas: selectedGas,
            cdartikel: this.myForm.value.cdartikel,
        }

    }


    ngOnInit(): void {
        this.setUpDependentData();
    }

    async setUpDependentData(): Promise<void> {
        this.gases = await this.getDependentData('api/gases/all');
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