import { Component, Input, } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { BaseFormComponent } from '../../base/form/base-form.component';
import { AllCalibrationGasesNoPaginationGQL, AllChemicalCompoundsNoPaginationGQL, AllElectrolytesNoPaginationGQL, AllFiltersNoPaginationGQL, AllMembranesNoPaginationGQL, AllORingsNoPaginationGQL, AllPyrolysersNoPaginationGQL, AllRangesNoPaginationGQL, AllSensorBaseTypesNoPaginationGQL, CreateMembraneGQL, CreateSensorTypeGQL, SensorTypeInput, SensorTypesIndex, UpdateMembraneGQL, UpdateSensorTypeGQL } from '../../../../../generated/graphql';
import { Query } from 'apollo-angular';
import { AuthService } from '../../../../services/authentication/auth.service';

@Component({
    selector: 'sensor-types-form',
    templateUrl: './sensor-types-form.component.html',
})
export class SensorTypesFormComponent extends BaseFormComponent<SensorTypeInput> {

    myForm: FormGroup;

    sensorBaseTypes: any[] = [];

    ranges: any[] = [];

    calGases: any[] = [];

    electrolytes: any[] = [];

    membranes: any[] = [];

    oRings: any[] = [];

    filters: any[] = [];

    @Input() object: any = [
        {
            position: 0,
            value: null,
            name: 'sensorBaseTypeId',
            displayName: 'Sensor Base Type',
            component: 'select',
            placeholder: 'Select Sensor Base Type',
            type: null,
            customName: [['prefix'], ['suffix']],
            options: this.sensorBaseTypes,
            validators: [Validators.required]
        },
        {
            position: 1,
            value: '',
            name: 'code',
            displayName: 'Code',
            component: 'input',
            placeholder: 'Enter Code',
            type: 'text',
            options: [],
            validators: [Validators.required]
        },
        {
            position: 2,
            value: '',
            name: 'model',
            displayName: 'Model',
            component: 'input',
            placeholder: 'Enter Model',
            type: 'text',
            options: [],
            validators: [Validators.required]
        },
        {
            position: 3,
            value: null,
            name: 'rangeId',
            displayName: 'Range',
            component: 'select',
            placeholder: 'Select Range',
            type: null,
            customName: [['gasByGasId', 'name'], '(', ['lowEu'], '-', ['highEu'], ' ', ['engineeringUnits'], ')'],
            options: this.ranges,
            validators: [Validators.required]
        },
        {
            position: 4,
            value: '',
            name: 'flowRate',
            displayName: 'Flow Rate',
            component: 'input',
            placeholder: 'Enter Flow Rate',
            type: 'text',
            options: [],
            validators: [Validators.pattern('^[0-9]+(\.[0-9]+)?$')]
        },
        {
            position: 5,
            value: null,
            name: 'calGasId',
            displayName: 'Calibration Gas',
            component: 'select',
            placeholder: 'Select Calibration Gas',
            type: null,
            customName: [['name'], '(', ['concentration'], ' ', ['engineeringUnits'], ')'],
            options: this.calGases,
            validators: [Validators.required]
        },
        {
            position: 6,
            value: '',
            name: 'flowRateMin',
            displayName: 'Flow Rate Min',
            component: 'input',
            placeholder: 'Enter Flow Rate Min',
            type: 'text',
            options: [],
            validators: [Validators.pattern('^[0-9]+(\.[0-9]+)?$')]
        },
        {
            position: 7,
            value: null,
            name: 'electrolyteId',
            displayName: 'Electrolyte',
            component: 'select',
            placeholder: 'Select Electrolyte',
            type: null,
            options: this.electrolytes,
            validators: [Validators.required]
        },
        {
            position: 8,
            value: null,
            name: 'membraneId',
            displayName: 'Membrane',
            component: 'select',
            placeholder: 'Select Membrane',
            type: null,
            options: this.membranes,
            validators: [Validators.required]
        },
        {
            position: 9,
            value: null,
            name: 'oRingId',
            displayName: 'O Ring',
            component: 'select',
            placeholder: 'Select O Ring',
            type: null,
            options: this.oRings,
            validators: [Validators.required]
        },
        {
            position: 10,
            value: false,
            name: 'hasSiliconeSheet',
            displayName: 'Silicone Sheet',
            component: 'checkbox',
            placeholder: 'Select Has Silicone Sheet',
            type: 'checkbox',
            customName: [['prefix'], ['suffix']],
            options: [],
            validators: []
        },
        {
            position: 11,
            value: null,
            name: 'pyrolyserId',
            displayName: 'Pyrolyser',
            component: 'select',
            placeholder: 'Select Pyrolyser',
            type: null,
            options: [],
            validators: [Validators.required]
        },
        {
            position: 12,
            value: '',
            name: 'pyrolyserVoltage',
            displayName: 'Pyrolyser Voltage',
            component: 'input',
            placeholder: 'Enter Pyrolyser Voltage',
            type: 'text',
            customName: [['prefix'], ['suffix']],
            options: [],
            validators: [Validators.pattern('^[0-9]+(\.[0-9]+)?$')]
        },
        {
            position: 13,
            value: null,
            name: 'filterId',
            displayName: 'Filter',
            component: 'select',
            placeholder: 'Select Filter',
            isRequired: false,
            type: null,
            options: this.filters,
            validators: []
        },
        {
            position: 14,
            value: false,
            name: 'hasBattery',
            displayName: 'Battery',
            component: 'checkbox',
            type: 'checkbox',
            options: [],
            validators: []
        },
        {
            position: 15,
            value: false,
            name: 'hasRestrictor',
            displayName: 'Restrictor',
            component: 'checkbox',
            type: 'checkbox',
            customName: [['prefix'], ['suffix']],
            options: [],
            validators: []
        },
        {
            position: 16,
            value: false,
            name: 'hasMembraneSeal',
            displayName: 'Membrane Seal',
            component: 'checkbox',
            type: 'checkbox',
            options: [],
            validators: []
        },
        {
            position: 17,
            value: '',
            name: 'elementCount',
            displayName: 'Element Count',
            component: 'input',
            placeholder: 'Enter Element Count',
            type: 'text',
            options: [],
            validators: [Validators.pattern('^[0-9]*$')]
        },
        {
            position: 18,
            value: '',
            name: 'maintenanceIntervalMonths',
            displayName: 'Maintenance Interval Months',
            component: 'input',
            placeholder: 'Enter Maintenance Interval Months',
            type: 'text',
            options: [],
            validators: [Validators.pattern('^[0-9]*$')]
        },
        {
            position: 19,
            value: '',
            name: 'replacementIntervalMonths',
            displayName: 'Replacement Interval Months',
            component: 'input',
            placeholder: 'Enter Replacement Interval Months',
            type: 'text',
            options: [],
            validators: [Validators.pattern('^[0-9]*$')]
        },
        {
            position: 20,
            value: '',
            name: 'part',
            displayName: 'Part',
            component: 'input',
            placeholder: 'Enter Part',
            type: 'text',
            options: [],
            validators: []
        },
        {
            position: 21,
            value: '',
            name: 'volume',
            displayName: 'Volume',
            component: 'input',
            placeholder: 'Enter Volume',
            type: 'text',
            options: [],
            validators: [Validators.pattern('^[0-9]+(\.[0-9]+)?$')]
        },
    ];


