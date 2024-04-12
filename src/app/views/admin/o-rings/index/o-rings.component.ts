import { Component, OnInit, ViewChild } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { TableField } from "../../../../models/utils/tableField";

import { ToastrService } from "ngx-toastr";
import { ActivatedRoute, Router } from "@angular/router";
import { AllORingEntitiesGQL, AllPyrolyserEntitiesGQL, DeletePyrolyserGQL, ORingEntitiesOrderBy, ORingEntity, PyrolyserEntitiesOrderBy, PyrolyserEntity, QueryAllORingEntitiesArgs } from "../../../../../generated/graphql";
import { SearchFilters } from "../../../../models/utils/searchFilters";
import { BaseEntity } from "../../base/base-entity.component";
import { Observable } from "rxjs";
import { TableHead } from "../../../../models/utils/tableHead";
import { ORingsFormComponent } from "../form/o-rings-form.component";

@Component({
  selector: "app-o-rings",
  templateUrl: "./o-rings.component.html",
})

export class ORingsComponent extends BaseEntity<ORingEntity> implements OnInit {


  @ViewChild('editModal') childComponent!: ORingsFormComponent;

  objectSingle = 'O-Ring';
  objectPlural = 'O-Rings';

  searchCriteria: QueryAllORingEntitiesArgs = {
    orderBy: [ORingEntitiesOrderBy.IdDesc],
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
  Key = 'allORingEntities';


  //This is the fallback order by on changes in the table
  baseOrderBy = ORingEntitiesOrderBy.IdDesc;

  override nodes$: Observable<Array<ORingEntity>>;

  constructor(protected override toastr: ToastrService, protected override route: ActivatedRoute, protected override http: HttpClient,
    private oRingService: AllORingEntitiesGQL,
    private deleteORingService: DeletePyrolyserGQL
    ,
    protected override router: Router
  ) {
    super(router, toastr, route, http, oRingService, deleteORingService);

    this.checkQueryParams();

    this.nodes$ = this.loadData(this.searchCriteria);
  }

  tableHeaders: TableHead<ORingEntitiesOrderBy>[] = [
    { key: 'cdartikel', label: "Part", asc: ORingEntitiesOrderBy.CdartikelAsc, desc: ORingEntitiesOrderBy.CdartikelDesc, type: 'string'},
    { key: 'name', label: "Name", asc: ORingEntitiesOrderBy.NameAsc, desc: ORingEntitiesOrderBy.NameDesc, type: 'string' },
    { key: 'omschr', label: "Description", asc: ORingEntitiesOrderBy.OmschrAsc, desc: ORingEntitiesOrderBy.OmschrDesc, type: 'string' },
    { key: 'replacementIntervalMonths', label: "Rep. Int.", asc: ORingEntitiesOrderBy.ReplacementIntervalMonthsAsc, desc: ORingEntitiesOrderBy.ReplacementIntervalMonthsDesc, type: 'number' },
    { key: 'quantity', label: "Quantity", asc: ORingEntitiesOrderBy.QuantityAsc, desc: ORingEntitiesOrderBy.QuantityDesc, type: 'number'},
    { key: 'created', label: "Created", asc: ORingEntitiesOrderBy.CreatedAsc, desc: ORingEntitiesOrderBy.CreatedDesc, type: 'datetime' },
    { key: 'initials', label: "By", asc: ORingEntitiesOrderBy.InitialsAsc, desc: ORingEntitiesOrderBy.InitialsDesc, type: 'string' },
  ]


  mapTableData(orings: ORingEntity[]): any[] {
    let object = orings.map((oring: ORingEntity) => {
      return {
        id: { url: null, value: oring.id } as TableField,
        cdartikel: { url: null, value: oring?.cdartikel } as TableField,
        name: { url: null, value: oring?.name } as TableField,
        omschr: { url: null, value: oring?.omschr } as TableField,
        replacementIntervalMonths: { url: null, value: oring?.replacementIntervalMonths } as TableField,
        quantity: { url: null, value: oring?.quantity } as TableField,
        created: { url: null, value: oring?.created } as TableField,
        initials: { url: null, value: oring?.initials } as TableField,
      };
    });

    //ASSIGN THE FIRST VALUE
    //This is for an edge case where the filter returns no results
    //This means further filtering will not work because the dynamic filtering does not know the types
    //this fixes it by saving the first result from the first fetch
    if (object.length > 0) {
      this.baseTableRow = object[0];
    }

    return object;
  }


}
