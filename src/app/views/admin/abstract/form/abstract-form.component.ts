import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AssemblyTypeService } from '../../../../services/assemblyType/assemblyType.service';
import { AssemblyService } from '../../../../services/assembly/assembly.service';
import { ToastrService } from 'ngx-toastr';
import AssemblyType from '../../../../models/entities/assemblyType';
import { AssemblyDto } from '../../../../models/dto/assemblyDto';
import { ErrorResponse } from '../../../../models/utils/errorResponse';
import { Assembly } from '../../../../models/entities/assembly';
import { DetectorTypeService } from '../../../../services/detectorType/detectorType.service';
import DetectorType from '../../../../models/entities/detectorType';
import { DetectorDto } from '../../../../models/dto/detectorDto';
import { AbstractService } from '../../../../services/abstract/abstract.service';
import { IAbstractForm } from '../../../../models/interface/IAbstractForm';

@Component({
    selector: 'abstract-form',
    templateUrl: './abstract-form.component.html',
    styles: []
})
export abstract class AbstractFormComponent<T> implements IAbstractForm<T> {

    @Output() closeModal = new EventEmitter<void>();
    @Output() refresh = new EventEmitter<void>();


    @Input() objectSingle: string = '';
    @Input() objectPlural: string = '';

    get objectSingleLowerCase(): string {
        return this.objectSingle!.toLowerCase();
    }

    get objectPluralLowerCase(): string {
        return this.objectPlural!.toLowerCase();
    }

    abstract myForm: FormGroup;

    abstract object: T;

    abstract url: string;

    constructor(protected toastr: ToastrService, protected fb: FormBuilder, protected abstractService: AbstractService<T>) {

    }

    close(): void {
        this.myForm.reset();

        this.closeModal.emit();
    }

    async create(data: T): Promise<void> {
        this.abstractService.create(this.url, data).subscribe(
            (response) => {
                console.log('Response:', response);
                this.toastr.success(`${this.objectSingle} created successfully`, 'Success');
                this.myForm.reset();
                this.closeModal.emit();
                this.refresh.emit();
            },
            (error) => {
                this.toastr.error(error.error.message, 'Error');
            }
        );
    }

    get id(): number {
        return (this.object as any).id;
    }

    async update(data: T): Promise<void> {
        this.abstractService.update(this.url, this.id, data).subscribe(
            (response) => {
                console.log('Response:', response);
                this.toastr.success(`${this.objectSingle} updated successfully`, 'Success');
                this.myForm.reset();
                this.closeModal.emit();
                this.refresh.emit();
            },
            (error) => {
                this.toastr.error(error.error.message, 'Error');
            }
        );
    }

    onSubmit(): void {
        try {
            console.log(this.myForm)
            if (this.myForm.valid) {

                let objectDto : T = this.createDto();

                if (this.id) {
                    this.update(objectDto);
                } else {
                    this.create(objectDto);
                }
            }
        } catch (error) {
            // this.toastr.error(error.message, 'Error');
            console.error(error);
        }
    }

    //method to create dto from form data
    abstract createDto(): T;

    //method to load parent data or dependent data for form.
    async getDependentData(prefix: string): Promise<any> {
        try {
            const response = await this.abstractService.getDependentData(prefix).toPromise();
            
            return response;
        } catch (error) {
            console.error('Error fetching dependent data', error);
        }
    }

    //gets called oninit to load dependent data
    abstract setUpDependentData(): void;

    abstract setEditData(changes: any): void;
}
