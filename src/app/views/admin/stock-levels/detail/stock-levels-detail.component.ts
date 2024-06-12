import { Component, Input, Output, EventEmitter } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ArtikelIndex2, CreateFactopdrachtArtikelExclusionGQL, StockLevelDetailGQL, StockSupplier, StockSupplierByIdGQL } from '../../../../../generated/graphql';
import { Subject } from 'rxjs';
import { faFilePdf } from '@fortawesome/free-solid-svg-icons';
import { FileService } from '../../../../services/file/file.service';

@Component({
    selector: 'stock-levels-detail',
    templateUrl: 'stock-levels-detail.component.html',
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
export class StockLevelsDetailComponent {

    @Input() item: ArtikelIndex2 | null | undefined;

    addArray: any[] = []

    faFilePdf = faFilePdf;

    cdartikel: string | null = null;

    protected refetchTrigger: Subject<void> = new Subject<void>();

    constructor(private route: ActivatedRoute, private toastr: ToastrService,
        private router: Router,
        private fileService: FileService,
        private stockLevelDetailGQL: StockLevelDetailGQL,
    ) { }


    async loadDetails(): Promise<void> {
        try {

            this.stockLevelDetailGQL.fetch({
                first: 1,
                offset: 0,
                filter: {
                    and: [
                        {
                            or: [
                                {
                                    cdartikel: { includesInsensitive: this.cdartikel},
                                }
                            ]
                        }
                    ]
                }
            }, {fetchPolicy: 'no-cache'}).subscribe(result => {
                this.item = result?.data?.stockLevelDetail?.nodes[0] as ArtikelIndex2 || null;
                console.log(this.item)

            });


        } catch (error) {
            this.toastr.error(`Error fetching Stock suppliers details`, 'Error');
        }
    }

    roundNumber(num: number): number {
        return Math.round(num);
    }

    ngOnInit(): void {
        // Retrieve the dynamic parameter 'id' from the URL
        // Subscribe to paramMap to react to changes in the parameter
        this.route.paramMap.subscribe(params => {

            console.log(params.get('id'));

            let id = params.get('id')

            if (id) {
                this.cdartikel = id;
            } else {
                this.router.navigate(['/stock-levels']);
            }

            // Use the retrieved ID to fetch the assembly details
            this.loadDetails();
        });
    }
}
