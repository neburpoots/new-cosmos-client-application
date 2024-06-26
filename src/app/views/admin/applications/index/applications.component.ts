import { Component, OnInit, ViewChild } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { TableField } from "../../../../models/utils/tableField";

import { ToastrService } from "ngx-toastr";
import { ActivatedRoute, Router } from "@angular/router";
import { AllApplicationsGQL, AllGasesGQL, Application, ApplicationsOrderBy, DeleteApplicationGQL, DeleteGasGQL, Gas, GasesOrderBy, Principle, QueryAllApplicationsArgs, QueryAllFilterEntitiesArgs } from "../../../../../generated/graphql";
import { BaseEntity } from "../../base/base-entity.component";
import { TableHead } from "../../../../models/utils/tableHead";
import { ApplicationsFormComponent } from "../form/applications-form.component";
import { FileService } from "../../../../services/file/file.service";
import { AuthService } from "../../../../services/authentication/auth.service";


@Component({
  selector: "app-applications",
  templateUrl: "./applications.component.html",
})

export class ApplicationsComponent extends BaseEntity<Application> {


  @ViewChild('editModal') childComponent!: ApplicationsFormComponent;

  objectSingle = 'Application';
  objectPlural = 'Applications';

  searchCriteria: QueryAllApplicationsArgs = {
    orderBy: [ApplicationsOrderBy.IdDesc],
    first: 10,
    offset: 0,
    filter: {
      and: [

      ]
    },
  }

  override setEditData() {
    console.log(this.editData)

    const queryParams = { ...this.route.snapshot.queryParams };

    queryParams['edit'] = this.editData.id;

    this.router.navigate([], { queryParams: queryParams });

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

  constructor(
    protected override toastr: ToastrService, 
    protected override route: ActivatedRoute, 
    protected override http: HttpClient,
    private applicationsService: AllApplicationsGQL,
    private deleteApplicationService: DeleteApplicationGQL,
    protected override router: Router,
    protected override fileService: FileService,
    protected override authService : AuthService
  ) {

    super(authService, fileService, router, toastr, route, http, applicationsService, deleteApplicationService);

    this.checkQueryParams();

    this.loadData(this.searchCriteria);

  }

  tableHeaders : TableHead<ApplicationsOrderBy>[] = [
    { type: 'string', key: 'name', label: "Name", asc: ApplicationsOrderBy.NameAsc, desc: ApplicationsOrderBy.NameDesc },
    { type: 'datetime', key: 'created', label: "Created", asc: ApplicationsOrderBy.CreatedAsc, desc: ApplicationsOrderBy.CreatedDesc },
    { type: 'string', key: 'userByOwnerId$initials', label: "By", asc: ApplicationsOrderBy.UserByOwnerIdInitialsAsc, desc: ApplicationsOrderBy.UserByOwnerIdInitialsDesc },
  ];

  mapTableData(applications: Application[]): any[] {
    return applications.map((application: Application) => {
      return {
        id: { url: null, value: application.id } as TableField,
        name: { url: null, value: application?.name } as TableField,
        created: { url: null, value: application?.created } as TableField,
        userByOwnerId$initials: { url: null, value: application?.userByOwnerId?.initials } as TableField,
      };
    });
  }

}

