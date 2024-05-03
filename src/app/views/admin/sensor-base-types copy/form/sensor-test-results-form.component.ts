import { Component, Input, } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { BaseFormComponent } from '../../base/form/base-form.component';
import { AllCalibrationGasesNoPaginationGQL, AllSensorBaseTypesNoPaginationGQL, AllSensorTypesNoPaginationGQL, AllSensorsGQL, AllUsersNoPaginationGQL, CalgasEntity, CreateMembraneGQL, CreateSensorBaseTypeGQL, CreateSensorTestResultGQL, Principle, Sensor, SensorBaseType, SensorBaseTypeInput, SensorIndex, SensorTestResultInput, SensorTestResultsEntity, SensorType, SensorTypeInput, SensorTypesIndex, UpdateMembraneGQL, UpdateSensorBaseTypeGQL, UpdateSensorTestResultGQL, User } from '../../../../../generated/graphql';
import { Query } from 'apollo-angular';
import { AuthService } from '../../../../services/authentication/auth.service';


@Component({
    selector: 'sensor-test-results-form',
    templateUrl: './sensor-test-results-form.component.html',
})
export class SensorTestResultsFormComponent extends BaseFormComponent<SensorTestResultInput> {

    @Input() object: any = {
        order: '',
        serialNumber: '',
        sensorId: null,
        labelDate: null,
        zeroResponse: null,
        zeroResponsePercentage: null,
        zeroResponseMa: null,
        fsCalGasId: null,
        usedSpanConcentration: null,
        spanResponse: null,
        spanResponsePercentage: null,
        spanResponseMa: null,
        userId: null,
    };

    myForm: FormGroup;

    sensorBaseTypes: SensorBaseType[];

    sensorTypes: SensorTypesIndex[];

    calGases: CalgasEntity[];

    suggestedSensors: SensorIndex[];

    selectedSensor: SensorIndex | null;

    users: User[];

    sensorTypeService: Query<any, any>;
    sensorService: Query<any, any>;

    constructor(
        protected override toastr: ToastrService,
        protected override fb: FormBuilder,
        createService: CreateSensorTestResultGQL,
        editService: UpdateSensorTestResultGQL,
        sensorBaseTypeService: AllSensorBaseTypesNoPaginationGQL,
        sensorTypeService: AllSensorTypesNoPaginationGQL,
        calGasesService: AllCalibrationGasesNoPaginationGQL,
        userService: AllUsersNoPaginationGQL,
        sensorService: AllSensorsGQL,
        authService: AuthService
    ) {
        super(authService, toastr, fb, createService, editService)

        this.sensorBaseTypes = [];
        this.sensorTypes = [];
        this.calGases = [];
        this.users = [];
        this.suggestedSensors = [];
        this.selectedSensor = null;

        this.sensorTypeService = sensorTypeService;
        this.sensorService = sensorService;


        this.setUpDependentData(sensorBaseTypeService, calGasesService, userService);

        this.myForm = this.fb.group({
            order: [this.object.order, []],
            serialNumber: [this.object.serialNumber, []],
            sensorId: [this.object.sensorId, [Validators.required]],
            zeroResponse: [this.object.zeroResponse, [Validators.pattern('^[0-9]+(\.[0-9]+)?$')]],
            zeroResponsePercentage: [this.object.zeroResponsePercentage, [Validators.pattern('^[0-9]+(\.[0-9]+)?$')]],
            zeroResponseMa: [this.object.zeroResponseMa, [Validators.pattern('^[0-9]+(\.[0-9]+)?$')]],
            fsCalGasId: [this.object.fsCalGasId, [Validators.required]],
            usedSpanConcentration: [this.object.usedSpanConcentration, [Validators.pattern('^[0-9]+(\.[0-9]+)?$')]],
            spanResponse: [this.object.spanResponse, [Validators.pattern('^[0-9]+(\.[0-9]+)?$')]],
            spanResponsePercentage: [this.object.spanResponsePercentage, [Validators.pattern('^[0-9]+(\.[0-9]+)?$')]],
            spanResponseMa: [this.object.spanResponseMa, [Validators.pattern('^[0-9]+(\.[0-9]+)?$')]],
            testDate: [this.object.testDate, [Validators.required]],
            userId: [this.object.userId, [Validators.required]],
        });
    }

    createDto(): SensorTestResultInput {

        return {
            factuuropdrachtOld: this.myForm.value.order,
            sensorId: this.myForm.value.sensorId,
            zeroResponse: +this.myForm.value.zeroResponse,
            sensorOrderId: +this?.selectedSensor?.sensorOrderId! || 0,
            fsCalGasId: +this.myForm.value.fsCalGasId,
            usedSpanConcentration: +this.myForm.value.usedSpanConcentration,
            spanResponse: +this.myForm.value.spanResponse,
            date: this.myForm.value.testDate,
            ownerId: this.authService?.currentUserInfo?.id || 0,
            userId: this.authService?.currentUserInfo?.id || 0,
        }
    }

