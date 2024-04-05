import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { BaseFormComponent } from '../../base/form/base-form.component';
import { AllBuildingsNoPaginationGQL, AllEndUsersNoPaginationGQL, AllFloorsNoPaginationGQL, AreaInput, Building, CreateAreaGQL, CreateGasGQL, EndUser, Floor, GasInput, UpdateAreaGQL, UpdateGasGQL } from '../../../../../generated/graphql';
import { Query } from 'apollo-angular';


@Component({
    selector: 'areas-form',
    templateUrl: './areas-form.component.html',
})
export class AreasFormComponent extends BaseFormComponent<AreaInput> {


    @Input() object: any = {
        endUser: null,
        building: null,
        floor: null,
        name: null,
        remarks: '',
    };

    myForm: FormGroup;

    end_users: EndUser[];

    buildings: any[];

    floors: any[];

    buildingService: AllBuildingsNoPaginationGQL
    floorService: AllFloorsNoPaginationGQL


    constructor(protected override toastr: ToastrService, protected override fb: FormBuilder
        ,
        createService: CreateAreaGQL,
        editService: UpdateAreaGQL,
        endUserService: AllEndUsersNoPaginationGQL,
        buildingService: AllBuildingsNoPaginationGQL,
        floorService: AllFloorsNoPaginationGQL

        ) {
        super(toastr, fb, createService, editService)
        
        this.buildingService = buildingService;
        this.floorService = floorService;

        this.end_users = [];
        this.buildings = [];
        this.floors = [];

        this.setUpDependentData(endUserService);

        this.myForm = this.fb.group({
            endUser: [this.object.endUser, [Validators.required]],
            building: [this.object.building, [Validators.required]],
            floor: [this.object.floor, [Validators.required]],
            name: [this.object.name, [Validators.required]],
            remarks: [this.object.remarks],
        });
    }

    createDto(): any {
        //todo setup owner_id, ownerId
        return {
            floorId: +this.myForm.value.floor,
            name: this.myForm.value.name,
            created: new Date(),
            modified: new Date(),
            ownerId: 10
        }
    }

    selectedEndUser(id: string) {

        this.floors = [];
        this.buildings = [];
        this.myForm.patchValue({building: null, floor: null});

        this.buildingService.fetch({userId: [+id]}).subscribe(result => {
            console.log(result?.data?.allBuildings?.nodes)
            this.buildings = result?.data?.allBuildings?.nodes || [];
        });
    }

    selectedBuilding(id: string) {

        this.floors = [];
        this.myForm.patchValue({floor: null});


        this.floorService.fetch({buildingId: [+id]}).subscribe(result => {
            console.log(result?.data?.allFloors?.nodes)
            this.floors = result?.data?.allFloors?.nodes || [];
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
            floor: changes.floor,
            remarks: changes.remarks,
        };

        this.selectedEndUser(this.object.endUser);

        this.selectedBuilding(this.object.building);

        this.myForm.patchValue(this.object);

        console.log(this.myForm.value);
    }
}