import { Component, OnInit, SimpleChanges, ViewChild } from "@angular/core";
import { HttpClient, HttpResponse } from "@angular/common/http";
import { TableField } from "../../../../models/utils/tableField";
import { ToastrService } from "ngx-toastr";
import { TableHeader } from "../../../../models/utils/tableHeader";
import { ActivatedRoute, Router } from "@angular/router";
import { AllChemicalCompoundsGQL, ChemicalCompound, ChemicalCompoundsOrderBy, DeleteCalGasGQL, DeleteChemicalCompoundGQL, QueryAllChemicalCompoundsArgs } from "../../../../../generated/graphql";
import { SearchFilters } from "../../../../models/utils/searchFilters";
import { BaseEntity } from "../../base/base-entity.component";
import { Observable } from "rxjs";
import { TableHead } from "../../../../models/utils/tableHead";
import { ChemicalCompoundsFormComponent } from "../form/chemical-compounds-form.component";
import { FileService } from "../../../../services/file/file.service";

@Component({
  selector: "app-chemical-compounds",
  templateUrl: "./chemical-compounds.component.html",
})

export class ChemicalCompoundsComponent extends BaseEntity<ChemicalCompound> implements OnInit {

  @ViewChild('editModal') childComponent!: ChemicalCompoundsFormComponent;

  objectSingle = 'Chemical Compound';
  objectPlural = 'Chemical Compounds';

  searchCriteria: QueryAllChemicalCompoundsArgs = {
    orderBy: [ChemicalCompoundsOrderBy.IdDesc],
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
      otherName: this.selectedItem?.otherName,
      formula: this.selectedItem?.formula,
      cas: this.selectedItem?.cas,
      icsc: this.selectedItem?.icsc,
      molarMass: this.selectedItem?.molarMass,
      density: this.selectedItem?.density,
      url: this.selectedItem?.url,
    };
  }


  //json return object for getter
  //This is the object name of the nodes: return
  //check the get all method and see what it returns and set to this object
  Key = 'allChemicalCompounds';

  baseOrderBy = ChemicalCompoundsOrderBy.IdDesc;

  override nodes$: Observable<Array<ChemicalCompound>>;

  constructor(protected override toastr: ToastrService, protected override route: ActivatedRoute, protected override http: HttpClient,
    private chemicalCompoundService: AllChemicalCompoundsGQL,
    private deleteChemicalCompoundService: DeleteChemicalCompoundGQL
    ,
    protected override router: Router,
    protected override fileService: FileService
  ) {
    super(fileService, router, toastr, route, http, chemicalCompoundService, deleteChemicalCompoundService);

    this.checkQueryParams();

    this.nodes$ = this.loadData(this.searchCriteria);
  }

  tableHeaders: TableHead<ChemicalCompoundsOrderBy>[] = [
    { type: 'string', key: 'name', label: "Name", asc: ChemicalCompoundsOrderBy.NameAsc, desc: ChemicalCompoundsOrderBy.NameDesc },
    { type: 'string', key: 'otherName', label: "Alias", asc: ChemicalCompoundsOrderBy.OtherNameAsc, desc: ChemicalCompoundsOrderBy.OtherNameAsc },
    { type: 'string', key: 'formula', label: "Formula", asc: ChemicalCompoundsOrderBy.FormulaAsc, desc: ChemicalCompoundsOrderBy.FormulaDesc },
    { type: 'string', key: 'cas', label: "CAS#", asc: ChemicalCompoundsOrderBy.CasAsc, desc: ChemicalCompoundsOrderBy.CasDesc },
    { type: 'string', key: 'icsc', label: "ICSC#", asc: ChemicalCompoundsOrderBy.IcscAsc, desc: ChemicalCompoundsOrderBy.IcscDesc },
    { type: 'number', key: 'molarMass', label: "Molar Mass", asc: ChemicalCompoundsOrderBy.MolarMassAsc, desc: ChemicalCompoundsOrderBy.MolarMassDesc },
    { type: 'number', key: 'density', label: "Density", asc: ChemicalCompoundsOrderBy.DensityAsc, desc: ChemicalCompoundsOrderBy.DensityDesc },
    { type: 'string', key: 'url', label: "URL", asc: ChemicalCompoundsOrderBy.UrlAsc, desc: ChemicalCompoundsOrderBy.UrlDesc },
  ]


  mapTableData(chemicalCompounds: ChemicalCompound[]): any[] {
    console.log(chemicalCompounds)
    return chemicalCompounds.map((chemicalCompound: ChemicalCompound) => {
      return {
        id: { url: 'api/calGasses', value: chemicalCompound.id } as TableField,
        name: { url: null, value: chemicalCompound?.name } as TableField,
        otherName: { url: null, value: chemicalCompound?.otherName } as TableField,
        formula: { url: null, value: chemicalCompound?.formula } as TableField,
        cas: { url: null, value: chemicalCompound?.cas } as TableField,
        icsc: { url: null, value: chemicalCompound?.icsc } as TableField,
        molarMass: { url: null, value: chemicalCompound.molarMass } as TableField,
        density: { url: null, value: chemicalCompound?.density } as TableField,
        url: { url: chemicalCompound?.url, value: chemicalCompound?.url } as TableField,
      };
    });
  }


}
