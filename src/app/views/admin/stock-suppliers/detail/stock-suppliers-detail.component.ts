import { Component, Input, Output, EventEmitter } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CreateFactopdrachtArtikelExclusionGQL, StockSupplier, StockSupplierByIdGQL } from '../../../../../generated/graphql';
import { Subject } from 'rxjs';
import { faFilePdf } from '@fortawesome/free-solid-svg-icons';
import { FileService } from '../../../../services/file/file.service';

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

    faFilePdf = faFilePdf;

    id: number | null = null;

    protected refetchTrigger: Subject<void> = new Subject<void>();

    constructor(private route: ActivatedRoute, private toastr: ToastrService,
        private stockSupplier: StockSupplierByIdGQL,
        private router: Router,
        private fileService: FileService,
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

    async retrieveFile() {
        this.fileService.downloadPdfWithBody("api/stock-suppliers/pdf", this.item.id, this.item).subscribe((data: Blob) => {
          // Create a Blob URL for the downloaded file
          const file = new Blob([data], { type: 'application/pdf' }); // Adjust the MIME type accordingly
          const fileUrl = URL.createObjectURL(file);
    
          // Create a download link and trigger a click event to download the file
          const link = document.createElement('a');
          link.href = fileUrl;
          link.download = `purchase_advice_${this.item.crediteur.zoeknaam}_${this.item.id}.pdf`; // Specify the desired file name
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        });
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
                await this.createFactOpdrachtArtikelExclusion.mutate({ body: { factuuropdracht: item.factuuropdracht, cdartikel: item.cdartikel } }).subscribe(
                    result => {
                        console.log(result);
                    }
                );
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
