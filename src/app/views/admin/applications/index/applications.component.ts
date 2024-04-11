import { Component, OnInit, ViewChild } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { TableField } from "../../../../models/utils/tableField";

import { ToastrService } from "ngx-toastr";
import { ActivatedRoute, Router } from "@angular/router";
import { AllApplicationsGQL, AllGasesGQL, Application, ApplicationsOrderBy, DeleteApplicationGQL, DeleteGasGQL, Gas, GasesOrderBy, Principle } from "../../../../../generated/graphql";
import { SearchFilters } from "../../../../models/utils/searchFilters";
import { BaseEntity } from "../../base/base-entity.component";
import { Observable } from "rxjs";
import { TableHead } from "../../../../models/utils/tableHead";
import { ApplicationsFormComponent } from "../form/applications-form.component";

@Component({
  selector: "app-applications",
  templateUrl: "./applications.component.html",
})

export class ApplicationsComponent extends BaseEntity<Application> implements OnInit {


  @ViewChild('editModal') childComponent!: ApplicationsFormComponent;

  objectSingle = 'Application';
  objectPlural = 'Applications';

  searchCriteria: SearchFilters = {
    orderBy: [ApplicationsOrderBy.IdDesc],
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
  Key = 'allApplications';

  baseOrderBy = ApplicationsOrderBy.IdDesc;

  override nodes$: Observable<Array<Application>>;

  constructor(protected override toastr: ToastrService, protected override route: ActivatedRoute, protected override http: HttpClient,
    private applicationsService: AllApplicationsGQL,
    private deleteApplicationService: DeleteApplicationGQL,
    protected override router: Router
  ) {
    super(router, toastr, route, http, applicationsService, deleteApplicationService);

this.checkQueryParams();

this.nodes$ = this.loadData(this.searchCriteria);  }

  tableHeaders: TableHead<ApplicationsOrderBy>[] = [
    { key: 'name', label: "Name", asc: ApplicationsOrderBy.NameAsc, desc: ApplicationsOrderBy.NameDesc },
    { key: 'created', label: "Created", asc: ApplicationsOrderBy.CreatedAsc, desc: ApplicationsOrderBy.CreatedDesc },
    { key: 'by', label: "By", asc: ApplicationsOrderBy.UserByOwnerIdInitialsAsc, desc: ApplicationsOrderBy.UserByOwnerIdInitialsDesc },
  ]


  mapTableData(applications: Application[]): any[] {

    return applications.map((application: Application) => {
      return {
        id: { url: null, value: application.id } as TableField,
        name: { url: null, value: application?.name } as TableField,
        created: { url: null, value: application?.created } as TableField,
        by: { url: null, value: application?.userByOwnerId?.initials } as TableField,
      };
    });
  }


}
