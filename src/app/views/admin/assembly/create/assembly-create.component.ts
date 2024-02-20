import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AssemblyTypeService } from '../../../../services/assemblyType/assemblyType.service';
import { AssemblyService } from '../../../../services/assembly/assembly.service';

@Component({
    selector: 'assembly-create',
    templateUrl: './assembly-create.component.html',
    styles: []
})
export class AssemblyCreateComponent {

    myForm: FormGroup;

    assemblyTypes: any[] = [];

    assemblyType = {
        batch: '',
        start_serial_number: '',
        selectedOption: null,
        quantity: '',
    };


    constructor(private fb: FormBuilder, private assemblyTypeService: AssemblyTypeService, private assemblyService: AssemblyService) {
        this.myForm = this.fb.group({
            batch: [this.assemblyType.batch, [Validators.required, Validators.minLength(2)]],
            start_serial_number: [this.assemblyType.start_serial_number, [Validators.required, Validators.pattern('^[0-9]+$')]],
            quantity: [this.assemblyType.quantity, [Validators.required, Validators.pattern('^[0-9]+$')]],
            selectedOption: [this.assemblyType.selectedOption, Validators.required], // Add a form control for the select component
            
        });
    }

    onSubmit(): void {
        if (this.myForm.valid) {
            // Access form values using the 'value' property
            console.log('Form submitted:', this.myForm.value);
        }
    }

    async loadAssemblyTypes(): Promise<void> {
        try {
          const response = await this.assemblyTypeService.getAssemblyTypes().toPromise();
          this.assemblyTypes = response!;
        } catch (error) {
          console.error('Error fetching assemblyTypes', error);
        }
      }

    ngOnInit(): void {
        this.loadAssemblyTypes();
    }
}
