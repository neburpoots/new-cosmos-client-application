import { Component, OnInit, SimpleChanges, ViewChild } from "@angular/core";
import { HttpClient, HttpResponse } from "@angular/common/http";

import { TableField } from "../../../../models/utils/tableField";
import { ToastrService } from "ngx-toastr";
import { TableHeader } from "../../../../models/utils/tableHeader";
import { ActivatedRoute, Router } from "@angular/router";
import { AllCalibrationGasesGQL, AllGroupsGQL, AllusersGQL, DeleteGroupAndPermissionGQL, DeleteUserWithUserGroupsGQL, Group, GroupsOrderBy, QueryAllGroupsArgs, QueryAllUsersArgs, User, UsersOrderBy } from "../../../../../generated/graphql";
import { SearchFilters } from "../../../../models/utils/searchFilters";
import { BaseEntity } from "../../base/base-entity.component";
import { Observable } from "rxjs";
import { TableHead } from "../../../../models/utils/tableHead";
import { FileService } from "../../../../services/file/file.service";
import { GroupsFormComponent } from "../form/groups-form.component";

@Component({
  selector: "app-groups",
  templateUrl: "./groups.component.html",
})

export class GroupsComponent extends BaseEntity<Group> implements OnInit {


  @ViewChild('editModal') childComponent!: GroupsFormComponent;

  objectSingle = 'Group';
  objectPlural = 'Groups';

  searchCriteria: QueryAllGroupsArgs = {
    orderBy: [GroupsOrderBy.IdDesc],
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
      groupPermissionByGroupId: this.selectedItem?.groupPermissionByGroupId,
    };
  }


  //json return object for getter
  //This is the object name of the nodes: return
  //check the get all method and see what it returns and set to this object
  Key = 'allGroups';

  baseOrderBy = UsersOrderBy.IdDesc;

  override nodes$: Observable<Array<Group>>;

  constructor(protected override toastr: ToastrService, protected override route: ActivatedRoute, protected override http: HttpClient,
    private groupService: AllGroupsGQL,
    private deleteGroupService: DeleteGroupAndPermissionGQL
    ,
    protected override router: Router,
    protected override fileService : FileService,
  ) {
    super(fileService, router, toastr, route, http, groupService, deleteGroupService);

    this.checkQueryParams();

    this.nodes$ = this.loadData(this.searchCriteria);
  }

  tableHeaders: TableHead<GroupsOrderBy>[] = [
    { type: 'string', key: 'name', label: "Name", asc: GroupsOrderBy.NameAsc, desc: GroupsOrderBy.NameDesc },
    { type: 'datetime', key: 'created', label: "Created", asc: GroupsOrderBy.CreatedAsc, desc: GroupsOrderBy.CreatedDesc },
    { type: 'datetime', key: 'modified', label: "Modified", asc: GroupsOrderBy.ModifiedAsc, desc: GroupsOrderBy.ModifiedDesc },
  ]

  createGroupString(groups: any): string {
    return groups.map((group: any) => group.groupByGroupId.name).join(', ');
  }


  mapTableData(groups: Group[]): any[] {
    console.log(groups)
    return groups.map((group: Group) => {
      return {
        id: { url: 'api/users', value: group.id } as TableField,
        name: { url: null, value: group?.name } as TableField,
        created: { url: null, value: group.created } as TableField,
        modified: { url: null, value: group.modified } as TableField,
      };
    });
  }


}
