import { Component, OnInit, ViewChild } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { TableField } from "../../../../models/utils/tableField";

import { ToastrService } from "ngx-toastr";
import { ActivatedRoute, Router } from "@angular/router";
import { AllFilterEntitiesGQL, AllORingEntitiesGQL, AllPyrolyserEntitiesGQL, DeleteFilterGQL, DeletePyrolyserGQL, FilterEntitiesOrderBy, FilterEntity, FilterEntityFilter, ORingEntitiesOrderBy, ORingEntity, PyrolyserEntitiesOrderBy, PyrolyserEntity, QueryAllFilterEntitiesArgs } from "../../../../../generated/graphql";
import { SearchFilters } from "../../../../models/utils/searchFilters";
import { BaseEntity } from "../../base/base-entity.component";
import { Observable } from "rxjs";
import { TableHead } from "../../../../models/utils/tableHead";
import { FiltersFormComponent } from "../form/filters-form.component";
import { FileService } from "../../../../services/file/file.service";

@Component({
  selector: "app-filters",
  templateUrl: "./filters.component.html",
})

export class FiltersComponent extends BaseEntity<FilterEntity> implements OnInit {


  @ViewChild('editModal') childComponent!: FiltersFormComponent;

  objectSingle = 'Filter';
  objectPlural = 'Filters';

  searchCriteria: QueryAllFilterEntitiesArgs = {
    orderBy: [FilterEntitiesOrderBy.IdDesc],
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
      consumable: this.selectedItem?.consumable,
    };
  }

  //IMPORTANT THIS IS THE NAME OF THE OBJECT IN DATA: {allGases: {nodes: []}}
  //json return object for getter
  //This is the object name of the nodes: return
  //check the get all method and see what it returns and set to this object
  Key = 'allFilterEntities';


  //This is the fallback order by on changes in the table
  baseOrderBy = FilterEntitiesOrderBy.IdDesc;

  override nodes$: Observable<Array<FilterEntity>>;

  constructor(protected override toastr: ToastrService, protected override route: ActivatedRoute, protected override http: HttpClient,
    private filterService: AllFilterEntitiesGQL,
    private deleteFilterService: DeleteFilterGQL
    ,
    protected override router: Router,
    protected override fileService: FileService
  ) {
    super(fileService, router, toastr, route, http, filterService, deleteFilterService);

    this.checkQueryParams();

    this.nodes$ = this.loadData(this.searchCriteria);
  }

  tableHeaders: TableHead<FilterEntitiesOrderBy>[] = [
    { key: 'cdartikel', label: "Part", asc: FilterEntitiesOrderBy.CdartikelAsc, desc: FilterEntitiesOrderBy.CdartikelDesc, type: 'string' },
    { key: 'name', label: "Name", asc: FilterEntitiesOrderBy.NameAsc, desc: FilterEntitiesOrderBy.NameDesc, type: 'string' },
    { key: 'omschr', label: "Description", asc: FilterEntitiesOrderBy.OmschrAsc, desc: FilterEntitiesOrderBy.OmschrDesc, type: 'string' },
    { key: 'replacementIntervalMonths', label: "Rep. Int.", asc: FilterEntitiesOrderBy.ReplacementIntervalMonthsAsc, desc: FilterEntitiesOrderBy.ReplacementIntervalMonthsDesc, type: 'number' },
    { key: 'consumable', label: "Consumable", asc: FilterEntitiesOrderBy.ConsumableAsc, desc: FilterEntitiesOrderBy.ConsumableDesc, type: 'boolean' },
    { key: 'created', label: "Created", asc: FilterEntitiesOrderBy.CreatedAsc, desc: FilterEntitiesOrderBy.CreatedDesc, type: 'datetime' },
    { key: 'initials', label: "By", asc: FilterEntitiesOrderBy.InitialsAsc, desc: FilterEntitiesOrderBy.InitialsDesc, type: 'string' },
  ]

  mapTableData(filters: FilterEntity[]): any[] {
    let object = filters.map((filter: FilterEntity) => {
      return {
        id: { url: null, value: filter.id } as TableField,
        cdartikel: { url: null, value: filter?.cdartikel } as TableField,
        name: { url: null, value: filter?.name } as TableField,
        omschr: { url: null, value: filter?.omschr } as TableField,
        replacementIntervalMonths: { url: null, value: filter?.replacementIntervalMonths } as TableField,
        consumable: { url: null, value: filter?.consumable } as TableField,
        created: { url: null, value: filter?.created } as TableField,
        initials: { url: null, value: filter?.initials } as TableField,
      };
    });
    return object;
  }


}
