import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { CalgasDto } from '../../../../models/dto/calgasDto';
import { Gas } from '../../../../models/entities/gas';
import { SearchCriteria } from '../../../../models/utils/searchCriteria';
import { BaseFormComponent } from '../../base/form/base-form.component';
import { AllGasesNoPaginationGQL, AllGroupsNoPaginationGQL, CreateCalGasGQL, CreateUserGQL, UpdateCalGasGQL, UserInput } from '../../../../../generated/graphql';
import { Query } from 'apollo-angular';
import { FormSelect } from '../../../../models/utils/formSelect';

@Component({
    selector: 'users-form',
    templateUrl: './users-form.component.html',
    styles: []
})
export class UsersFormComponent extends BaseFormComponent<UserInput> {

    @Input() object: any = {
        username: '',
        fullname: '',
        password: '',
        confirmPassword: '',
        initials: '',
        group: null,
    };

    myForm: FormGroup;
    groups: any[];
    selectedGroups: any[] = [];

    constructor(protected override toastr: ToastrService, protected override fb: FormBuilder
        , groupService: AllGroupsNoPaginationGQL,
        createCalGasService: CreateUserGQL,
        editCalGasService: UpdateCalGasGQL
    ) {
        super(toastr, fb, createCalGasService, editCalGasService)

        this.groups = [];

        this.setUpDependentData(groupService);
        this.myForm = this.fb.group({
            username: [this.object.gas, [Validators.required]],
            fullname: [this.object.fullname, [Validators.required]],
            initials: [this.object.initials, [Validators.required]],
            password: [this.object.password, [Validators.required, Validators.minLength(6)]],
            confirmPassword: [this.object.confirmPassword, [Validators.required, this.confirmPasswordValidator]],
            group: [this.object.group, []],
        });
    }

    // Custom validator function to check if confirmPassword matches password
    confirmPasswordValidator(control: AbstractControl): { [key: string]: boolean } | null {
        const password = control.root.get('password');
        const confirmPassword = control.value;
        // Check if password and confirmPassword match
        if (password && confirmPassword && password.value !== confirmPassword) {
            return { 'passwordMismatch': true };
        }
        return null;
    }

    createDto(): UserInput {
        //todo setup owner_id, ownerId
        return {
            username: this.myForm.value.username,
            fullname: this.myForm.value.fullname,
            password: this.myForm.value.password, 
            initials: this.myForm.value.initials,
            created: new Date(),
            modified: new Date(),
        }

    }

    deleteGroup(group_id: number) {
        this.selectedGroups = this.selectedGroups.filter(g => g.id !== group_id);
    }

    setGroups(group_id: string) {
        if (this.selectedGroups.find(g => g.id === +group_id)) {
            return;
        }
        this.selectedGroups.push(this.groups.find(g => g.id === +group_id))

        this.object.group = null;
        this.myForm.patchValue({ group: null })
    }

    //override create method since user needs to insert queries
    override async create(data: any): Promise<void> {
        this.createService.mutate({ body: data }).subscribe(
            (response) => {
                console.log('Response:', response);
                this.toastr.success(`${this.objectSingle} created successfully`, 'Success');
                this.myForm.reset();
                this.closeModal.emit();
                this.refreshData();
            },
            (error) => {
                console.error('Error:', error);
                this.toastr.error(error?.message, 'Error');
                // this.toastr.error(error?.error?.message, 'Error');
            }
        );
    }

    async setUpDependentData(groupService: Query<any, any>) {
        groupService.fetch().subscribe(result => {
            console.log(result)
            this.groups = result?.data?.allGroups?.nodes || [];
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