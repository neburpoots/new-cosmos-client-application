import { Component, OnInit, ViewChild } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { TableField } from "../../../../models/utils/tableField";

import { ToastrService } from "ngx-toastr";
import { ActivatedRoute } from "@angular/router";
import { AllAssemblyMultiversEntitiesGQL, AllFilterEntitiesGQL, AllORingEntitiesGQL, AllPyrolyserEntitiesGQL,  AssemblyMultiversEntitiesOrderBy,  AssemblyMultiversEntity,  DeleteFilterGQL,  DeletePyrolyserGQL, FilterEntitiesOrderBy, FilterEntity, ORingEntitiesOrderBy, ORingEntity, PyrolyserEntitiesOrderBy, PyrolyserEntity } from "../../../../../generated/graphql";
import { SearchFilters } from "../../../../models/utils/searchFilters";
import { BaseEntity } from "../../base/base-entity.component";
import { Observable } from "rxjs";
import { TableHead } from "../../../../models/utils/tableHead";

@Component({
  selector: "app-assembly-multivers",
  templateUrl: "./assembly-multivers.component.html",
})

export class AssemblyMultiversComponent extends BaseEntity<AssemblyMultiversEntity> implements OnInit {


  objectSingle = 'Assembly Multivers';
  objectPlural = 'Assemblies Multivers';

  searchCriteria: SearchFilters = {
    orderBy: [AssemblyMultiversEntitiesOrderBy.AssemblageDatumDesc],
    search: "",
    limit: 10,
    offset: 0,
    totalPages: 0,
    total: 0,
    page: 1,
  }

  ngOnInit(): void {
    console.log(this.nodes$);
    this.nodes$.subscribe(result => console.log(result));
  }

  //IMPORTANT THIS IS THE NAME OF THE OBJECT IN DATA: {allGases: {nodes: []}}
  //json return object for getter
  //This is the object name of the nodes: return
  //check the get all method and see what it returns and set to this object
  Key = 'allAssemblyMultiversEntities';


  //This is the fallback order by on changes in the table
  baseOrderBy = AssemblyMultiversEntitiesOrderBy.AssemblageOrderDesc;

  override nodes$: Observable<Array<AssemblyMultiversEntity>>;

  constructor(protected override toastr: ToastrService, protected override route: ActivatedRoute, protected override http: HttpClient,
    private assemblyMVService: AllAssemblyMultiversEntitiesGQL
  ) {
    super(toastr, route, http, assemblyMVService, null);

    this.nodes$ = this.loadData(this.searchCriteria);
  }

  tableHeaders: TableHead<AssemblyMultiversEntitiesOrderBy>[] = [
    { key: 'date', label: "Date", asc: AssemblyMultiversEntitiesOrderBy.OrderDatumAsc, desc: AssemblyMultiversEntitiesOrderBy.OrderDatumDesc },
    { key: 'batch', label: "Batch", asc: AssemblyMultiversEntitiesOrderBy.AssemblageOrderAsc, desc: AssemblyMultiversEntitiesOrderBy.AssemblageOrderDesc },
    { key: 'omschr', label: "Type", asc: AssemblyMultiversEntitiesOrderBy.OmschrAsc, desc: AssemblyMultiversEntitiesOrderBy.OmschrDesc },
    { key: 'cdartikel', label: "MV Code", asc: AssemblyMultiversEntitiesOrderBy.CdartikelAsc, desc: AssemblyMultiversEntitiesOrderBy.CdartikelDesc },
    { key: 'commentaar', label: "S/N", asc: AssemblyMultiversEntitiesOrderBy.CommentaarAsc, desc: AssemblyMultiversEntitiesOrderBy.CommentaarDesc},
    { key: 'quantity', label: "Qty", asc: AssemblyMultiversEntitiesOrderBy.AantalAsc, desc: AssemblyMultiversEntitiesOrderBy.AantalDesc },
    { key: 'voorraad', label: "Free", asc: AssemblyMultiversEntitiesOrderBy.VoorraadAsc, desc: AssemblyMultiversEntitiesOrderBy.VoorraadDesc },
    { key: 'minvoorraad', label: "Min", asc: AssemblyMultiversEntitiesOrderBy.MinvoorraadAsc, desc: AssemblyMultiversEntitiesOrderBy.MinvoorraadDesc },
    { key: 'maxvoorraad', label: "Max", asc: AssemblyMultiversEntitiesOrderBy.MaxvoorraadAsc, desc: AssemblyMultiversEntitiesOrderBy.MaxvoorraadDesc },
    { key: 'status', label: "Status", asc: AssemblyMultiversEntitiesOrderBy.StatusAsc, desc: AssemblyMultiversEntitiesOrderBy.StatusDesc}
  ]


  mapTableData(assemblyMVEntities: AssemblyMultiversEntity[]): any[] {
    return assemblyMVEntities.map((assemblyMV: AssemblyMultiversEntity) => {
      return {
        id: { url: null, value: assemblyMV.assemblageOrder } as TableField,
        cdartikel: { url: null, value: assemblyMV?.cdartikel } as TableField,
        date: { url: null, value: assemblyMV?.orderDatum } as TableField,
        batch: { url: null, value: assemblyMV?.assemblageOrder } as TableField,
        commentaar: { url: null, value: assemblyMV?.commentaar } as TableField,
        omschr: { url: null, value: assemblyMV?.omschr } as TableField,
        quantity: { url: null, value: assemblyMV?.aantal } as TableField,
        voorraad: { url: null, value: assemblyMV?.voorraad } as TableField,
        minvoorraad: { url: null, value: assemblyMV?.minvoorraad } as TableField,
        maxvoorraad: { url: null, value: assemblyMV?.maxvoorraad } as TableField,
        status: { url: null, value: assemblyMV?.status } as TableField,
      };
    });
  }


}
