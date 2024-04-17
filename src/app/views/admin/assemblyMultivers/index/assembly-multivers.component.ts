import { Component, OnInit, ViewChild } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { TableField } from "../../../../models/utils/tableField";

import { ToastrService } from "ngx-toastr";
import { ActivatedRoute, Router } from "@angular/router";
import { AllAssemblyLinesMultiversEntitiesGQL, AllAssemblyMultiversEntitiesGQL, AllFilterEntitiesGQL, AllORingEntitiesGQL, AllPyrolyserEntitiesGQL, AssemblyLineEntity, AssemblyMultiversEntitiesOrderBy, AssemblyMultiversEntity, DeleteFilterGQL, DeletePyrolyserGQL, FilterEntitiesOrderBy, FilterEntity, ORingEntitiesOrderBy, ORingEntity, PyrolyserEntitiesOrderBy, PyrolyserEntity, QueryAllAssemblyMultiversEntitiesArgs } from "../../../../../generated/graphql";
import { SearchFilters } from "../../../../models/utils/searchFilters";
import { BaseEntity } from "../../base/base-entity.component";
import { Observable } from "rxjs";
import { TableHead } from "../../../../models/utils/tableHead";
import { FileService } from "../../../../services/file/file.service";

@Component({
  selector: "app-assembly-multivers",
  templateUrl: "./assembly-multivers.component.html",
})

export class AssemblyMultiversComponent extends BaseEntity<AssemblyMultiversEntity> implements OnInit {


  objectSingle = 'Assembly Multivers';
  objectPlural = 'Assemblies Multivers';

  searchCriteria: QueryAllAssemblyMultiversEntitiesArgs = {
    orderBy: [AssemblyMultiversEntitiesOrderBy.AssemblageOrderDesc],
    first: 10,
    offset: 0,
    filter: {
      and: [

      ]
    },
  }

  ngOnInit(): void {
    console.log(this.nodes$);
    this.nodes$.subscribe(result => console.log(result));
  }

  assemblyMultiversLines: AssemblyLineEntity[] = [];


  //IMPORTANT THIS IS THE NAME OF THE OBJECT IN DATA: {allGases: {nodes: []}}
  //json return object for getter
  //This is the object name of the nodes: return
  //check the get all method and see what it returns and set to this object
  Key = 'allAssemblyMultiversEntities';


  //This is the fallback order by on changes in the table
  baseOrderBy = AssemblyMultiversEntitiesOrderBy.AssemblageOrderDesc;

  override nodes$: Observable<Array<AssemblyMultiversEntity>>;

  constructor(protected override toastr: ToastrService, protected override route: ActivatedRoute, protected override http: HttpClient,
    private assemblyMVService: AllAssemblyMultiversEntitiesGQL,
    private assemblyLineService: AllAssemblyLinesMultiversEntitiesGQL,
    protected override router: Router,
protected override fileService : FileService
  ) {
    super(fileService, router, toastr, route, http, assemblyMVService, null);

    this.checkQueryParams();

    this.nodes$ = this.loadData(this.searchCriteria);
  }

  override async loadDetailData(id: string): Promise<void> {
    try {
      console.log(id);
      if (id === this.assemblyMultiversLines[0]?.assemblageOrder) return;
      console.log(id);
      this.assemblyLineService.fetch({ assemblage_order: id, search: '' }).subscribe(result => {
        console.log(result?.data?.allAssemblyLineEntities?.nodes)
        this.assemblyMultiversLines = result?.data?.allAssemblyLineEntities?.nodes || [];
      })
    } catch (error) {
      this.toastr.error(`Error fetching ${this.objectPluralLowerCase}`, 'Error');
    }
  }


  tableHeaders: TableHead<AssemblyMultiversEntitiesOrderBy>[] = [
    { type: 'datetime', key: 'orderDatum', label: "Date", asc: AssemblyMultiversEntitiesOrderBy.OrderDatumAsc, desc: AssemblyMultiversEntitiesOrderBy.OrderDatumDesc },
    { type: 'string', key: 'assemblageOrder', label: "Batch", asc: AssemblyMultiversEntitiesOrderBy.AssemblageOrderAsc, desc: AssemblyMultiversEntitiesOrderBy.AssemblageOrderDesc },
    { type: 'string', key: 'omschr', label: "Type", asc: AssemblyMultiversEntitiesOrderBy.OmschrAsc, desc: AssemblyMultiversEntitiesOrderBy.OmschrDesc },
    { type: 'string', key: 'cdartikel', label: "MV Code", asc: AssemblyMultiversEntitiesOrderBy.CdartikelAsc, desc: AssemblyMultiversEntitiesOrderBy.CdartikelDesc },
    { type: 'string', key: 'commentaar', label: "S/N", asc: AssemblyMultiversEntitiesOrderBy.CommentaarAsc, desc: AssemblyMultiversEntitiesOrderBy.CommentaarDesc },
    { type: 'number', key: 'aantal', label: "Qty", asc: AssemblyMultiversEntitiesOrderBy.AantalAsc, desc: AssemblyMultiversEntitiesOrderBy.AantalDesc },
    { type: 'number', key: 'voorraad', label: "Free", asc: AssemblyMultiversEntitiesOrderBy.VoorraadAsc, desc: AssemblyMultiversEntitiesOrderBy.VoorraadDesc },
    { type: 'number', key: 'minvoorraad', label: "Min", asc: AssemblyMultiversEntitiesOrderBy.MinvoorraadAsc, desc: AssemblyMultiversEntitiesOrderBy.MinvoorraadDesc },
    { type: 'number', key: 'maxvoorraad', label: "Max", asc: AssemblyMultiversEntitiesOrderBy.MaxvoorraadAsc, desc: AssemblyMultiversEntitiesOrderBy.MaxvoorraadDesc },
    { type: 'string', key: 'status', label: "Status", asc: AssemblyMultiversEntitiesOrderBy.StatusAsc, desc: AssemblyMultiversEntitiesOrderBy.StatusDesc }
  ]


  mapTableData(assemblyMVEntities: AssemblyMultiversEntity[]): any[] {
    return assemblyMVEntities.map((assemblyMV: AssemblyMultiversEntity) => {
      return {
        id: { url: null, value: assemblyMV.id } as TableField,
        cdartikel: { url: null, value: assemblyMV?.cdartikel } as TableField,
        orderDatum: { url: null, value: assemblyMV?.orderDatum } as TableField,
        assemblageOrder: { url: null, value: assemblyMV?.assemblageOrder } as TableField,
        commentaar: { url: null, value: assemblyMV?.commentaar } as TableField,
        omschr: { url: null, value: assemblyMV?.omschr } as TableField,
        aantal: { url: null, value: assemblyMV?.aantal } as TableField,
        voorraad: { url: null, value: assemblyMV?.voorraad } as TableField,
        minvoorraad: { url: null, value: assemblyMV?.minvoorraad } as TableField,
        maxvoorraad: { url: null, value: assemblyMV?.maxvoorraad } as TableField,
        status: { url: null, value: assemblyMV?.status } as TableField,
      };
    });
  }


}
