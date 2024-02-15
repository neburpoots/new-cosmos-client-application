import { Component, OnInit, SimpleChanges } from "@angular/core";
import { AssemblyService } from "../../../../services/assembly/assembly.service";
import { HttpResponse } from "@angular/common/http";
import { PaginatedResult } from "../../../../models/utils/pagination";

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

  assembliesTableData: any[] = [];

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

  get assembliesTableHeaders(): string[] {
    return ['id', 'code', 'checked', 'quantity', 'assemblyType']
  }


  constructor(private assemblyService: AssemblyService) { }

  async ngOnInit(): Promise<void> {
    await this.loadAssemblies();
  }

  async loadAssemblies(): Promise<void> {
    try {
      const response = await this.assemblyService.getAssemblies(this.assemblies.page).toPromise();
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
}
