import { Component, OnInit, ViewChild } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { TableField } from "../../../../models/utils/tableField";

import { ToastrService } from "ngx-toastr";
import { ActivatedRoute, Router } from "@angular/router";
import { AllPyrolyserEntitiesGQL, DeletePyrolyserGQL, PyrolyserEntitiesOrderBy, PyrolyserEntity, QueryAllPyrolyserEntitiesArgs } from "../../../../../generated/graphql";
import { SearchFilters } from "../../../../models/utils/searchFilters";
import { BaseEntity } from "../../base/base-entity.component";
import { Observable } from "rxjs";
import { TableHead } from "../../../../models/utils/tableHead";
import { PyrolysersFormComponent } from "../form/pyrolysers-form.component";
import { FileService } from "../../../../services/file/file.service";

@Component({
  selector: "app-pyrolysers",
  templateUrl: "./pyrolysers.component.html",
})

export class PyrolysersComponent extends BaseEntity<PyrolyserEntity> implements OnInit {


  @ViewChild('editModal') childComponent!: PyrolysersFormComponent;

  objectSingle = 'Pyrolyser';
  objectPlural = 'Pyrolysers';

  searchCriteria: QueryAllPyrolyserEntitiesArgs = {
    orderBy: [PyrolyserEntitiesOrderBy.IdDesc],
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
    };
  }

  //IMPORTANT THIS IS THE NAME OF THE OBJECT IN DATA: {allGases: {nodes: []}}
  //json return object for getter
  //This is the object name of the nodes: return
  //check the get all method and see what it returns and set to this object
  Key = 'allPyrolyserEntities';


  //This is the fallback order by on changes in the table
  baseOrderBy = PyrolyserEntitiesOrderBy.IdDesc;

  override nodes$: Observable<Array<PyrolyserEntity>>;

  constructor(protected override toastr: ToastrService, protected override route: ActivatedRoute, protected override http: HttpClient,
    private pyrolyserService: AllPyrolyserEntitiesGQL,
    private deletePyrolyserService: DeletePyrolyserGQL
    ,
    protected override router: Router,
    protected override fileService: FileService
  ) {
    super(fileService, router, toastr, route, http, pyrolyserService, deletePyrolyserService);

    this.checkQueryParams();

    this.nodes$ = this.loadData(this.searchCriteria);
  }

  tableHeaders: TableHead<PyrolyserEntitiesOrderBy>[] = [
    { type: 'string', key: 'cdartikel', label: "Part", asc: PyrolyserEntitiesOrderBy.CdartikelAsc, desc: PyrolyserEntitiesOrderBy.CdartikelDesc },
    { type: 'string', key: 'name', label: "Name", asc: PyrolyserEntitiesOrderBy.NameAsc, desc: PyrolyserEntitiesOrderBy.NameDesc },
    { type: 'string', key: 'omschr', label: "Description", asc: PyrolyserEntitiesOrderBy.OmschrAsc, desc: PyrolyserEntitiesOrderBy.OmschrDesc },
    { type: 'number', key: 'replacementIntervalMonths', label: "Rep. Int.", asc: PyrolyserEntitiesOrderBy.ReplacementIntervalMonthsAsc, desc: PyrolyserEntitiesOrderBy.ReplacementIntervalMonthsDesc },
    { type: 'datetime', key: 'created', label: "Created", asc: PyrolyserEntitiesOrderBy.CreatedAsc, desc: PyrolyserEntitiesOrderBy.CreatedDesc },
    { type: 'string', key: 'initials', label: "By", asc: PyrolyserEntitiesOrderBy.InitialsAsc, desc: PyrolyserEntitiesOrderBy.InitialsDesc },
  ]


  mapTableData(pyrolysers: PyrolyserEntity[]): any[] {
    return pyrolysers.map((pyrolyser: PyrolyserEntity) => {
      return {
        id: { url: null, value: pyrolyser.id } as TableField,
        cdartikel: { url: null, value: pyrolyser?.cdartikel } as TableField,
        name: { url: null, value: pyrolyser?.name } as TableField,
        omschr: { url: null, value: pyrolyser?.omschr } as TableField,
        replacementIntervalMonths: { url: null, value: pyrolyser?.replacementIntervalMonths } as TableField,
        created: { url: null, value: pyrolyser?.created } as TableField,
        initials: { url: null, value: pyrolyser?.initials } as TableField,
      };
    });
  }


}
