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

@Component({
    selector: 'assembly-create',
    templateUrl: './assembly-create.component.html',
    styles: []
})
export class AssemblyCreateComponent extends AbstractFormComponent<AssemblyDto> implements IAbstractForm<AssemblyDto> {

    override url = 'api/assemblies';

    @Input() cellWidths: number[] = [];

    myForm: FormGroup;

    assemblyTypes: AssemblyType[] = [];

    @Input() object: AssemblyDto = {
        code: '',
        start_serial_number: '',
        assemblyType: null,
        quantity: '',
    };

    constructor(protected override toastr: ToastrService, protected override fb: FormBuilder, private detectorTypeService: AssemblyTypeService, protected override abstractService: AbstractService<AssemblyDto>) {
        super(toastr, fb, abstractService)

        this.myForm = this.fb.group({
            code: [this.object.code, [Validators.required, Validators.minLength(2)]],
            start_serial_number: [this.object.start_serial_number, [Validators.required, Validators.pattern('^[0-9]+$')]],
            quantity: [this.object.quantity, [Validators.required, Validators.pattern('^[0-9]+$')]],
            selectedOption: [this.object.assemblyType, Validators.required], // Add a form control for the select component

        });
    }

    get selectedOption(): AssemblyType | null {
        let selectedAssemblyType = this.assemblyTypes.find((assemblyType) => assemblyType.id === +this.myForm.value.selectedOption);
        if (selectedAssemblyType) {
            return selectedAssemblyType;

        }
        return null;
    }

    async setUpDependentData(): Promise<void> {
        this.assemblyTypes = await this.getDependentData('api/assembly-types/all');
    }

    createDto(): AssemblyDto {
        //get the assemblytype from the array
        let selectedAssemblyType = this.assemblyTypes.find((assemblyType) => assemblyType.id === +this.myForm.value.selectedOption);

        if (!selectedAssemblyType) {
            this.toastr.error('Please select an assembly type', 'Error');
            throw new Error('Please select an assembly type');
        }

        return {
            code: this.myForm.value.code,
            start_serial_number: +this.myForm.value.start_serial_number,
            assemblyType: selectedAssemblyType,
            quantity: +this.myForm.value.quantity
        }
    }

    ngOnInit(): void {
        this.setUpDependentData();
    }

    //on edit set to selected assembly
    setEditData(changes: any): void {
        this.myForm.patchValue({
            code: changes.code,
            start_serial_number: changes.start_serial_number,
            quantity: changes.quantity,
            assemblyType: changes.selectedOption
        });
    }

}
