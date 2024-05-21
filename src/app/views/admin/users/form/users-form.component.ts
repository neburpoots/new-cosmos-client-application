import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { CalgasDto } from '../../../../models/dto/calgasDto';
import { Gas } from '../../../../models/entities/gas';
import { SearchCriteria } from '../../../../models/utils/searchCriteria';
import { BaseFormComponent } from '../../base/form/base-form.component';
import { AllGasesNoPaginationGQL, AllGroupsNoPaginationGQL, CreateCalGasGQL, CreateUserWithGroupsGQL, CreateUserWithGroupsInput, UpdateCalGasGQL, UpdateUserWithGroupsGQL, UpdateUserWithGroupsInput, UserInput } from '../../../../../generated/graphql';
import { Query } from 'apollo-angular';
import { FormSelect } from '../../../../models/utils/formSelect';
import { AuthService } from '../../../../services/authentication/auth.service';

@Component({
    selector: 'users-form',
    templateUrl: './users-form.component.html',
    styles: []
})
export class UsersFormComponent extends BaseFormComponent<CreateUserWithGroupsInput> {

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
        createUserGroupService: CreateUserWithGroupsGQL,
        editUserWithGroupsService: UpdateUserWithGroupsGQL,
        authService: AuthService
    ) {
        super(authService, toastr, fb, createUserGroupService, editUserWithGroupsService)

        this.groups = [];

        this.setUpDependentData(groupService);

        //if edit then password is not required
        let passwordValidation = this.id ? [Validators.minLength(6)] : [Validators.required, Validators.minLength(6)];
        let confimPasswordValidation = this.id ? [Validators.minLength(6)] : [Validators.required, Validators.minLength(6)];

        this.myForm = this.fb.group({
            username: [this.object.gas, [Validators.required]],
            fullname: [this.object.fullname, [Validators.required]],
            initials: [this.object.initials, [Validators.required]],
            password: [this.object.password, passwordValidation],
            confirmPassword: [this.object.confirmPassword, confimPasswordValidation],
            group: [this.object.group],
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

    // if the password is not empty then make the confirm password required
    // only used for edit
    async makeConfirmPasswordRequired(password: string) {
        if (password && password.length > 0) {
            this.myForm.get('confirmPassword')?.setValidators([Validators.required, Validators.minLength(6), this.confirmPasswordValidator]);
            this.myForm.get('confirmPassword')?.updateValueAndValidity();
        } else {
            this.myForm.get('confirmPassword')?.setValidators([Validators.minLength(6), this.confirmPasswordValidator]);
            this.myForm.get('confirmPassword')?.updateValueAndValidity();
        }
    }

    createDto(): CreateUserWithGroupsInput {
        //todo setup owner_id, ownerId
        return {
            pUsername: this.myForm.value.username,
            pFullname: this.myForm.value.fullname,
            pPassword: this.myForm.value.password, 
            pInitials: this.myForm.value.initials,
            pGroups: this.selectedGroups.map(g => g.id),
        }
    }

    createUpdateDto(): UpdateUserWithGroupsInput {

        let object : UpdateUserWithGroupsInput = {
            pUserId: this.object.id,
            pUsername: this.myForm.value.username,
            pFullname: this.myForm.value.fullname,
            pInitials: this.myForm.value.initials,
            pGroups: this.selectedGroups.map(g => g.id),
        }

        if(this.myForm.value.password) {
            object.pPassword = this.myForm.value.password;
        }

        return object;
    }

    
    //override this to empty the selected groups
    override async refreshData(): Promise<void> {
        this.selectedGroups = [];

        if (this.isInlineCreating) {
            this.refresh.emit();
            this.toggleInlineCreating.emit();
        } else {
            this.refresh.emit();
        }
    }

    //override this for the custom update user function
    override async update(data: any): Promise<void> {

        this.updateService.mutate({ patch: await this.createUpdateDto() }, { fetchPolicy: 'no-cache'}).subscribe(
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

    async setUpDependentData(groupService: Query<any, any>) {
        groupService.fetch(null, { fetchPolicy: 'no-cache'}).subscribe(result => {
            console.log(result)
            this.groups = result?.data?.allGroups?.nodes || [];
        });
    }

    //on edit set to selected assembly
    setEditData(changes: any): void {
        console.log('Changes:', changes)

        this.selectedGroups = changes.groups;

        let passwordControl = this.myForm.get('password');
        let confirmPasswordControl = this.myForm.get('confirmPassword');

        //if edit then password is not required
        if (passwordControl && confirmPasswordControl) {
            passwordControl.setValidators([Validators.minLength(6)]);
            confirmPasswordControl.setValidators([Validators.minLength(6), this.confirmPasswordValidator]);

            passwordControl.updateValueAndValidity();
            confirmPasswordControl.updateValueAndValidity();
        }

        this.object = {
            id: changes.id,
            fullname: changes.fullname,
            username: changes.username,
            initials: changes.initials,
            group: null
        };

        this.myForm.patchValue(this.object);
    }
}