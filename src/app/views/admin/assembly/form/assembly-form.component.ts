import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AssemblyTypeService } from '../../../../services/assemblyType/assemblyType.service';
import { AssemblyService } from '../../../../services/assembly/assembly.service';
import { ToastrService } from 'ngx-toastr';
import AssemblyType from '../../../../models/entities/assemblyType';
import { AssemblyDto } from '../../../../models/dto/assemblyDto';
import { ErrorResponse } from '../../../../models/utils/errorResponse';
import { Assembly } from '../../../../models/entities/assembly';

@Component({
    selector: 'assembly-form',
    templateUrl: './assembly-form.component.html',
    styles: []
})
export class AssemblyFormComponent {

    @Output() closeModal = new EventEmitter<void>();
    @Output() refreshAssemblies = new EventEmitter<void>();

    isSubmitted = false;

    @Input() assembly: any = {
        id: null,
        code: '',
        start_serial_number: '',
        selectedOption: null,
        quantity: '',
    };

    myForm: FormGroup;

    assemblyTypes: AssemblyType[] = [];

    constructor(private toastr: ToastrService, private fb: FormBuilder, private assemblyTypeService: AssemblyTypeService, private assemblyService: AssemblyService) {
        this.myForm = this.fb.group({
            code: [this.assembly.code, [Validators.required, Validators.minLength(2)]],
            start_serial_number: [this.assembly.start_serial_number, [Validators.required, Validators.pattern('^[0-9]+$')]],
            quantity: [this.assembly.quantity, [Validators.required, Validators.pattern('^[0-9]+$')]],
            selectedOption: [this.assembly.selectedOption, Validators.required],
        });
    }

    close(): void {
        this.myForm.reset();

        this.closeModal.emit();
    }

    setSubmitted(): void {
        console.log('setSubmitted');
        this.isSubmitted = true;
    }

    onSubmit(): void {
        console.log(this.isSubmitted)
        try {
            if (this.myForm.valid) {
                // Access form values using the 'value' property
                this.myForm.value;

                //get the assemblytype from the array
                let selectedAssemblyType = this.assemblyTypes.find((assemblyType) => assemblyType.id === +this.myForm.value.selectedOption);

                if (!selectedAssemblyType) {
                    this.toastr.error('Please select an assembly type', 'Error');
                    return;
                }

                let assemblyData: AssemblyDto = {
                    code: this.myForm.value.code,
                    start_serial_number: +this.myForm.value.start_serial_number,
                    assemblyType: selectedAssemblyType,
                    quantity: +this.myForm.value.quantity
                }

                console.log(this.assembly.id);
                console.log(assemblyData);

                if (this.assembly.id) {
                    this.updateAssembly(assemblyData);
                } else {
                    this.createAssembly(assemblyData);
                }
            }
        } catch (error) {
            // this.toastr.error(error.message, 'Error');
            console.error(error);
        }
    }


    async createAssembly(assemblyData: AssemblyDto): Promise<void> {
        this.assemblyService.createAssembly(assemblyData).subscribe(
            (response) => {
                console.log('Response:', response);
                this.toastr.success('Assembly created successfully', 'Success');
                this.myForm.reset();
                this.closeModal.emit();
                this.refreshAssemblies.emit();
            },
            (error) => {
                this.toastr.error(error.error.message, 'Error');
            }
        );
    }

    async updateAssembly(assemblyData: AssemblyDto): Promise<void> {

        this.assemblyService.updateAssembly(this.assembly.id, assemblyData).subscribe(
            (response) => {
                console.log('Response:', response);
                this.toastr.success('Assembly updated successfully', 'Success');
                this.myForm.reset();
                this.closeModal.emit();
                this.refreshAssemblies.emit();
            },
            (error) => {
                this.toastr.error(error.error.message, 'Error');
            }
        );
    }

    async loadAssemblyTypes(): Promise<void> {
        try {
            const response = await this.assemblyTypeService.getAssemblyTypes().toPromise();
            this.assemblyTypes = response!;
            console.log(this.assemblyTypes);
        } catch (error) {
            console.error('Error fetching assemblyTypes', error);
        }
    }

    ngOnInit(): void {
        this.loadAssemblyTypes();
    }

    //on edit set to selected assembly
    setEditData(changes: any): void {
        this.myForm.patchValue({
            code: changes.code,
            start_serial_number: changes.start_serial_number,
            quantity: changes.quantity,
            selectedOption: changes.selectedOption
        });
    }
}
