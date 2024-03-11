import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AssemblyTypeService } from '../../../../services/assemblyType/assemblyType.service';
import { AssemblyService } from '../../../../services/assembly/assembly.service';
import { ToastrService } from 'ngx-toastr';
import AssemblyType from '../../../../models/entities/assemblyType';
import { ErrorResponse } from '../../../../models/utils/errorResponse';
import { AssemblyDto } from '../../../../models/dto/assemblyDto';
import { TableHeader } from '../../../../models/utils/tableHeader';

@Component({
    selector: 'assembly-create',
    templateUrl: './assembly-create.component.html',
    styles: []
})
export class AssemblyCreateComponent {

    @Output() closeModal = new EventEmitter<void>();
    @Output() refreshAssemblies = new EventEmitter<void>();

    @Input() cellWidths : number[] = [];
    @Input() isInlineCreating: boolean = false;
    @Output() toggleInlineCreating = new EventEmitter<void>();

    myForm: FormGroup;

    isSubmitted = false;

    assemblyTypes: AssemblyType[] = [];

    


    assembly = {
        code: '',
        start_serial_number: '',
        selectedOption: null,
        quantity: '',
    };

    constructor(private toastr: ToastrService, private fb: FormBuilder, private assemblyTypeService: AssemblyTypeService, private assemblyService: AssemblyService) {
        this.myForm = this.fb.group({
            code: [this.assembly.code, [Validators.required, Validators.minLength(2)]],
            start_serial_number: [this.assembly.start_serial_number, [Validators.required, Validators.pattern('^[0-9]+$')]],
            quantity: [this.assembly.quantity, [Validators.required, Validators.pattern('^[0-9]+$')]],
            selectedOption: [this.assembly.selectedOption, Validators.required], // Add a form control for the select component

        });
    }

    get selectedOption(): AssemblyType | null {
        let selectedAssemblyType = this.assemblyTypes.find((assemblyType) => assemblyType.id === +this.myForm.value.selectedOption);
        if(selectedAssemblyType) {
            return selectedAssemblyType;

        }
        return null;
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
                    quantity: this.myForm.value.quantity
                }

                console.log(assemblyData);

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
        } catch (error) {
            // this.toastr.error(error.message, 'Error');
            console.error(error);
        }
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
}
