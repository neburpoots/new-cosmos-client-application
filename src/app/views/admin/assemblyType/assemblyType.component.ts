import { Component, OnInit, SimpleChanges, ViewChild } from "@angular/core";
import { HttpClient, HttpResponse } from "@angular/common/http";

import AssemblyType from "../../../models/entities/assemblyType";
import { AbstractComponent } from "../abstract/abstract.component";
import { ToastrService } from "ngx-toastr";
import { AbstractService } from "../../../services/abstract/abstract.service";
import { TableField } from "../../../models/utils/tableField";
import { IAbstractComponent } from "../../../models/interface/IAbstractComponent";
import { TableHeader } from "../../../models/utils/tableHeader";
import { ActivatedRoute } from "@angular/router";
import { Observable, Subject, map, of, startWith, switchMap } from "rxjs";
import { AssemblyTypeEntitiesGQL, AssemblyTypeEntitiesQuery, AssemblyTypesEntitiesOrderBy, AssemblyTypesEntity, AssemblyTypesOrderBy } from "../../../../generated/graphql";
import { BaseEntity } from "../base/base-entity.component";
import { SearchFilters } from "../../../models/utils/searchFilters";
import { AssemblyService } from "../../../services/assembly/assembly.service";
import { AssemblyTypeService } from "../../../services/assemblyType/assemblyType.service";
import { TableHead } from "../../../models/utils/tableHead";

@Component({
  selector: "app-calibrationgasses",
  templateUrl: "./assemblyType.component.html",
})

export class AssemblyTypeComponent extends BaseEntity<AssemblyTypesEntity> implements OnInit{

  objectSingle = 'Assembly type';
  objectPlural = 'Assembly types';

  searchCriteria: SearchFilters = {
    orderBy: [AssemblyTypesEntitiesOrderBy.IdDesc],
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

  //json return object for getter
  Key = 'assemblyTypes';

  baseOrderBy = AssemblyTypesOrderBy.IdDesc;

  override nodes$: Observable<Array<AssemblyTypesEntity>>;

  constructor(protected override toastr: ToastrService, protected override route: ActivatedRoute, protected override http: HttpClient,
    private assemblyTypeService: AssemblyTypeEntitiesGQL) {
    super(toastr, route, http, assemblyTypeService, null);

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

  tableHeaders : TableHead<AssemblyTypesEntitiesOrderBy>[] = [
		{ key: 'name', label: "Name", asc: AssemblyTypesEntitiesOrderBy.NameAsc, desc: AssemblyTypesEntitiesOrderBy.NameDesc },
		{ key: 'cdartikel', label: "CD Artikel", asc: AssemblyTypesEntitiesOrderBy.CdartikelAsc, desc: AssemblyTypesEntitiesOrderBy.CdartikelDesc },
		{ key: 'free', label: "Free", asc: AssemblyTypesEntitiesOrderBy.VoorraadAsc, desc: AssemblyTypesEntitiesOrderBy.VoorraadDesc },
		{ key: 'res', label: "Res.", asc: AssemblyTypesEntitiesOrderBy.GereserveerdAsc, desc: AssemblyTypesEntitiesOrderBy.GereserveerdDesc },
		{ key: 'min', label: "Min", asc: AssemblyTypesEntitiesOrderBy.MinvoorraadAsc, desc: AssemblyTypesEntitiesOrderBy.MinvoorraadDesc },
		{ key: 'max', label: "Max", asc: AssemblyTypesEntitiesOrderBy.MaxvoorraadAsc, desc: AssemblyTypesEntitiesOrderBy.MaxvoorraadDesc },
		{ key: 'advice', label: "Advice", asc: AssemblyTypesEntitiesOrderBy.AdviceAsc, desc: AssemblyTypesEntitiesOrderBy.AdviceDesc },
		{ key: 'created', label: "Created", asc: AssemblyTypesEntitiesOrderBy.CreatedAsc, desc: AssemblyTypesEntitiesOrderBy.CreatedDesc },
		{ key: 'initials', label: "By", asc: AssemblyTypesEntitiesOrderBy.OwnerIdAsc, desc: AssemblyTypesEntitiesOrderBy.OwnerIdDesc },
	]

}
