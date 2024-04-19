import { Component, OnInit, SimpleChanges, ViewChild } from "@angular/core";
import { HttpClient, HttpResponse } from "@angular/common/http";

import { ToastrService } from "ngx-toastr";
import { TableField } from "../../../models/utils/tableField";
import { ActivatedRoute, Router } from "@angular/router";
import { Observable, Subject, map, of, startWith, switchMap } from "rxjs";
import { AssemblyTypeEntitiesGQL, AssemblyTypeEntitiesQuery, AssemblyTypesEntitiesOrderBy, AssemblyTypesEntity, AssemblyTypesOrderBy, QueryAllAssemblyTypesArgs, QueryAllAssemblyTypesEntitiesArgs } from "../../../../generated/graphql";
import { BaseEntity } from "../base/base-entity.component";
import { SearchFilters } from "../../../models/utils/searchFilters";

import { TableHead } from "../../../models/utils/tableHead";
import { FileService } from "../../../services/file/file.service";
import { AuthService } from "../../../services/authentication/auth.service";

@Component({
  selector: "app-calibrationgasses",
  templateUrl: "./assemblyType.component.html",
})

export class AssemblyTypeComponent extends BaseEntity<AssemblyTypesEntity> implements OnInit {

  objectSingle = 'Assembly type';
  objectPlural = 'Assembly types';

  searchCriteria: QueryAllAssemblyTypesEntitiesArgs = {
    orderBy: [AssemblyTypesEntitiesOrderBy.IdDesc],
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

  //json return object for getter
  Key = 'assemblyTypes';

  baseOrderBy = AssemblyTypesOrderBy.IdDesc;

  override nodes$: Observable<Array<AssemblyTypesEntity>>;

  constructor(protected override toastr: ToastrService, protected override route: ActivatedRoute, protected override http: HttpClient,
    private assemblyTypeService: AssemblyTypeEntitiesGQL,
    protected override router: Router,
    protected override fileService : FileService,
    protected override authService: AuthService
  ) {
    super(authService, fileService, router, toastr, route, http, assemblyTypeService, null);

    this.checkQueryParams();

    this.nodes$ = this.loadData(this.searchCriteria);
  }

  //maps for the url to be set at the front
  mapTableData(assemblyTypes: AssemblyTypesEntity[]): any[] {

    console.log(this.searchCriteria)
    return assemblyTypes.map((assemblyType) => {
      return {
        id: { url: null, value: assemblyType.id } as TableField,
        name: { url: null, value: assemblyType.name } as TableField,
        cdartikel: { url: null, value: assemblyType?.cdartikel } as TableField,
        free: { url: null, value: assemblyType?.voorraad } as TableField,
        res: { url: null, value: assemblyType?.gereserveerd } as TableField,
        min: { url: null, value: assemblyType?.minvoorraad } as TableField,
        max: { url: null, value: assemblyType?.maxvoorraad } as TableField,
        advice: { url: null, value: assemblyType?.advice } as TableField,
        created: { url: null, value: assemblyType?.created } as TableField,
        initials: { url: null, value: assemblyType?.initials } as TableField,
      };
    });
  }

  tableHeaders: TableHead<AssemblyTypesEntitiesOrderBy>[] = [
    { type: 'string', key: 'name', label: "Name", asc: AssemblyTypesEntitiesOrderBy.NameAsc, desc: AssemblyTypesEntitiesOrderBy.NameDesc },
    { type: 'string', key: 'cdartikel', label: "CD Artikel", asc: AssemblyTypesEntitiesOrderBy.CdartikelAsc, desc: AssemblyTypesEntitiesOrderBy.CdartikelDesc },
    { type: 'number', key: 'free', label: "Free", asc: AssemblyTypesEntitiesOrderBy.VoorraadAsc, desc: AssemblyTypesEntitiesOrderBy.VoorraadDesc },
    { type: 'number', key: 'res', label: "Res.", asc: AssemblyTypesEntitiesOrderBy.GereserveerdAsc, desc: AssemblyTypesEntitiesOrderBy.GereserveerdDesc },
    { type: 'number', key: 'min', label: "Min", asc: AssemblyTypesEntitiesOrderBy.MinvoorraadAsc, desc: AssemblyTypesEntitiesOrderBy.MinvoorraadDesc },
    { type: 'number', key: 'max', label: "Max", asc: AssemblyTypesEntitiesOrderBy.MaxvoorraadAsc, desc: AssemblyTypesEntitiesOrderBy.MaxvoorraadDesc },
    { type: 'number', key: 'advice', label: "Advice", asc: AssemblyTypesEntitiesOrderBy.AdviceAsc, desc: AssemblyTypesEntitiesOrderBy.AdviceDesc },
    { type: 'datetime', key: 'created', label: "Created", asc: AssemblyTypesEntitiesOrderBy.CreatedAsc, desc: AssemblyTypesEntitiesOrderBy.CreatedDesc },
    { type: 'string', key: 'initials', label: "By", asc: AssemblyTypesEntitiesOrderBy.OwnerIdAsc, desc: AssemblyTypesEntitiesOrderBy.OwnerIdDesc },
  ]

}
