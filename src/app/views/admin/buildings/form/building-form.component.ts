import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { BaseFormComponent } from '../../base/form/base-form.component';
import { AllEndUsersNoPaginationGQL, BuildingInput,  CreateBuildingGQL, EndUser, UpdateBuildingGQL } from '../../../../../generated/graphql';
import { Query } from 'apollo-angular';


@Component({
    selector: 'building-form',
    templateUrl: './building-form.component.html',
})
export class BuildingFormComponent extends BaseFormComponent<BuildingInput> {


    @Input() object: any = {
        endUser: null,
        name: null,
        remarks: '',
    };

    myForm: FormGroup;

    end_users: EndUser[];

    constructor(protected override toastr: ToastrService, protected override fb: FormBuilder
        ,
        createService: CreateBuildingGQL,
        editService: UpdateBuildingGQL,
        endUserService: AllEndUsersNoPaginationGQL,
        ) {
        super(toastr, fb, createService, editService)
        
        this.end_users = [];

        this.setUpDependentData(endUserService);

        this.myForm = this.fb.group({
            endUser: [this.object.endUser, [Validators.required]],
            name: [this.object.name, [Validators.required]],
            remarks: [this.object.remarks],
        });
    }

    createDto(): BuildingInput {
        //todo setup owner_id, ownerId
        return {
            endUserId: +this.myForm.value.endUser,
            name: this.myForm.value.name,
            created: new Date(),
            modified: new Date(),
            ownerId: 10
        }
    }

    
    async setUpDependentData(endUserService: Query<any, any>) {
        endUserService.fetch().subscribe(result => {
            this.end_users = result?.data?.allEndUsers?.nodes || [];
        });
    }


    //on edit set to selected assembly
    setEditData(changes: any): void {
        console.log(changes)
        this.object = {
            id: changes.id,           
            name: changes.name,
            endUser: changes.endUser,
        };

        this.myForm.patchValue(this.object);

        console.log(this.myForm.value);
    }
}