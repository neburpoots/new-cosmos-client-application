import { Component, OnInit, ViewChild } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { TableField } from "../../../../models/utils/tableField";

import { ToastrService } from "ngx-toastr";
import { ActivatedRoute, Router } from "@angular/router";
import { AllApplicationsGQL, AllGasesGQL, Application, ApplicationsOrderBy, DeleteApplicationGQL, DeleteGasGQL, Gas, GasesOrderBy, Principle, QueryAllApplicationsArgs, QueryAllFilterEntitiesArgs } from "../../../../../generated/graphql";
import { SearchFilters } from "../../../../models/utils/searchFilters";
import { BaseEntity } from "../../base/base-entity.component";
import { Observable } from "rxjs";
import { TableHead } from "../../../../models/utils/tableHead";
import { ApplicationsFormComponent } from "../form/applications-form.component";
import { FileService } from "../../../../services/file/file.service";
import { AuthService } from "../../../../services/authentication/auth.service";
import { BaseService } from "../../../../services/base/base.service";
import { applicationTableHeaders } from "../application";

@Component({
  selector: "app-applications",
  templateUrl: "./applications.component.html",
})

export class ApplicationsComponent {


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


  setEditData() {
    this.childComponent.setEditData(this.editData);
  }

  get editData(): any {
    return {
      id: this.baseService.selectedItem?.id,
      name: this.baseService.selectedItem?.name,
    };
  }

  //IMPORTANT THIS IS THE NAME OF THE OBJECT IN DATA: {allGases: {nodes: []}}
  //json return object for getter
  //This is the object name of the nodes: return
  //check the get all method and see what it returns and set to this object
  Key = 'allApplications';

  baseOrderBy = ApplicationsOrderBy.IdDesc;

  constructor(
    private applicationsService: AllApplicationsGQL,
    private deleteApplicationService: DeleteApplicationGQL,
    protected baseService : BaseService<Application>,
    protected route: ActivatedRoute,
  ) {

    baseService.setUpBaseService(
      route, 
      this.applicationsService, 
      this.deleteApplicationService, 
      this.Key, 
      this.tableHeaders, 
      this.searchCriteria,
      this.mapTableData,
      this.objectPlural,
      this.objectSingle,
    );

    baseService.setUpEditBaseService(this.setEditData.bind(this))

  }

  tableHeaders = applicationTableHeaders;


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
