import { Component, OnInit, ViewChild } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { TableField } from "../../../../models/utils/tableField";

import { ToastrService } from "ngx-toastr";
import { ActivatedRoute, Router } from "@angular/router";
import { AllPrinciplesGQL, DeletePrincipleGQL, Principle, PrinciplesOrderBy, QueryAllPrinciplesArgs } from "../../../../../generated/graphql";
import { SearchFilters } from "../../../../models/utils/searchFilters";
import { BaseEntity } from "../../base/base-entity.component";
import { Observable } from "rxjs";
import { TableHead } from "../../../../models/utils/tableHead";
import { PrinciplesFormComponent } from "../form/principles-form.component";
import { FileService } from "../../../../services/file/file.service";

@Component({
  selector: "app-principles",
  templateUrl: "./principles.component.html",
})

export class PrinciplesComponent extends BaseEntity<Principle> implements OnInit {


  @ViewChild('editModal') childComponent!: PrinciplesFormComponent;

  objectSingle = 'Principle';
  objectPlural = 'Principles';

  searchCriteria: QueryAllPrinciplesArgs = {
    orderBy: [PrinciplesOrderBy.IdDesc],
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

  override setEditData() {
    console.log(this.editData)
    this.childComponent.setEditData(this.editData);
  }

  get editData(): any {
    return {
      id: this.selectedItem?.id,
      name: this.selectedItem?.name,
    };
  }

  //json return object for getter
  //This is the object name of the nodes: return
  //check the get all method and see what it returns and set to this object
  Key = 'allPrinciples';

  baseOrderBy = PrinciplesOrderBy.IdDesc;

  override nodes$: Observable<Array<Principle>>;

  constructor(protected override toastr: ToastrService, protected override route: ActivatedRoute, protected override http: HttpClient,
    private principleService: AllPrinciplesGQL,
    private deletePrincipleService: DeletePrincipleGQL
    ,
    protected override router: Router,
    protected override fileService: FileService
  ) {
    super(fileService, router, toastr, route, http, principleService, deletePrincipleService);

    this.checkQueryParams();

    this.nodes$ = this.loadData(this.searchCriteria);
  }

  tableHeaders: TableHead<PrinciplesOrderBy>[] = [
    { type: 'string', key: 'name', label: "Name", asc: PrinciplesOrderBy.NameAsc, desc: PrinciplesOrderBy.NameDesc },
    { type: 'datetime', key: 'created', label: "Created", asc: PrinciplesOrderBy.CreatedAsc, desc: PrinciplesOrderBy.CreatedDesc },
    { type: 'string', key: 'userByOwnerId$initials', label: "By", asc: PrinciplesOrderBy.UserByOwnerIdInitialsAsc, desc: PrinciplesOrderBy.UserByOwnerIdInitialsDesc },
  ]


  mapTableData(principles: Principle[]): any[] {
    console.log(principles)
    return principles.map((principle: Principle) => {
      return {
        id: { url: null, value: principle.id } as TableField,
        name: { url: null, value: principle?.name } as TableField,
        created: { url: null, value: principle?.created } as TableField,
        userByOwnerId$initials: { url: null, value: principle?.userByOwnerId?.initials } as TableField,
      };
    });
  }


}