    constructor(protected override toastr: ToastrService, protected override fb: FormBuilder
        ,
        createService: CreateSensorTypeGQL,
        editService: UpdateSensorTypeGQL,
        sensorBaseTypesService: AllSensorBaseTypesNoPaginationGQL,
        calGasesService: AllCalibrationGasesNoPaginationGQL,
        electrolytesService: AllElectrolytesNoPaginationGQL,
        membranesService: AllMembranesNoPaginationGQL,
        oRingsService: AllORingsNoPaginationGQL,
        filtersService: AllFiltersNoPaginationGQL,
        rangeService: AllRangesNoPaginationGQL,
        pyrolyserService: AllPyrolysersNoPaginationGQL,
        authService: AuthService
    ) {
        super(authService, toastr, fb, createService, editService)

        this.setUpDependentData(sensorBaseTypesService, calGasesService, electrolytesService, 
            membranesService, oRingsService, filtersService, rangeService, pyrolyserService);

        let formObject : any = {};

        this.object.forEach((field : any) => {
            formObject[field.name] = [field.value, field.validators];
        });

        this.myForm = this.fb.group(formObject);
    }

    createDto(): SensorTypeInput {
        //todo setup owner_id, ownerId
        return {
            sensorBaseTypeId: +this.myForm.value.sensorBaseTypeId,
            code: this.myForm.value.code,
            model: this.myForm.value.model,
            rangeId: +this.myForm.value.rangeId,
            flowRate: +this.myForm.value.flowRate,
            calGasId: +this.myForm.value.calGasId,
            calFlowRate: +this.myForm.value.flowRateMin,
            electrolyteId: +this.myForm.value.electrolyteId,
            membraneId: +this.myForm.value.membraneId,
            oRingId: +this.myForm.value.oRingId,
            siliconeSheet: this.myForm.value.hasSiliconeSheet,
            pyrolyserId: +this.myForm.value.pyrolyserId,
            pyrolyserVoltage: +this.myForm.value.pyrolyserVoltage,
            filterId: +this.myForm.value.filterId,
            battery: this.myForm.value.hasBattery,
            restrictor: this.myForm.value.hasRestrictor,
            membraneSeal: this.myForm.value.hasMembraneSeal,
            elementCount: +this.myForm.value.elementCount,
            maintenanceIntervalMonths: +this.myForm.value.maintenanceIntervalMonths,
            replacementIntervalMonths: +this.myForm.value.replacementIntervalMonths,
            cdartikel: this.myForm.value.part,
            volume: +this.myForm.value.volume,
            created: !this.id ? this.dayjs().format() : undefined,
            modified: this.dayjs().format(),
            ownerId: this.authService?.currentUserInfo?.id ?? 10,
        }
    }

