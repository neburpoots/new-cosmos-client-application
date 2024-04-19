import { Component, OnInit, ViewChild } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { TableField } from "../../../../models/utils/tableField";

import { ToastrService } from "ngx-toastr";
import { ActivatedRoute, Router } from "@angular/router";
import { AllMembraneEntitiesGQL, AllORingEntitiesGQL, AllPyrolyserEntitiesGQL, DeleteMembraneGQL, DeletePyrolyserGQL, MembraneEntitiesOrderBy, MembraneEntity, ORingEntitiesOrderBy, ORingEntity, PyrolyserEntitiesOrderBy, PyrolyserEntity, QueryAllMembraneEntitiesArgs } from "../../../../../generated/graphql";
import { SearchFilters } from "../../../../models/utils/searchFilters";
import { BaseEntity } from "../../base/base-entity.component";
import { Observable } from "rxjs";
import { TableHead } from "../../../../models/utils/tableHead";
import { MembranesFormComponent } from "../form/membranes-form.component";
import { FileService } from "../../../../services/file/file.service";
import { AuthService } from "../../../../services/authentication/auth.service";

@Component({
  selector: "app-membranes",
  templateUrl: "./membranes.component.html",
})

export class MembranesComponent extends BaseEntity<MembraneEntity> implements OnInit {

  @ViewChild('editModal') childComponent!: MembranesFormComponent;

  objectSingle = 'Membrane';
  objectPlural = 'Membranes';

  searchCriteria: QueryAllMembraneEntitiesArgs = {
    orderBy: [MembraneEntitiesOrderBy.IdDesc],
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
      cdartikel: this.selectedItem?.cdartikel,
      replacement_interval_months: this.selectedItem?.replacementIntervalMonths,
      quantity: this.selectedItem?.quantity,
    };
  }

  //IMPORTANT THIS IS THE NAME OF THE OBJECT IN DATA: {allGases: {nodes: []}}
  //json return object for getter
  //This is the object name of the nodes: return
  //check the get all method and see what it returns and set to this object
  Key = 'allMembraneEntities';


  //This is the fallback order by on changes in the table
  baseOrderBy = MembraneEntitiesOrderBy.IdDesc;

  override nodes$: Observable<Array<MembraneEntity>>;

  constructor(protected override toastr: ToastrService, protected override route: ActivatedRoute, protected override http: HttpClient,
    private membraneService: AllMembraneEntitiesGQL,
    private deleteMembraneService: DeleteMembraneGQL,
    protected override router: Router,
    protected override fileService: FileService,
    protected override authService: AuthService
  ) {
    super(authService, fileService, router, toastr, route, http, membraneService, deleteMembraneService);

    this.checkQueryParams();

    this.nodes$ = this.loadData(this.searchCriteria);
  }

  tableHeaders: TableHead<MembraneEntitiesOrderBy>[] = [
    { type: 'string', key: 'cdartikel', label: "Part", asc: MembraneEntitiesOrderBy.CdartikelAsc, desc: MembraneEntitiesOrderBy.CdartikelDesc },
    { type: 'string', key: 'name', label: "Name", asc: MembraneEntitiesOrderBy.NameAsc, desc: MembraneEntitiesOrderBy.NameDesc },
    { type: 'string', key: 'omschr', label: "Description", asc: MembraneEntitiesOrderBy.OmschrAsc, desc: MembraneEntitiesOrderBy.OmschrDesc },
    { type: 'number', key: 'replacementIntervalMonths', label: "Rep. Int.", asc: MembraneEntitiesOrderBy.ReplacementIntervalMonthsAsc, desc: MembraneEntitiesOrderBy.ReplacementIntervalMonthsDesc },
    { type: 'number', key: 'quantity', label: "Quantity", asc: MembraneEntitiesOrderBy.QuantityAsc, desc: MembraneEntitiesOrderBy.QuantityDesc },
    { type: 'datetime', key: 'created', label: "Created", asc: MembraneEntitiesOrderBy.CreatedAsc, desc: MembraneEntitiesOrderBy.CreatedDesc },
    { type: 'string', key: 'initials', label: "By", asc: MembraneEntitiesOrderBy.InitialsAsc, desc: MembraneEntitiesOrderBy.InitialsDesc },
  ]


  mapTableData(membranes: MembraneEntity[]): any[] {
    return membranes.map((membrane: MembraneEntity) => {
      return {
        id: { url: null, value: membrane.id } as TableField,
        cdartikel: { url: null, value: membrane?.cdartikel } as TableField,
        name: { url: null, value: membrane?.name } as TableField,
        omschr: { url: null, value: membrane?.omschr } as TableField,
        replacementIntervalMonths: { url: null, value: membrane?.replacementIntervalMonths } as TableField,
        quantity: { url: null, value: membrane?.quantity } as TableField,
        created: { url: null, value: membrane?.created } as TableField,
        initials: { url: null, value: membrane?.initials } as TableField,
      };
    });
  }


}
