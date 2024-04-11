import { Component, OnInit, ViewChild } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { TableField } from "../../../../models/utils/tableField";

import { ToastrService } from "ngx-toastr";
import { ActivatedRoute, Router } from "@angular/router";
import { AllGasesGQL, AllPrinciplesGQL, DeleteGasGQL, DeletePrincipleGQL, Gas, GasesOrderBy, Principle, PrinciplesOrderBy } from "../../../../../generated/graphql";
import { SearchFilters } from "../../../../models/utils/searchFilters";
import { BaseEntity } from "../../base/base-entity.component";
import { Observable } from "rxjs";
import { TableHead } from "../../../../models/utils/tableHead";
import { GasesFormComponent } from "../form/gases-form.component";

@Component({
  selector: "app-gases",
  templateUrl: "./gases.component.html",
})

export class GasesComponent extends BaseEntity<Gas> implements OnInit {


  @ViewChild('editModal') childComponent!: GasesFormComponent;

  objectSingle = 'Gas';
  objectPlural = 'Gases';

  searchCriteria: SearchFilters = {
    orderBy: [GasesOrderBy.IdDesc],
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

  //IMPORTANT THIS IS THE NAME OF THE OBJECT IN DATA: {allGases: {nodes: []}}
  //json return object for getter
  //This is the object name of the nodes: return
  //check the get all method and see what it returns and set to this object
  Key = 'allGases';

  baseOrderBy = GasesOrderBy.IdDesc;

  override nodes$: Observable<Array<Gas>>;

  constructor(protected override toastr: ToastrService, protected override route: ActivatedRoute, protected override http: HttpClient,
    private gasesService: AllGasesGQL,
    private deleteGasService: DeleteGasGQL,
    protected override router: Router
  ) {
    super(router, toastr, route, http, gasesService, deleteGasService);

this.checkQueryParams();

this.nodes$ = this.loadData(this.searchCriteria);  }

  tableHeaders: TableHead<GasesOrderBy>[] = [
    { key: 'name', label: "Name", asc: GasesOrderBy.NameAsc, desc: GasesOrderBy.NameDesc },
    { key: 'created', label: "Created", asc: GasesOrderBy.CreatedAsc, desc: GasesOrderBy.CreatedDesc },
    { key: 'by', label: "By", asc: GasesOrderBy.UserByOwnerIdInitialsAsc, desc: GasesOrderBy.UserByOwnerIdInitialsDesc },
  ]


  mapTableData(gases: Gas[]): any[] {
    return gases.map((gas: Gas) => {
      return {
        id: { url: null, value: gas.id } as TableField,
        name: { url: null, value: gas?.name } as TableField,
        created: { url: null, value: gas?.created } as TableField,
        by: { url: null, value: gas?.userByOwnerId?.initials } as TableField,
      };
    });
  }


}
