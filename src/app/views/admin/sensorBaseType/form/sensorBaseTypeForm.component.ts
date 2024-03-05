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
import { SensorBaseTypeDto } from '../../../../models/dto/sensorBaseTypeDto';
import { Principle } from '../../../../models/entities/principle';

@Component({
    selector: 'sensor-base-type-form',
    templateUrl: './sensorBaseTypeForm.component.html',
    styles: []
})
export class SensorBaseTypeFormComponent extends AbstractFormComponent<SensorBaseTypeDto> implements IAbstractForm<SensorBaseTypeDto> {

    override url = 'api/sensor-base-types';

    @Input() object: SensorBaseTypeDto = {
        prefix: '',
        suffix: '',
        series: '',
        maintenance_interval_months: null,
        replacement_interval_months: null,
        quotation_interval_months: null,
        principle: null,
        volume: null,
        principle_id: null,
    };

    myForm: FormGroup;

    

    principles: Principle[] = [];

    constructor(protected override toastr: ToastrService, protected override fb: FormBuilder, private detectorTypeService: DetectorTypeService, protected override abstractService: AbstractService<SensorBaseTypeDto>) {
        super(toastr, fb, abstractService)
        this.myForm = this.fb.group({
            prefix: [this.object.prefix, [Validators.required, Validators.minLength(2)]],
            suffix: [this.object.suffix, [Validators.required, Validators.minLength(2)]],
            series: [this.object.series, []],
            maintenance_interval_months: [this.object.maintenance_interval_months, [Validators.pattern('^[0-9]+$')]],
            replacement_interval_months: [this.object.replacement_interval_months, [Validators.pattern('^[0-9]+$')]],
            quotation_interval_months: [this.object.quotation_interval_months, [Validators.pattern('^[0-9]+$')]],
            principle_id: [this.object.principle_id, [Validators.required]],
            volume: [this.object.volume, [Validators.pattern('^[0-9]+$')]],
        });
    }

    createDto(): SensorBaseTypeDto {

        this.myForm.value;

        //get the detectorType from the array
        let selectedPrinciple = this.principles.find((principle) => principle.id === +this.myForm.value.principle_id);

        console.log(selectedPrinciple)
        if (!selectedPrinciple) {
            this.toastr.error('Please select an principle', 'Error');
            throw new Error('Please select an principle');
        }

        return {
            prefix: this.myForm.value.prefix,
            suffix: this.myForm.value.suffix,
            series: this.myForm.value.series,
            maintenance_interval_months: +this.myForm.value.maintenance_interval_months,
            replacement_interval_months: +this.myForm.value.replacement_interval_months,
            quotation_interval_months: +this.myForm.value.quotation_interval_months,
            principle_id: +this.myForm.value.principle,
            principle: selectedPrinciple,
            volume: +this.myForm.value.volume,
        }

    }


    ngOnInit(): void {
        this.setUpDependentData();
    }

    async setUpDependentData(): Promise<void> {
        this.principles = await this.getDependentData('api/principles/all');
    }

    //on edit set to selected assembly
    setEditData(changes: any): void {
        console.log(changes.principle.id)
        this.object = {
            id: changes.id,
            prefix: changes.prefix,
            suffix: changes.suffix,
            series: changes.series || null,
            maintenance_interval_months: changes.maintenance_interval_months || null,
            replacement_interval_months: changes.replacement_interval_months || null,
            quotation_interval_months: changes.quotation_interval_months || null,
            principle: changes.principle,
            volume: changes.volume || null,
            principle_id: changes.principle.id,
        };

        this.myForm.patchValue(this.object);
    }
}