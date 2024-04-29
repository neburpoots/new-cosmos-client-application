import { Component, Input, Output, EventEmitter } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CreateFactopdrachtArtikelExclusionGQL, StockSupplier, StockSupplierByIdGQL } from '../../../../../generated/graphql';
import { Subject } from 'rxjs';

@Component({
    selector: 'stock-suppliers-detail',
    templateUrl: 'stock-suppliers-detail.component.html',
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
export class StockSuppliersDetailComponent {

    @Input() item: StockSupplier | any;

    addArray: any[] = []

    id: number | null = null;

    protected refetchTrigger: Subject<void> = new Subject<void>();

    constructor(private route: ActivatedRoute, private toastr: ToastrService,
        private stockSupplier: StockSupplierByIdGQL,
        private router: Router,
        private createFactOpdrachtArtikelExclusion: CreateFactopdrachtArtikelExclusionGQL,
    ) { }

    isInArray(cdartikel: string, factuuropdracht: string): boolean {
        return this.addArray.find(x => x.cdartikel == cdartikel && x.factuuropdracht == factuuropdracht) ? true : false;
    }

    addItem(cdartikel: string, factuuropdracht: string) {
        if (this.isInArray(cdartikel, factuuropdracht)) {
            this.addArray = this.addArray.filter(x => !(x.cdartikel == cdartikel && x.factuuropdracht == factuuropdracht));
            console.log(this.addArray)
            return;
        }
        this.addArray.push({ cdartikel: cdartikel, factuuropdracht: factuuropdracht });
    }
    

    async loadDetails(): Promise<void> {
        try {

            this.stockSupplier.fetch({ id: this.id! }, {fetchPolicy: 'no-cache'}).subscribe(result => {
                this.item = result?.data?.stockSupplierById as StockSupplier || null;
                console.log(this.item)

            });


        } catch (error) {
            this.toastr.error(`Error fetching Stock suppliers details`, 'Error');
        }
    }

    roundNumber(num: number): number {
        return Math.round(num);
    }

    async addPartsToArtikelFactExclusion() {
        try {
            await this.addArray.forEach(async (item) => {
                await this.createFactOpdrachtArtikelExclusion.mutate({ body: { factuuropdracht: item.factuuropdracht, cdartikel: item.cdartikel } });
            });

            this.loadDetails();
            this.addArray = [];

            this.toastr.success('Successfully added parts to artikel fact exclusion', 'Success');
        } catch (error) {
            this.toastr.error('Error adding parts to artikel fact exclusion', 'Error');
        }

    }


    ngOnInit(): void {
        // Retrieve the dynamic parameter 'id' from the URL
        // Subscribe to paramMap to react to changes in the parameter
        this.route.paramMap.subscribe(params => {

            console.log(params.get('id'));

            let id = params.get('id')

            if (id) {
                this.id = +id;
            } else {
                this.router.navigate(['/stock-suppliers']);
            }

            // Use the retrieved ID to fetch the assembly details
            this.loadDetails();
        });
    }
}
