import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { BaseFormComponent } from '../../base/form/base-form.component';
import { AllBuildingsNoPaginationGQL, AllEndUsersNoPaginationGQL, AllFloorsNoPaginationGQL, AreaInput, Building, CreateAreaGQL, CreateFloorGQL, CreateGasGQL, EndUser, Floor, FloorInput, GasInput, UpdateAreaGQL, UpdateFloorGQL, UpdateGasGQL } from '../../../../../generated/graphql';
import { Query } from 'apollo-angular';
import { AuthService } from '../../../../services/authentication/auth.service';


@Component({
    selector: 'floor-form',
    templateUrl: './floors-form.component.html',
})
export class FloorFormComponent extends BaseFormComponent<FloorInput> {


    @Input() object: any = {
        endUser: null,
        building: null,
        name: null,
        remarks: '',
    };

    myForm: FormGroup;

    end_users: EndUser[];

    buildings: any[];


    buildingService: AllBuildingsNoPaginationGQL


    constructor(protected override toastr: ToastrService, protected override fb: FormBuilder
        ,
        createService: CreateFloorGQL,
        editService: UpdateFloorGQL,
        endUserService: AllEndUsersNoPaginationGQL,
        buildingService: AllBuildingsNoPaginationGQL,
        authService: AuthService
        ) {
        super(authService, toastr, fb, createService, editService)
        
        this.buildingService = buildingService;

        this.end_users = [];
        this.buildings = [];

        this.setUpDependentData(endUserService);

        this.myForm = this.fb.group({
            endUser: [this.object.endUser, [Validators.required]],
            building: [this.object.building, [Validators.required]],
            name: [this.object.name, [Validators.required]],
            remarks: [this.object.remarks],
        });
    }

    createDto(): any {
        //todo setup owner_id, ownerId
        return {
            buildingId: +this.myForm.value.building,
            name: this.myForm.value.name,
            created: !this.id ? this.dayjs().format() : undefined,
            modified: this.dayjs().format(),
            ownerId: this.authService?.currentUserInfo?.id,
        }
    }

    selectedEndUser(id: string) {

        this.buildings = [];
        this.myForm.patchValue({building: null, floor: null});

        this.buildingService.fetch({userId: [+id]}).subscribe(result => {
            console.log(result?.data?.allBuildings?.nodes)
            this.buildings = result?.data?.allBuildings?.nodes || [];
        });
    }
    
    async setUpDependentData(endUserService: Query<any, any>) {
        endUserService.fetch().subscribe(result => {
            this.end_users = result?.data?.allEndUsers?.nodes || [];
        });
    }


    //on edit set to selected assembly
    setEditData(changes: any): void {
        this.object = {
            id: changes.id,           
            name: changes.name,
            endUser: changes.endUser,
            building: changes.building,
            remarks: changes.remarks,
        };

        this.selectedEndUser(this.object.endUser);

        this.myForm.patchValue(this.object);

        console.log(this.myForm.value);
    }
}