import { Component, OnInit, SimpleChanges, ViewChild } from "@angular/core";
import { AbstractComponent } from "../abstract/abstract.component";
import { IAbstractComponent } from "../../../models/interface/IAbstractComponent";
import { AbstractService } from "../../../services/abstract/abstract.service";
import { ToastrService } from "ngx-toastr";
import { TableField } from "../../../models/utils/tableField";
import AssemblyMultivers from "../../../models/entities/assemblyMultivers";
import { AssemblyMultiversLine } from "../../../models/entities/assemblyMultiversLine";
import { SearchCriteria } from "../../../models/utils/searchCriteria";

@Component({
  selector: "app-assembly-multivers",
  templateUrl: "./assembly-multivers.component.html",
})

export class AssemblyMultiversComponent extends AbstractComponent<AssemblyMultivers> implements OnInit, IAbstractComponent<AssemblyMultivers> {

  tableHeaders = ['date', 'batch', 'type', 'cdartikel', 'serial_number', 'qty', 'free', 'res', 'min', 'max', 'status'];
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
  
  constructor(protected override toastr: ToastrService, private assemblyService: AbstractService<AssemblyMultivers>) {
    super(toastr, assemblyService);
    this.toastr = toastr;
    this.abstractService = assemblyService;

    this.url = 'api/assembliesmultivers';
  }

  override async loadDetailData(id : number): Promise<void> {
    try {
      if(id === this.assemblyMultiversLine[0]?.assemblage_order) return;
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
        type: { url: null, value: assembly.omschr } as TableField,
        cdartikel: { url: null, value: assembly.cdartikel } as TableField,
        serial_number: { url: null, value: assembly.commentaar } as TableField,
        qty: { url: null, value: assembly.aantal } as TableField,
        free: { url: null, value: assembly.voorraad } as TableField,
        res: { url: null, value: assembly.gereserveerd } as TableField,
        min: { url: null, value: assembly.minvoorraad } as TableField,
        max: { url: null, value: assembly.maxvoorraad } as TableField,
        status: { url: null, value: assembly.status } as TableField,
      };
    });
  }

  override createUrlParams(): string {
    return `${this.url}?orderBy=${this.searchCriteria.orderBy.orderByColumn}&sort=${this.searchCriteria.orderBy.orderByDirection}&page=${this.data.page}&searchQuery=${encodeURIComponent(this.searchCriteria.searchValue!)}`;
  }
}
