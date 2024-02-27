import { Component, OnInit, SimpleChanges } from "@angular/core";
import { HttpResponse } from "@angular/common/http";
import { PaginatedResult } from "../../../../models/utils/pagination";
import { SearchCriteria } from "../../../../models/utils/searchCriteria";
import { ModalWidth } from "../../../../models/enums/modalWidth.enum";
import { Assembly } from "../../../../models/entities/assembly";
import { CalGasService } from "../../../../services/calgas/calgas.service";
import { CalGas } from "../../../../models/entities/calgas";
import { TableField } from "../../../../models/utils/tableField";

@Component({
  selector: "app-calibrationgasses",
  templateUrl: "./calibrationgases.component.html",
})

export class CalibrationGasesComponent implements OnInit {

  calGasses: PaginatedResult<CalGas> = {
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
    data: [],
  };

  searchCriteria : SearchCriteria = {
    searchValue: "",
    orderBy: {
      orderByColumn: null,
      orderByDirection: null,
    }
  }

  isModalVisible: boolean = false;

  galGasTableData: any[] = [];

  ModalWidth = ModalWidth;

  modalWidth: ModalWidth = ModalWidth.Large;

  
  get calGasTableHeaders(): string[] {
    return ['gas', 'concentration', 'engineering_units', 'created', 'cdartikel', 'by'];
  }


  constructor(private galGasesService: CalGasService) { }

  mapCalGassesToTableData(calGasses: CalGas[]): any[] {
    console.log(calGasses)
    return calGasses.map((calgas: CalGas) => {
      return {
        id: { url: 'api/calGasses', value: calgas.id } as TableField,
        gas: { url: null, value: calgas?.gas?.name } as TableField,
        concentration: { url: null, value: calgas?.concentration } as TableField,
        engineering_units: { url: null, value: calgas?.engineering_units } as TableField,
        cdartikel: { url: null, value: calgas?.cdartikel } as TableField,
        created: { url: null, value: calgas.created } as TableField,
        by: { url: null, value: calgas?.owner?.initials } as TableField,
      };
    });
  }

  async ngOnInit(): Promise<void> {
    await this.loadCalGases();
  }

  async loadFilteredGalGasses(searchValue : any): Promise<void> {
    this.calGasses.page = 1;
    this.searchCriteria.searchValue = searchValue;
    await this.loadCalGases();
  }

  async loadCalGases(): Promise<void> {
    try {
      const response = await this.galGasesService.getCalGasses(this.calGasses.page, this.searchCriteria).toPromise();
      this.calGasses = response!;
      this.galGasTableData = this.mapCalGassesToTableData(this.calGasses.data);
    } catch (error) {
      console.error('Error fetching assemblies', error);
    }
  }

  async onPageChanged(page: number): Promise<void> {
    this.calGasses.page = page;
    await this.loadCalGases();
  }

  openModal(): void {
    this.isModalVisible = true;
  }

  closeModal(): void {
    console.log('test')
    this.isModalVisible = false;
  }
}
