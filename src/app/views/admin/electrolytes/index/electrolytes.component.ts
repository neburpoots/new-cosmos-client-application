import { Component, OnInit, ViewChild } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { TableField } from "../../../../models/utils/tableField";

import { ToastrService } from "ngx-toastr";
import { ActivatedRoute, Router } from "@angular/router";
import { AllElectrolyteEntitiesGQL, AllMembraneEntitiesGQL, AllORingEntitiesGQL, AllPyrolyserEntitiesGQL, DeleteElectrolyteGQL, DeleteMembraneGQL, DeletePyrolyserGQL, ElectrolyteEntitiesOrderBy, ElectrolyteEntity, ElectrolytesOrderBy, MembraneEntitiesOrderBy, MembraneEntity, ORingEntitiesOrderBy, ORingEntity, PyrolyserEntitiesOrderBy, PyrolyserEntity, QueryAllElectrolyteEntitiesArgs } from "../../../../../generated/graphql";
import { SearchFilters } from "../../../../models/utils/searchFilters";
import { BaseEntity } from "../../base/base-entity.component";
import { Observable } from "rxjs";
import { TableHead } from "../../../../models/utils/tableHead";
import { ElectrolytesFormComponent } from "../form/electrolytes-form.component";
import { FileService } from "../../../../services/file/file.service";
import { AuthService } from "../../../../services/authentication/auth.service";

@Component({
  selector: "app-electrolytes",
  templateUrl: "./electrolytes.component.html",
})

export class ElectrolytesComponent extends BaseEntity<ElectrolyteEntity> {

  @ViewChild('editModal') childComponent!: ElectrolytesFormComponent;

  objectSingle = 'Electrolyte';
  objectPlural = 'Electrolytes';

  searchCriteria: QueryAllElectrolyteEntitiesArgs = {
    orderBy: [ElectrolyteEntitiesOrderBy.IdDesc],
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
      volume: this.selectedItem?.volume,
    };
  }

  //IMPORTANT THIS IS THE NAME OF THE OBJECT IN DATA: {allElectrolyteEntities: {nodes: []}}
  //json return object for getter
  //This is the object name of the nodes: return
  //check the get all method and see what it returns and set to this object
  Key = 'allElectrolyteEntities';


  //This is the fallback order by on changes in the table
  baseOrderBy = ElectrolytesOrderBy.IdDesc;

  constructor(protected override toastr: ToastrService, protected override route: ActivatedRoute, protected override http: HttpClient,
    private electrolyteService: AllElectrolyteEntitiesGQL,
    private deleteElectrolyteService: DeleteElectrolyteGQL,
    protected override router: Router,
    protected override fileService: FileService,
    protected override authService: AuthService
  ) {
    super(authService, fileService, router, toastr, route, http, electrolyteService, deleteElectrolyteService);

    this.checkQueryParams();

    this.loadData(this.searchCriteria);
  }

  tableHeaders: TableHead<ElectrolyteEntitiesOrderBy>[] = [
    { type: 'string', key: 'cdartikel', label: "Part", asc: ElectrolyteEntitiesOrderBy.CdartikelAsc, desc: ElectrolyteEntitiesOrderBy.CdartikelDesc },
    { type: 'string', key: 'name', label: "Name", asc: ElectrolyteEntitiesOrderBy.NameAsc, desc: ElectrolyteEntitiesOrderBy.NameDesc },
    { type: 'string', key: 'omschr', label: "Description", asc: ElectrolyteEntitiesOrderBy.OmschrAsc, desc: ElectrolyteEntitiesOrderBy.OmschrDesc },
    { type: 'number', key: 'replacementIntervalMonths', label: "Rep. Int.", asc: ElectrolyteEntitiesOrderBy.ReplacementIntervalMonthsAsc, desc: ElectrolyteEntitiesOrderBy.ReplacementIntervalMonthsDesc },
    { type: 'number', key: 'volume', label: "Volume", asc: ElectrolyteEntitiesOrderBy.VolumeAsc, desc: ElectrolyteEntitiesOrderBy.VolumeDesc },
    { type: 'datetime', key: 'created', label: "Created", asc: ElectrolyteEntitiesOrderBy.CreatedAsc, desc: ElectrolyteEntitiesOrderBy.CreatedDesc },
    { type: 'string', key: 'initials', label: "By", asc: ElectrolyteEntitiesOrderBy.InitialsAsc, desc: ElectrolyteEntitiesOrderBy.InitialsDesc },
  ]


  mapTableData(electrolytes: ElectrolyteEntity[]): any[] {
    return electrolytes.map((electrolyte: ElectrolyteEntity) => {
      return {
        id: { url: null, value: electrolyte.id } as TableField,
        cdartikel: { url: null, value: electrolyte?.cdartikel } as TableField,
        name: { url: null, value: electrolyte?.name } as TableField,
        omschr: { url: null, value: electrolyte?.omschr } as TableField,
        replacementIntervalMonths: { url: null, value: electrolyte?.replacementIntervalMonths } as TableField,
        volume: { url: null, value: electrolyte?.volume } as TableField,
        created: { url: null, value: electrolyte?.created } as TableField,
        initials: { url: null, value: electrolyte?.initials } as TableField,
      };
    });
  }


}
