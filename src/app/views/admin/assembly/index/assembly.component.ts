import { ChangeDetectorRef, Component, OnInit, SimpleChanges, ViewChild } from "@angular/core";
import { AssemblyService } from "../../../../services/assembly/assembly.service";
import { HttpClient, HttpResponse } from "@angular/common/http";
import { PaginatedResult } from "../../../../models/utils/pagination";
import { SearchCriteria } from "../../../../models/utils/searchCriteria";
import { ModalWidth } from "../../../../models/enums/modalWidth.enum";
import { Assembly } from "../../../../models/entities/assembly";
import { TableField } from "../../../../models/utils/tableField";
import { AbstractComponent } from "../../abstract/abstract.component";
import { AbstractService } from "../../../../services/abstract/abstract.service";
import { IAbstractComponent } from "../../../../models/interface/IAbstractComponent";
import { ToastrService } from "ngx-toastr";
import { AssemblyFormComponent } from "../form/assembly-form.component";
import { TableHeader } from "../../../../models/utils/tableHeader";
import { ActivatedRoute } from "@angular/router";
import { Apollo, gql } from "apollo-angular";
@Component({
  selector: "app-assembly",
  templateUrl: "./assembly.component.html",
})

export class AssemblyComponent extends AbstractComponent<Assembly> implements OnInit, IAbstractComponent<Assembly> {

  @ViewChild('assemblyEdit') childComponent!: AssemblyFormComponent;


  // tableHeaders = ['code', 'assemblyType', 'cdartikel', 'start_serial_number', 'quantity', 'voorraad', 'gereserveerd', 'minvoorraad', 'maxvoorraad', 'advice', 'checked', 'po', 'created'];

  tableHeaders: TableHeader[] = [
    { displayName: 'Code', sortValue: 'code', key: 'code' },
    { displayName: 'Assembly Type', sortValue: 'assemblyType.name', key: 'assemblyType' },
    { displayName: 'CDArtikel', sortValue: 'assemblyType.cdartikel.cdartikel', key: 'cdartikel' },
    { displayName: 'Start Serial Number', sortValue: 'start_serial_number', key: 'start_serial_number' },
    { displayName: 'Quantity', sortValue: 'quantity', key: 'quantity' },
    { displayName: 'Voorraad', sortValue: 'assemblyType.cdartikel.stock.voorraad', key: 'voorraad' },
    { displayName: 'Res', sortValue: 'assemblyType.cdartikel.stock.gereserveerd', key: 'gereserveerd' },
    { displayName: 'Min', sortValue: 'assemblyType.cdartikel.product.minvoorraad', key: 'minvoorraad' },
    { displayName: 'Max', sortValue: 'assemblyType.cdartikel.product.maxvoorraad', key: 'maxvoorraad' },
    { displayName: 'Advice', sortValue: 'assemblyType.cdartikel.advice', key: 'advice' },
    { displayName: 'Checked', sortValue: 'checked', key: 'checked' },
    { displayName: 'PO', sortValue: 'po', key: 'po' },
    { displayName: 'Created', sortValue: 'created', key: 'created' },
  ]


  objectSingle = 'Assembly';
  objectPlural = 'Assemblies';

  constructor(protected override toastr: ToastrService, private assemblyService: AbstractService<Assembly>, protected override route: ActivatedRoute, protected override http: HttpClient, private apollo: Apollo) {
    super(toastr, assemblyService, route, http);
    this.toastr = toastr;
    this.abstractService = assemblyService;

    this.url = 'api/assemblies';
  }

  override setEditData() {
    console.log(this.editData)
    this.childComponent.setEditData(this.editData);
  }

  get editData(): any {
    return {
      id: this.selectedItem?.id,
      code: this.selectedItem?.code,
      start_serial_number: this.selectedItem?.start_serial_number,
      selectedOption: this.selectedItem?.assemblyType.id,
      quantity: this.selectedItem?.quantity,
    };
  }

  mapTableData(assemblies: Assembly[]): any[] {
    console.log(assemblies)
    return assemblies.map((assembly) => {
      return {
        id: { url: 'api/assemblies', value: assembly.id } as TableField,
        code: { url: null, value: assembly.code } as TableField,
        assemblyType: { url: null, value: assembly.assemblyType.name } as TableField,
        cdartikel: { url: null, value: assembly?.assemblyType?.cdartikel?.cdartikel } as TableField,
        start_serial_number: { url: null, value: assembly.start_serial_number } as TableField,
        checked: { url: null, value: assembly.checked } as TableField,
        quantity: { url: null, value: assembly.quantity } as TableField,
        voorraad: { url: null, value: assembly?.assemblyType?.cdartikel?.stock?.voorraad } as TableField,
        gereserveerd: { url: null, value: assembly?.assemblyType?.cdartikel?.stock?.gereserveerd } as TableField,
        maxvoorraad: { url: null, value: assembly?.assemblyType?.cdartikel?.product?.maxvoorraad } as TableField,
        minvoorraad: { url: null, value: assembly?.assemblyType?.cdartikel?.product?.minvoorraad } as TableField,
        advice: { url: null, value: assembly?.assemblyType.cdartikel?.advice } as TableField,
        po: { url: null, value: assembly.po } as TableField,
        created: { url: null, value: assembly.created } as TableField,
      };
    });
  }

  override createUrlParams(): string {
    this.apollo
      .watchQuery({
        query: gql`
        query allAssemblies {
          allAssemblies {
            nodes {
              id,
              code,
              completed
              
            }
          }
        }
        
        `,
      })
      .valueChanges.subscribe((result: any) => {
        console.log(result);
      });

    return `${this.url}?orderBy=${this.searchCriteria.orderBy.orderByColumn}&sort=${this.searchCriteria.orderBy.orderByDirection}&page=${this.data.page}&limit=${this.data.limit}&searchQuery=${encodeURIComponent(this.searchCriteria.searchValue!)}`;
  }
}
