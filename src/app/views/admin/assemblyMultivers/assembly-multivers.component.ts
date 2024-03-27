import { Component, OnInit, SimpleChanges, ViewChild } from "@angular/core";
import { AbstractComponent } from "../abstract/abstract.component";
import { IAbstractComponent } from "../../../models/interface/IAbstractComponent";
import { AbstractService } from "../../../services/abstract/abstract.service";
import { ToastrService } from "ngx-toastr";
import { TableField } from "../../../models/utils/tableField";
import { AssemblyMultiversLine } from "../../../models/entities/assemblyMultiversLine";
import { SearchCriteria } from "../../../models/utils/searchCriteria";
import { TableHeader } from "../../../models/utils/tableHeader";
import { ActivatedRoute } from "@angular/router";
import { AssemblyMultivers } from "../../../models/entities/assemblyMultivers";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "app-assembly-multivers",
  templateUrl: "./assembly-multivers.component.html",
})

export class AssemblyMultiversComponent extends AbstractComponent<AssemblyMultivers> implements OnInit, IAbstractComponent<AssemblyMultivers> {
  
  tableHeaders : TableHeader[] = [
    { displayName: 'Date', sortValue: 'order_datum', key: 'date'  },
    { displayName: 'Batch', sortValue: 'assemblage_order', key: 'batch'},
    { displayName: 'Type', sortValue: 'cdartikel.product.omschr', key: 'type'},
    { displayName: 'CDArtikel', sortValue: 'cdartikel.cdartikel', key: 'cdartikel'},
    { displayName: 'Serial Number', sortValue: 'commentaar', key: 'serial_number'},
    { displayName: 'Qty', sortValue: 'aantal', key: 'qty'},
    { displayName: 'Free', sortValue: 'cdartikel.stock.voorraad', key: 'free'},
    { displayName: 'Res', sortValue: 'cdartikel.stock.gereserveerd', key: 'res'},
    { displayName: 'Min', sortValue: 'cdartikel.stock.minvoorraad', key: 'min'},
    { displayName: 'Max', sortValue: 'cdartikel.stock.maxvoorraad', key: 'max'},
    { displayName: 'Status', sortValue: 'status', key: 'status'},
  ];

  objectSingle = 'Assembly Multivers';
  objectPlural = 'Assemblies Multivers';
  
  //override because it does id as standard
  override searchCriteria: SearchCriteria = {
    searchValue: "",
    orderBy: {
      orderByColumn: 'assemblage_order',
      orderByDirection: 'desc',
    }
  
  };

  assemblyMultiversLine : AssemblyMultiversLine[] = [];
  
  constructor(protected override toastr: ToastrService, private assemblyService: AbstractService<AssemblyMultivers>, protected override route: ActivatedRoute, protected override http: HttpClient) {
    super(toastr, assemblyService, route, http);
    this.toastr = toastr;
    this.abstractService = assemblyService;

    this.url = 'api/assembliesmultivers';
  }

  override async loadDetailData(id : string): Promise<void> {
    try {
      if(id === this.assemblyMultiversLine[0]?.assemblageOrder) return;
      console.log(id);
      this.assemblyMultiversLine = await this.abstractService.getDependentData(`api/assembliesmultivers/multiverslines/${id}`).toPromise();
      console.log(this.assemblyMultiversLine);
    } catch (error) {
      this.toastr.error(`Error fetching ${this.objectPluralLowerCase}`, 'Error');
    }
  }

  downloadPdf(id: number): void {
    this.abstractService.getFile(`api/assembliesmultivers/pdf`, id).subscribe((data: Blob) => {
      // Create a Blob URL for the downloaded file
      const file = new Blob([data], { type: 'application/pdf' }); // Adjust the MIME type accordingly
      const fileUrl = URL.createObjectURL(file);

      // Create a download link and trigger a click event to download the file
      const link = document.createElement('a');
      link.href = fileUrl;
      link.download = `assembliesmultivers_${id}.pdf`; // Specify the desired file name
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  }



  mapTableData(assemblies: AssemblyMultivers[]): any[] {
    console.log(assemblies)
    return assemblies.map((assembly : AssemblyMultivers) => {
      return {
        id: { url: 'api/assemblies', value: assembly.assemblage_order} as TableField,
        date: { url: null, value: assembly.order_datum } as TableField,
        batch: { url: null, value: assembly.assemblage_order } as TableField,
        type: { url: null, value: assembly.cdartikel?.product?.omschr } as TableField,
        cdartikel: { url: null, value: assembly.cdartikel?.cdartikel } as TableField,
        serial_number: { url: null, value: assembly.commentaar } as TableField,
        qty: { url: null, value: assembly.aantal } as TableField,
        free: { url: null, value: assembly.cdartikel?.stock?.voorraad } as TableField,
        res: { url: null, value: assembly.cdartikel?.stock?.gereserveerd } as TableField,
        min: { url: null, value: assembly.cdartikel?.stock?.minvoorraad } as TableField,
        max: { url: null, value: assembly.cdartikel?.stock?.maxvoorraad } as TableField,
        status: { url: null, value: assembly.status } as TableField,
      };
    });
  }

  override createUrlParams(): string {
    return `${this.url}?orderBy=${this.searchCriteria.orderBy.orderByColumn}&sort=${this.searchCriteria.orderBy.orderByDirection}&page=${this.data.page}&limit=${this.data.limit}&searchQuery=${encodeURIComponent(this.searchCriteria.searchValue!)}`;
  }
}
