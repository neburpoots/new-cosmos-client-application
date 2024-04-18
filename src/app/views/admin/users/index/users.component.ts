import { Component, OnInit, SimpleChanges, ViewChild } from "@angular/core";
import { HttpClient, HttpResponse } from "@angular/common/http";

import { TableField } from "../../../../models/utils/tableField";
import { ToastrService } from "ngx-toastr";
import { TableHeader } from "../../../../models/utils/tableHeader";
import { ActivatedRoute, Router } from "@angular/router";
import { AllCalibrationGasesGQL, AllusersGQL, DeleteUserWithUserGroupsGQL, QueryAllUsersArgs, User, UsersOrderBy } from "../../../../../generated/graphql";
import { SearchFilters } from "../../../../models/utils/searchFilters";
import { BaseEntity } from "../../base/base-entity.component";
import { Observable } from "rxjs";
import { TableHead } from "../../../../models/utils/tableHead";
import { FileService } from "../../../../services/file/file.service";
import { UsersFormComponent } from "../form/users-form.component";

@Component({
  selector: "app-users",
  templateUrl: "./users.component.html",
})

export class UsersComponent extends BaseEntity<User> implements OnInit {


  @ViewChild('editModal') childComponent!: UsersFormComponent;

  objectSingle = 'User';
  objectPlural = 'Users';

  searchCriteria: QueryAllUsersArgs = {
    orderBy: [UsersOrderBy.IdDesc],
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
      username: this.selectedItem?.username,
      fullname: this.selectedItem?.fullname,
      initials: this.selectedItem?.initials,
      groups: this.selectedItem?.usersGroupsByUserId?.nodes.map((group: any) => group.groupByGroupId),     
    };
  }


  //json return object for getter
  //This is the object name of the nodes: return
  //check the get all method and see what it returns and set to this object
  Key = 'allUsers';

  baseOrderBy = UsersOrderBy.IdDesc;

  override nodes$: Observable<Array<User>>;

  constructor(protected override toastr: ToastrService, protected override route: ActivatedRoute, protected override http: HttpClient,
    private userService: AllusersGQL,
    private deleteUserService: DeleteUserWithUserGroupsGQL
    ,
    protected override router: Router,
    protected override fileService : FileService,
  ) {
    super(fileService, router, toastr, route, http, userService, deleteUserService);

    this.checkQueryParams();

    this.nodes$ = this.loadData(this.searchCriteria);
  }

  tableHeaders: TableHead<UsersOrderBy>[] = [
    { type: 'string', key: 'fullname', label: "Full Name", asc: UsersOrderBy.FullnameAsc, desc: UsersOrderBy.FullnameDesc },
    { type: 'number', key: 'username', label: "Username", asc: UsersOrderBy.UsernameAsc, desc: UsersOrderBy.UsernameDesc },
    { type: 'string', key: 'initials', label: "Initials", asc: UsersOrderBy.InitialsAsc, desc: UsersOrderBy.InitialsDesc },
    { type: 'string', key: 'usersGroupsByUserId$some$groupByGroupId$name', label: "Groups", asc: UsersOrderBy.UsersGroupsByUserIdCountAsc, desc: UsersOrderBy.UsersGroupsByUserIdCountDesc },
    { type: 'datetime', key: 'created', label: "Created", asc: UsersOrderBy.CreatedAsc, desc: UsersOrderBy.CreatedDesc },
  ]

  createGroupString(groups: any): string {
    return groups.map((group: any) => group.groupByGroupId.name).join(', ');
  }


  mapTableData(users: User[]): any[] {
    console.log(users)
    return users.map((user: User) => {
      return {
        id: { url: 'api/users', value: user.id } as TableField,
        fullname: { url: null, value: user?.fullname } as TableField,
        username: { url: null, value: user?.username } as TableField,
        initials: { url: null, value: user?.initials } as TableField,
        usersGroupsByUserId$some$groupByGroupId$name: { url: null, value: this.createGroupString(user?.usersGroupsByUserId?.nodes) } as TableField,
        created: { url: null, value: user.created } as TableField,
      };
    });
  }


}
