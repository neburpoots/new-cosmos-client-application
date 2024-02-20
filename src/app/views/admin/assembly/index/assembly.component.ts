import { Component, OnInit, SimpleChanges } from "@angular/core";
import { AssemblyService } from "../../../../services/assembly/assembly.service";
import { HttpResponse } from "@angular/common/http";
import { PaginatedResult } from "../../../../models/utils/pagination";
import { SearchCriteria } from "../../../../models/utils/searchCriteria";
import { ModalWidth } from "../../../../models/enums/modalWidth.enum";
@Component({
  selector: "app-assembly",
  templateUrl: "./assembly.component.html",
})

export class AssemblyComponent implements OnInit {

  assemblies: PaginatedResult<any> = {
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

  assembliesTableData: any[] = [];

  ModalWidth = ModalWidth;

  modalWidth: ModalWidth = ModalWidth.Large;

  
  get assembliesTableHeaders(): string[] {
    return ['id', 'code', 'checked', 'quantity', 'assemblyType']
  }


  constructor(private assemblyService: AssemblyService) { }

  mapAssembliesToTableData(assemblies: any[]): any[] {
    return assemblies.map((assembly) => {
      return {
        id: assembly.id,
        code: assembly.code,
        checked: assembly.checked,
        quantity: assembly.quantity,
        assemblyType: assembly.assemblyType.name,
      };
    });
  }

  async ngOnInit(): Promise<void> {
    await this.loadAssemblies();
  }

  async loadFilteredAssemblies(searchValue : any): Promise<void> {
    this.assemblies.page = 1;
    this.searchCriteria.searchValue = searchValue;
    await this.loadAssemblies();
  }

  async loadAssemblies(): Promise<void> {
    try {
      const response = await this.assemblyService.getAssemblies(this.assemblies.page, this.searchCriteria).toPromise();
      this.assemblies = response!;
      this.assembliesTableData = this.mapAssembliesToTableData(this.assemblies.data);
    } catch (error) {
      console.error('Error fetching assemblies', error);
    }
  }

  async onPageChanged(page: number): Promise<void> {
    this.assemblies.page = page;
    await this.loadAssemblies();
  }

  openModal(): void {
    this.isModalVisible = true;
  }

  closeModal(): void {
    this.isModalVisible = false;
  }
}
