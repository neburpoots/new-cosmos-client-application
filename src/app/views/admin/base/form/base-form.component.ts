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
import { SearchCriteria } from '../../../../models/utils/searchCriteria';
import { Mutation, Query } from 'apollo-angular';
import { SearchFilters } from '../../../../models/utils/searchFilters';

@Component({
    selector: 'base-form',
    templateUrl: './base-form.component.html',
})
export abstract class BaseFormComponent<T> {

    @Output() closeModal = new EventEmitter<void>();
    @Output() refresh = new EventEmitter<SearchFilters | undefined>();
    @Output() toggleInlineCreating = new EventEmitter<void>();

    @Input() cellWidths: number[] = [];

    @Input() objectSingle: string = '';
    @Input() objectPlural: string = '';

    //used for the inline table create
    @Input() isInlineCreating: boolean = false;
    @Input() baseOrderBy: any = null;

    get objectSingleLowerCase(): string {
        return this.objectSingle!.toLowerCase();
    }

    get objectPluralLowerCase(): string {
        return this.objectPlural!.toLowerCase();
    }

    abstract myForm: FormGroup;

    abstract object: T;


    //when the form is submitted this is the criteria to be used to refresh the data used id as standard since it is the most common
    //override this incase of a different primary key
    refreshCriteria: SearchFilters = {
        orderBy: [this.baseOrderBy],
        search: "",
        limit: 10,
        offset: 0,
        totalPages: 0,
        total: 0,
        page: 1,
    }


    protected isSubmitted = false;

    constructor(
        protected toastr: ToastrService,
        protected fb: FormBuilder,
        protected createService: Mutation<any, any>,
        protected updateService: Mutation<any, any>,

    ) {
    }

    close(): void {
        this.myForm.reset();

        this.closeModal.emit();
    }

    setSubmitted(): void {
        this.isSubmitted = true;
    }

    //refreshes the data
    async refreshData(): Promise<void> {
        if (this.isInlineCreating) {
            this.refresh.emit();
            this.toggleInlineCreating.emit();
        } else {
            this.refresh.emit();
        }
    }


    async create(data: T): Promise<void> {
        this.createService.mutate({body: data}).subscribe(
            (response) => {
                console.log('Response:', response);
                this.toastr.success(`${this.objectSingle} created successfully`, 'Success');
                this.myForm.reset();
                this.closeModal.emit();
                this.refreshData();
            },
            (error) => {
                this.toastr.error(error?.message, 'Error');
                // this.toastr.error(error?.error?.message, 'Error');
            }
        );
    }


    get id(): number {
        return (this.object as any).id;
    }

    async update(data: T): Promise<void> {

        this.updateService.mutate({ id: this.id, patch: data }).subscribe(
            (response) => {
                console.log('Response:', response);
                this.toastr.success(`${this.objectSingle} updated successfully`, 'Success');
                this.myForm.reset();
                this.closeModal.emit();
                this.refreshData();
            },
            (error) => {
                this.toastr.error(error.message, 'Error');
            }
        );

    }

    onSubmit(): void {
        try {
            console.log(this.myForm)
            if (this.myForm.valid) {

                let objectDto: T = this.createDto();

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
    async getDependentData(service: Query<any, any>, property: any): Promise<any> {
        try {
            const response = await service.fetch().toPromise();
            console.log('Response:', response);
            property = response?.data;
        } catch (error) {
            console.error('Error fetching dependent data', error);
        }
    }

    //gets called oninit to load dependent data
    //sets the edit data to the form
    abstract setEditData(changes: any): void;
}