    async setUpDependentData(sensorBaseTypeService: Query<any, any>, calGasesService: Query<any, any>, userService: Query<any, any>) {
        sensorBaseTypeService.fetch().subscribe(result => {
            this.sensorBaseTypes = result?.data?.allSensorBaseTypes?.nodes || [];
        });

        calGasesService.fetch().subscribe(result => {
            this.calGases = result?.data?.allCalgasEntities?.nodes || [];
        });

        userService.fetch().subscribe(result => {
            this.users = result?.data?.allUsers?.nodes || [];
        });
    }


    setSpanResponse(input: any, type: number) {


        let value = +input;

        console.log(type);

        console.log(this.myForm.value.sensorTypeId)

        let calGas = this.calGases.find(calGas => calGas.id === +this.myForm.value.fsCalGasId);

        console.log(calGas);

        let concentration = calGas?.concentration ?? 1;

        console.log(concentration);

        if (type === 1) {
            this.myForm.patchValue({ spanResponsePercentage: ((100 * value) / concentration).toString() });
            this.myForm.patchValue({ spanResponseMa: (((4 * value) / concentration) + 2).toString() });
        } else if (type === 2) {
            this.myForm.patchValue({ spanResponse: ((concentration * value) / 100).toString() });
            this.myForm.patchValue({ spanResponseMa: ((4 * value) / 100) + 2 });
        } else {
            this.myForm.patchValue({ spanResponse: (((value - 2) * concentration) / 4).toString() });
            this.myForm.patchValue({ spanResponsePercentage: (((value - 2) * 100) / 4).toString() });
        }
    }

    setSerialNumber(event: any) {
        this.sensorService.fetch({
            first: 5,
            filter: {
                and: [
                    { label: { includesInsensitive: event } }
                ]
            }
        }).subscribe(result => {
            console.log(result);
            this.suggestedSensors = result?.data?.sensors?.nodes || [];
        });
    }


    setZeroResponse(input: any, type: number) {

        let value = +input;

        console.log(type);

        console.log(this.myForm.value.sensorTypeId)

        let sensorType = this.sensorTypes.find(sensorType => sensorType.id === +this.myForm.value.sensorTypeId);

        let highValue = sensorType?.highEu ?? 1;

        if (type === 1) {
            this.myForm.patchValue({ zeroResponsePercentage: ((100 * value) / highValue).toString() });
            this.myForm.patchValue({ zeroResponseMa: (((4 * value) / highValue) + 2).toString() });
        } else if (type === 2) {
            this.myForm.patchValue({ zeroResponse: ((highValue * value) / 100).toString() });
            this.myForm.patchValue({ zeroResponseMa: ((4 * value) / 100) + 2 });
        } else {
            this.myForm.patchValue({ zeroResponse: (((value - 2) * highValue) / 4).toString() });
            this.myForm.patchValue({ zeroResponsePercentage: (((value - 2) * 100) / 4).toString() });
        }

    }

    setSensor(sensor: SensorIndex) {
        console.log(sensor);
        this.myForm.patchValue({ zeroResponse: null, zeroResponsePercentage: null, zeroResponseMa: null });

        this.myForm.patchValue({ sensorId: sensor.id });

        this.selectedSensor = sensor;

        
    }


    selectedCalGasType(id: string) {
        console.log(id);

        this.myForm.patchValue({ spanResponse: null, spanConcentration: null, spanResponsePercentage: null, spanResponseMa: null });

    }

    //on edit set to selected assembly
    setEditData(changes: SensorTestResultsEntity): void {

        this.myForm.reset();

        console.log(changes);
        this.object = {
            id: changes.id,
            factuurOpdrachtOld: changes.factuuropdrachtOld,
            sensorId: changes.sensorId,
            sensorOrderId: changes.sensorOrderId,
            zeroResponse: changes.zeroResponse,
            fsCalGasId: changes.fsCalGasId,
            usedSpanConcentration: changes.usedSpanConcentration,
            spanResponse: changes.spanResponse,
            userId: changes.userId,
            testDate: changes.date,
        };

        this.setZeroResponse(changes.zeroResponse, 1);

        this.setSpanResponse(changes.spanResponse, 1);

        this.sensorService.fetch({
            first: 5,
            filter: {
                and: [
                    { id: { equalTo: changes.sensorId } }
                ]
            }
        }).subscribe(result => {
            this.selectedSensor = result?.data?.sensors?.nodes[0];
        });

        this.myForm.patchValue(this.object);
    }
}