    async setUpDependentData(
        sensorBaseTypesService: Query<any, any>,
        calGasesService: Query<any, any>,
        electrolytesService: Query<any, any>,
        membranesService: Query<any, any>,
        oRingsService: Query<any, any>,
        filtersService: Query<any, any>,
        rangesService: Query<any, any>,
        pyrolyserService: Query<any, any>) 
    {
        sensorBaseTypesService.fetch().subscribe(result => {
            this.object[0].options = result?.data?.allSensorBaseTypes?.nodes || [];
        });

        calGasesService.fetch().subscribe(result => {

            this.calGases = result?.data?.allCalgasEntities?.nodes || [];
            this.object[5].options = this.calGases;
        });

        electrolytesService.fetch().subscribe(result => {
            this.electrolytes = result?.data?.allElectrolytes?.nodes || [];
            this.object[7].options = this.electrolytes;
        });

        membranesService.fetch().subscribe(result => {
            this.membranes = result?.data?.allMembranes?.nodes || [];
            this.object[8].options = this.membranes;
        });

        oRingsService.fetch().subscribe(result => {
            this.oRings = result?.data?.allORings?.nodes || [];
            this.object[9].options = this.oRings;
        });

        filtersService.fetch().subscribe(result => {
            console.log(result);
            this.filters = result?.data?.allFilters?.nodes || [];
            this.object[13].options = this.filters;
        });

        rangesService.fetch().subscribe(result => {
            this.object[3].options = result?.data?.allRanges?.nodes || [];
        })

        pyrolyserService.fetch().subscribe(result => {
            this.object[11].options = result?.data?.allPyrolysers?.nodes || [];
        });


    }


    //on edit set to selected assembly
    setEditData(changes: any): void {

        this.object = this.object.map((field : any) => {
            field.value = changes ? changes[field.name] : field.value;
            return field;
        });

        this.object.id  = changes?.id;

        let editValues = {
            id: changes?.id,
            sensorBaseTypeId: changes?.sensorBaseTypeId,
            code: changes?.code,
            model: changes?.model,
            rangeId: changes?.rangeId,
            flowRate: changes?.flowRate,
            calGasId: changes?.calGasId,
            flowRateMin: changes?.calFlowRate,
            electrolyteId: changes?.electrolyteId,
            membraneId: changes?.membraneId,
            oRingId: changes?.oRingsId,
            hasSiliconeSheet: changes?.siliconeSheet,
            pyrolyserId: changes?.pyrolyserId,
            pyrolyserVoltage: changes?.pyrolyserVoltage,
            filterId: changes?.filterId,
            hasBattery: changes?.battery,
            hasRestrictor: changes?.restrictor,
            hasMembraneSeal: changes?.membraneSeal,
            elementCount: changes?.elementCount,
            maintenanceIntervalMonths: changes?.maintenanceIntervalMonths,
            replacementIntervalMonths: changes?.replacementIntervalMonths,
            part: changes?.sensorTypeCdartikel,
            volume: changes?.volume,
            ownerId: changes?.ownerId,
        };

        this.myForm.patchValue(editValues);
    }
}