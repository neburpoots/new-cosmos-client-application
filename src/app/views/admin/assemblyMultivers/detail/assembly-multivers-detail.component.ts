import { Component, Input, Output, EventEmitter } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';
import { AssemblyMultiversLine } from '../../../../models/entities/assemblyMultiversLine';
import { ActivatedRoute } from '@angular/router';
import { AbstractService } from '../../../../services/abstract/abstract.service';
import { AssembliesMultivers } from '../../../../services/assembiesMultivers/assembliesMultivers.service';
import { ToastrService } from 'ngx-toastr';
import AssemblyMultivers from '../../../../models/entities/assemblyMultivers';
import dayjs from 'dayjs';

@Component({
    selector: 'assembly-multivers-detail',
    templateUrl: 'assembly-multivers-detail.component.html',
    animations: [
        trigger('fadeIn', [
            transition(':enter', [
                style({ opacity: 0 }),
                animate('300ms ease-out', style({ opacity: 1 })),
            ]),
        ]),
    ],
    //   styleUrls: ['./modal.component.css']
})
export class AssemblyMultiversDetailComponent {

    @Input() item: AssemblyMultivers | null = null;

    id: string | null = null;

    constructor(private route: ActivatedRoute, private toastr: ToastrService, private abstractService: AbstractService<AssemblyMultivers>) { }


    async loadDetails(): Promise<void> {
        try {
            const response = await this.abstractService.detail(`api/assembliesmultivers`, this.id!).toPromise();
            console.log(response);
            this.item = response!;
        } catch (error) {
            this.toastr.error(`Error fetching Assembly multivers details`, 'Error');
        }
    }

    get formattedDate(): string {
        return dayjs(this.item?.order_datum).format('dddd, MMMM D, YYYY');
    }

    ngOnInit(): void {
        // Retrieve the dynamic parameter 'id' from the URL
        // Subscribe to paramMap to react to changes in the parameter
        this.route.paramMap.subscribe(params => {

            console.log(params.get('id'));

            this.id = params.get('id');
            console.log(this.id);
            // Use the retrieved ID to fetch the assembly details
            this.loadDetails();
        });
    }
}
