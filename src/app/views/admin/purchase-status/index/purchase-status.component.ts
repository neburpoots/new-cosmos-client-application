import { Component, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AllPurchaseStatusesGQL, CreateFactopdrachtArtikelExclusionGQL, CreateInkooporderregelLineGQL, InkooporderIndex, InkooporderIndicesOrderBy, InkooporderregelLine, InkooporderregelsIndex, InkooporderregelsIndicesOrderBy, QueryAllInkooporderIndicesArgs, StockSupplier, StockSupplierByIdGQL, UpdateInkooporderregelLineGQL } from '../../../../../generated/graphql';
import { Subject, from } from 'rxjs';
import { faFilePdf, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { FileService } from '../../../../services/file/file.service';
import { SatPopover } from '@ncstate/sat-popover';
import dayjs from 'dayjs';
import weekOfYear from 'dayjs/plugin/weekOfYear';

dayjs.extend(weekOfYear);

@Component({
    selector: 'purchase-status-component',
    templateUrl: 'purchase-status.component.html',
    animations: [
        trigger("fadeInOut", [
            state("void", style({
                opacity: 0,
                transform: "translateX(-20px)",
            })),
            transition("void <=> *", animate(300)),
        ]),
    ],
    //   styleUrls: ['./modal.component.css']
})
export class PurchaseStatusComponent {

    @ViewChild('shippingDate') shippingDate!: SatPopover; // Accessing the SatPopover instance

    id: number | null = null;


    faPenToSquare = faPenToSquare

    selectedShippingDate: Date | null | string = null;

    selectedDeliveryDate: Date | null | string = null;

    selectedRemark: string | null = null;

    isConfirmedDeliveryDate: boolean = false;


    data: InkooporderIndex[] = [];

    selectedDate = dayjs();

    isAll: boolean = false;

    weekFilters: any[];


    setWeekFilters(fromCurrent: number): void {

        this.isAll = false;

        if (fromCurrent < 0) {
            this.selectedDate = this.selectedDate.subtract(Math.abs(fromCurrent), 'week');
        } else {
            this.selectedDate = this.selectedDate.add(fromCurrent, 'week');
        }

        console.log(this.selectedDate.week());

        this.retrieveOptions = {
            filter: {
                and: [
                    {
                        orderdatum: {
                            greaterThanOrEqualTo: this.selectedDate.startOf('week').format('YYYY-MM-DD'),
                            lessThanOrEqualTo: this.selectedDate.endOf('week').format('YYYY-MM-DD')
                        }
                    }
                ]
            },
            first: null,
            offset: 0,
            orderBy: [InkooporderIndicesOrderBy.OrderdatumDesc]
        };

        this.loadDetails();


        this.weekFilters = [
            {
                value: this.selectedDate.subtract(1, 'week').week(),
                fromCurrent: -1
            },
            {
                fromCurrent: 0,
                value: this.selectedDate.week()
            },
            {
                value: this.selectedDate.add(1, 'week').week(),
                fromCurrent: 1
            },
            {
                value: this.selectedDate.add(2, 'week').week(),
                fromCurrent: 2
            },
            {
                value: this.selectedDate.add(3, 'week').week(),
                fromCurrent: 3
            }
        ]
    }




    retrieveOptions: any = {
        filter: {
            and: [

            ]
        },
        first: 10,
        offset: 0,
        orderBy: [InkooporderIndicesOrderBy.OrderdatumDesc]
    };




    constructor(private route: ActivatedRoute, private toastr: ToastrService,
        private purchaseStatusService: AllPurchaseStatusesGQL,
        private updateOrderRegelLineService: UpdateInkooporderregelLineGQL,
        private createOrderRegelLineService: CreateInkooporderregelLineGQL,
        private router: Router,
        private fileService: FileService,
    ) {

        this.weekFilters = [];
        this.setWeekFilters(0);

    }

    getThisYear() {
        let year = dayjs().year();

        this.isAll = true;

        this.retrieveOptions = {
            filter: {
                and: [
                    {
                        orderdatum: { greaterThanOrEqualTo: `${year}-01-01` }
                    }
                ]
            },
            first: null,
            offset: 0,
            orderBy: [InkooporderIndicesOrderBy.OrderdatumDesc]
        };

        this.loadDetails();
    }

    async loadDetails(): Promise<void> {
        try {

            this.purchaseStatusService.fetch(this.retrieveOptions, { fetchPolicy: 'no-cache' }).subscribe(result => {
                this.data = result?.data?.allInkooporderIndices?.nodes as InkooporderIndex[] || [];
            });

        } catch (error) {
            this.toastr.error(`Error fetching Stock suppliers details`, 'Error');
        }
    }

    createOrderLineRegel(body: any) {
        this.createOrderRegelLineService.mutate({ body }).subscribe(result => {
            this.toastr.success(`Orderregel created successfully`, 'Success');

            this.loadDetails();
        });
    }

    updateOrderLineStatus(line: InkooporderregelsIndex, status: string): void {

        let patch = {
            status: line.status == status ? null : status,
            inkopdrRglGuid: line.inkopdrRglGuid
        }

        this.createOrUpdateOrderline(line, patch);
    }

    updateShippingDate(line: InkooporderregelsIndex): void {
        console.log(this.selectedShippingDate);
        let patch = {
            shipmentDate: this.selectedShippingDate == '' ? null : this.selectedShippingDate,
            inkopdrRglGuid: line.inkopdrRglGuid
        }

        if (line.shipmentDate == this.selectedShippingDate) return;


        this.createOrUpdateOrderline(line, patch);
    }

    updateDeliveryDate(line: InkooporderregelsIndex): void {

        console.log(this.selectedDeliveryDate);
        let patch = {
            deliveryDate: this.selectedDeliveryDate == '' ? null : this.selectedDeliveryDate,
            inkopdrRglGuid: line.inkopdrRglGuid
        }

        if (line.deliveryDate == this.selectedDeliveryDate) return;

        this.createOrUpdateOrderline(line, patch);
    }

    updateRemarkValue(line: InkooporderregelsIndex): void {
        console.log(this.selectedRemark);
        let patch = {
            remarks: this.selectedRemark == '' ? null : this.selectedRemark,
        }

        if (line.remarks == this.selectedRemark) return;

        this.createOrUpdateOrderline(line, patch);
    }

    updateDeliveryDateConfirmed(line: InkooporderregelsIndex): void {
        let patch = {
            deliveryDateConfirmed: this.isConfirmedDeliveryDate,
            inkopdrRglGuid: line.inkopdrRglGuid
        }



        this.createOrUpdateOrderline(line, patch);
    }

    setShippingDateValue(line: InkooporderregelsIndex) {

        this.selectedShippingDate = line.shipmentDate || null;
    }

    setDeliveryDateValue(line: InkooporderregelsIndex) {
        this.isConfirmedDeliveryDate = line.deliveryDateConfirmed || false;
        this.selectedDeliveryDate = line.deliveryDate || null;
    }

    setRemarkValue(line: InkooporderregelsIndex) {
        this.selectedRemark = line.remarks || null;
    }

    createOrUpdateOrderline(line: InkooporderregelsIndex, patch: any) {
        if (!line.inkooporderregelLines) {
            this.createOrderLineRegel(patch);
            return;
        }

        this.updateOrderRegelLine(line?.inkooporderregelLines.id!, patch)
    }

    async updateOrderRegelLine(id: number, patch: any): Promise<void> {
        try {
            this.updateOrderRegelLineService.mutate({ id, patch }).subscribe(result => {
                this.toastr.success(`Orderregel updated successfully`, 'Success');

                this.loadDetails();
            });

        } catch (error) {
            this.toastr.error(`Error updating Orderregel ${id}`, 'Error');
        }
    }

    roundNumber(num: number): number {
        return Math.round(num);
    }

    calculateTotal(orderregels: InkooporderregelsIndex[]): string {
        let totaal = 0;

        orderregels.forEach(o => {
            totaal += +o.prijs || 0;
        });

        return totaal.toFixed(2);
    }

    ngOnInit(): void {
        // Retrieve the dynamic parameter 'id' from the URL
        // Subscribe to paramMap to react to changes in the parameter
        // this.route.paramMap.subscribe(params => {

        //     console.log(params.get('id'));

        //     let id = params.get('id')

        //     if (id) {
        //         this.id = +id;
        //     } else {
        //         this.router.navigate(['/stock-suppliers']);
        //     }

        //     // Use the retrieved ID to fetch the assembly details
        //     this.loadDetails();
        // });
    }
}
