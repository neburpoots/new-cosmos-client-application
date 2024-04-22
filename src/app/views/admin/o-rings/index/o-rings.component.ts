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
import { FileService } from "../../../../services/file/file.service";
import { AuthService } from "../../../../services/authentication/auth.service";

@Component({
  selector: "app-o-rings",
  templateUrl: "./o-rings.component.html",
})

export class ORingsComponent extends BaseEntity<ORingEntity> {


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

  constructor(protected override toastr: ToastrService, protected override route: ActivatedRoute, protected override http: HttpClient,
    private oRingService: AllORingEntitiesGQL,
    private deleteORingService: DeletePyrolyserGQL
    ,
    protected override router: Router,
    protected override fileService: FileService,
    protected override authService: AuthService
  ) {
    super(authService, fileService, router, toastr, route, http, oRingService, deleteORingService);

    this.checkQueryParams();

    this.loadData(this.searchCriteria);
  }

  tableHeaders: TableHead<ORingEntitiesOrderBy>[] = [
    { key: 'cdartikel', label: "Part", asc: ORingEntitiesOrderBy.CdartikelAsc, desc: ORingEntitiesOrderBy.CdartikelDesc, type: 'string' },
    { key: 'name', label: "Name", asc: ORingEntitiesOrderBy.NameAsc, desc: ORingEntitiesOrderBy.NameDesc, type: 'string' },
    { key: 'omschr', label: "Description", asc: ORingEntitiesOrderBy.OmschrAsc, desc: ORingEntitiesOrderBy.OmschrDesc, type: 'string' },
    { key: 'replacementIntervalMonths', label: "Rep. Int.", asc: ORingEntitiesOrderBy.ReplacementIntervalMonthsAsc, desc: ORingEntitiesOrderBy.ReplacementIntervalMonthsDesc, type: 'number' },
    { key: 'quantity', label: "Quantity", asc: ORingEntitiesOrderBy.QuantityAsc, desc: ORingEntitiesOrderBy.QuantityDesc, type: 'number' },
    { key: 'created', label: "Created", asc: ORingEntitiesOrderBy.CreatedAsc, desc: ORingEntitiesOrderBy.CreatedDesc, type: 'datetime' },
    { key: 'initials', label: "By", asc: ORingEntitiesOrderBy.InitialsAsc, desc: ORingEntitiesOrderBy.InitialsDesc, type: 'string' },
  ]


  mapTableData(orings: ORingEntity[]): any[] {
    return orings.map((oring: ORingEntity) => {
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
  }


}
