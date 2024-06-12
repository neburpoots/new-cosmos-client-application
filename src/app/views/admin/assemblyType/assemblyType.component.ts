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

export class AssemblyTypeComponent extends BaseEntity<AssemblyTypesEntity> {

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


  //json return object for getter
  Key = 'assemblyTypes';

  baseOrderBy = AssemblyTypesOrderBy.IdDesc;

  constructor(protected override toastr: ToastrService, protected override route: ActivatedRoute, protected override http: HttpClient,
    private assemblyTypeService: AssemblyTypeEntitiesGQL,
    protected override router: Router,
    protected override fileService: FileService,
    protected override authService: AuthService
  ) {
    super(authService, fileService, router, toastr, route, http, assemblyTypeService, null);

    this.checkQueryParams();

    this.loadData(this.searchCriteria);
  }

  //maps for the url to be set at the front
  mapTableData(assemblyTypes: AssemblyTypesEntity[]): any[] {

    console.log(this.searchCriteria)
    return assemblyTypes.map((assemblyType) => {
      return {
        id: { url: null, value: assemblyType.id } as TableField,
        name: { url: null, value: assemblyType.name } as TableField,
        cdartikel: { url: null, value: assemblyType?.cdartikel } as TableField,
        voorraad: { url: null, value: assemblyType?.voorraad } as TableField,
        gereserveerd: { url: null, value: assemblyType?.gereserveerd } as TableField,
        minvoorraad: { url: null, value: assemblyType?.minvoorraad } as TableField,
        maxvoorraad: { url: null, value: assemblyType?.maxvoorraad } as TableField,
        advice: { url: null, value: assemblyType?.advice } as TableField,
        created: { url: null, value: assemblyType?.created } as TableField,
        initials: { url: null, value: assemblyType?.initials } as TableField,
      };
    });
  }

  tableHeaders: TableHead<AssemblyTypesEntitiesOrderBy>[] = [
    { type: 'string', key: 'name', label: "Name", asc: AssemblyTypesEntitiesOrderBy.NameAsc, desc: AssemblyTypesEntitiesOrderBy.NameDesc },
    { type: 'string', key: 'cdartikel', label: "CD Artikel", asc: AssemblyTypesEntitiesOrderBy.CdartikelAsc, desc: AssemblyTypesEntitiesOrderBy.CdartikelDesc },
    { type: 'number', round: 0, key: 'voorraad', label: "Free", asc: AssemblyTypesEntitiesOrderBy.VoorraadAsc, desc: AssemblyTypesEntitiesOrderBy.VoorraadDesc },
    { type: 'number', round: 0, key: 'gereserveerd', label: "Res.", asc: AssemblyTypesEntitiesOrderBy.GereserveerdAsc, desc: AssemblyTypesEntitiesOrderBy.GereserveerdDesc },
    { type: 'number', round: 0, key: 'minvoorraad', label: "Min", asc: AssemblyTypesEntitiesOrderBy.MinvoorraadAsc, desc: AssemblyTypesEntitiesOrderBy.MinvoorraadDesc },
    { type: 'number', round: 0, key: 'maxvoorraad', label: "Max", asc: AssemblyTypesEntitiesOrderBy.MaxvoorraadAsc, desc: AssemblyTypesEntitiesOrderBy.MaxvoorraadDesc },
    { type: 'number', round: 0, key: 'advice', label: "Advice", asc: AssemblyTypesEntitiesOrderBy.AdviceAsc, desc: AssemblyTypesEntitiesOrderBy.AdviceDesc },
    { type: 'datetime', key: 'created', label: "Created", asc: AssemblyTypesEntitiesOrderBy.CreatedAsc, desc: AssemblyTypesEntitiesOrderBy.CreatedDesc },
    { type: 'string', key: 'initials', label: "By", asc: AssemblyTypesEntitiesOrderBy.OwnerIdAsc, desc: AssemblyTypesEntitiesOrderBy.OwnerIdDesc },
  ]

}
