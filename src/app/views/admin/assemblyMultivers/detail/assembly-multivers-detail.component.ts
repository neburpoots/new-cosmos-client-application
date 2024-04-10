import { Component, Input, Output, EventEmitter } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import dayjs from 'dayjs';
import { AssemblyMultivers } from '../../../../models/entities/assemblyMultivers';
import { AllAssemblyLinesMultiversEntitiesGQL, AllAssemblyMultiversEntitiesGQL, AssemblyLineEntity, AssemblyMultiversByIdGQL, AssemblyMultiversEntity } from '../../../../../generated/graphql';
import { Subject, map, startWith, switchMap } from 'rxjs';

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

    @Input() item: AssemblyMultiversEntity | null = null;

    @Input() assemblyLines: AssemblyLineEntity[] = [];

    id: string | null = null;

    protected refetchTrigger: Subject<void> = new Subject<void>();

    constructor(private route: ActivatedRoute, private toastr: ToastrService, 
        private assemblyLinesMVService: AllAssemblyLinesMultiversEntitiesGQL,
        private assemblyMultiversByIdService: AssemblyMultiversByIdGQL
    ) { }


    async loadDetails(): Promise<void> {
        try {
            this.assemblyLinesMVService.fetch({assemblage_order: this.id, search: ''}).subscribe(result => {
                console.log(result?.data?.allAssemblyLineEntities?.nodes)
                this.assemblyLines = result?.data?.allAssemblyLineEntities?.nodes || [];
            })

            this.assemblyMultiversByIdService.fetch({id: this.id}).subscribe(result => {
                this.item = result?.data?.assemblyMultiversById?.nodes[0] || null;
            })
        } catch (error) {
            this.toastr.error(`Error fetching Assembly multivers details`, 'Error');
        }
    }

    get formattedDate(): string {
        return dayjs(this.item?.orderDatum).format('dddd, MMMM D, YYYY');
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
