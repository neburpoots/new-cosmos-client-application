import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { CalgasDto } from '../../../../models/dto/calgasDto';
import { Gas } from '../../../../models/entities/gas';
import { SearchCriteria } from '../../../../models/utils/searchCriteria';
import { BaseFormComponent } from '../../base/form/base-form.component';
import { AllGasesNoPaginationGQL, AllGroupsNoPaginationGQL, AllPermissionsNoPaginationGQL, CreateCalGasGQL, CreateGroupWithPermissionsGQL, CreateGroupWithPermissionsInput, CreateUserWithGroupsGQL, CreateUserWithGroupsInput, UpdateCalGasGQL, UpdateGroupWithPermissionsGQL, UpdateGroupWithPermissionsInput, UpdateUserWithGroupsGQL, UpdateUserWithGroupsInput, UserInput } from '../../../../../generated/graphql';
import { Query } from 'apollo-angular';
import { FormSelect } from '../../../../models/utils/formSelect';
import { AuthService } from '../../../../services/authentication/auth.service';
import { faCircleXmark, faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'groups-form',
    templateUrl: './groups-form.component.html',
    styles: []
})
export class GroupsFormComponent extends BaseFormComponent<CreateGroupWithPermissionsInput> {

    @Input() object: any = {
        name: '',
        read_permission: null,
        write_permission: null,
    };

    faCircleXmark = faCircleXmark

    myForm: FormGroup;
    permissions: any[];
    selectedWritePermissions: any[] = [];
    selectedReadPermissions: any[] = [];

    constructor(protected override toastr: ToastrService, protected override fb: FormBuilder
        , permissionService: AllPermissionsNoPaginationGQL,
        createService: CreateGroupWithPermissionsGQL,
        editService: UpdateGroupWithPermissionsGQL,
        authService: AuthService,
    ) {
        super(authService, toastr, fb, createService, editService)

        this.authService = authService;

        this.permissions = [];

        this.setUpDependentData(permissionService);

        this.myForm = this.fb.group({
            name: [this.object.name, [Validators.required]],
            write_permission: [this.object.write_permission],
            read_permission: [this.object.read_permission],
        });
    }

    createDto(): CreateGroupWithPermissionsInput {
        //todo setup owner_id, ownerId
        return {
            pName: this.myForm.value.name,
            pReadIds: this.selectedReadPermissions.map(g => g.id),
            pWriteIds: this.selectedWritePermissions.map(g => g.id),
        }
    }

    createUpdateDto(): UpdateGroupWithPermissionsInput {
        return {
            pGroupId: this.object.id,
            pName: this.myForm.value.name,
            pReadIds: this.selectedReadPermissions.map(g => g.id),
            pWriteIds: this.selectedWritePermissions.map(g => g.id),
        }
    }

    
    //override this to empty the selected groups
    override async refreshData(): Promise<void> {
        this.selectedReadPermissions = [];
        this.selectedWritePermissions = [];

        this.authService.refreshPermissions();

        if (this.isInlineCreating) {
            this.refresh.emit();
            this.toggleInlineCreating.emit();
        } else {
            this.refresh.emit();
        }
    }

    //override this for the custom update user function
    override async update(data: any): Promise<void> {

        this.updateService.mutate({ patch: await this.createUpdateDto() }).subscribe(
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

    deleteWritePermission(permission_id: number) {
        this.selectedWritePermissions = this.selectedWritePermissions.filter(g => g.id !== permission_id);
    }

    deleteReadPermission(permission_id: number) {
        this.selectedReadPermissions = this.selectedReadPermissions.filter(g => g.id !== permission_id);
    }

    setPermission(permission_id: string, selectedPermissions: any[]) {

        this.object.write_permission = null;
        this.object.read_permission = null;
        this.myForm.patchValue({ read_permission: null, write_permission: null})

        if (selectedPermissions.find(g => g.id === +permission_id)) {
            return;
        }
        selectedPermissions.push(this.permissions.find(g => g.id === +permission_id))
    }

    async setUpDependentData(permissionService: Query<any, any>) {
        permissionService.fetch().subscribe(result => {
            console.log(result)
            this.permissions = result?.data?.allPermissions?.nodes || [];
        });
    }

    //on edit set to selected assembly
    setEditData(changes: any): void {

        this.selectedReadPermissions = this.permissions.filter(p => changes.groupPermissionByGroupId?.readIds.includes(p.id));
        this.selectedWritePermissions = this.permissions.filter(p => changes.groupPermissionByGroupId?.writeIds.includes(p.id));

        this.object = {
            id: changes.id,
            name: changes.name,
            write_permission: null,
            read_permission: null,
        };

        this.myForm.patchValue(this.object);
    }
}