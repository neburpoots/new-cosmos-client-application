import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { BaseFormComponent } from '../../base/form/base-form.component';
import { AllAreasNoPaginationGQL, AllBuildingsNoPaginationGQL, AllEndUsersNoPaginationGQL, AllFloorsNoPaginationGQL, CreateSamplePointGQL, EndUser, SamplePointInput, UpdateSamplePointGQL } from '../../../../../generated/graphql';
import { Query } from 'apollo-angular';


@Component({
    selector: 'sample-point-form',
    templateUrl: './sample-point-form.component.html',
})
export class SamplePointsFormComponent extends BaseFormComponent<SamplePointInput> {

    @Input() object: any = {
        endUser: null,
        building: null,
        floor: null,
        name: null,
        area: null,
        remarks: '',
    };

    myForm: FormGroup;

    end_users: EndUser[];

    buildings: any[];

    floors: any[];

    areas: any[];

    buildingService: AllBuildingsNoPaginationGQL
    floorService: AllFloorsNoPaginationGQL
    areaService: AllAreasNoPaginationGQL

    constructor(protected override toastr: ToastrService, protected override fb: FormBuilder,
        createService: CreateSamplePointGQL,
        editService: UpdateSamplePointGQL,
        endUserService: AllEndUsersNoPaginationGQL,
        buildingService: AllBuildingsNoPaginationGQL,
        floorService: AllFloorsNoPaginationGQL,
        areaService: AllAreasNoPaginationGQL
    ) {
        super(toastr, fb, createService, editService)

        this.buildingService = buildingService;
        this.floorService = floorService;
        this.areaService = areaService;

        this.end_users = [];
        this.buildings = [];
        this.floors = [];
        this.areas = [];

        this.setUpDependentData(endUserService);

        this.myForm = this.fb.group({
            endUser: [this.object.endUser, [Validators.required]],
            building: [this.object.building, [Validators.required]],
            floor: [this.object.floor, [Validators.required]],
            name: [this.object.name, [Validators.required]],
            area: [this.object.area, [Validators.required]],
            remarks: [this.object.remarks],
        });
    }

    createDto(): any {
        //todo setup owner_id, ownerId
        return {
            areaId: +this.myForm.value.area,
            name: this.myForm.value.name,
            created: new Date(),
            modified: new Date(),
            ownerId: 10
        }
    }

    selectedEndUser(id: string) {

        this.floors = [];
        this.buildings = [];
        this.areas = [];
        this.myForm.patchValue({ building: null, floor: null, area: null });

        this.buildingService.fetch({ userId: [+id] }).subscribe(result => {
            console.log(result?.data?.allBuildings?.nodes)
            this.buildings = result?.data?.allBuildings?.nodes || [];
        });
    }

    selectedBuilding(id: string) {

        this.floors = [];
        this.areas = [];
        this.myForm.patchValue({ floor: null, area: null });

        this.floorService.fetch({ buildingId: [+id] }).subscribe(result => {
            console.log(result?.data?.allFloors?.nodes)
            this.floors = result?.data?.allFloors?.nodes || [];
        });
    }

    selectedFloor(id: string) {
        this.areas = [];
        this.myForm.patchValue({ area: null });

        this.areaService.fetch({ floorId: [+id] }).subscribe(result => {
            console.log(result?.data?.allAreas?.nodes)
            this.areas = result?.data?.allAreas?.nodes || [];
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
            area: changes.area,
            remarks: changes.remarks,
        };

        this.selectedEndUser(this.object.endUser);

        this.selectedBuilding(this.object.building);

        this.selectedFloor(this.object.floor)

        this.myForm.patchValue(this.object);

        console.log(this.myForm.value);
    }
}