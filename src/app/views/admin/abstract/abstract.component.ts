import { Component, OnInit, SimpleChanges } from "@angular/core";
import { HttpResponse } from "@angular/common/http";
import { PaginatedResult } from "../../../models/utils/pagination";
import { CalGas } from "../../../models/entities/calgas";
import { SearchCriteria } from "../../../models/utils/searchCriteria";
import { ModalWidth } from "../../../models/enums/modalWidth.enum";
import { CalGasService } from "../../../services/calgas/calgas.service";
import { IAbstractComponent } from "../../../models/interface/IAbstractComponent";
import { AbstractService } from "../../../services/abstract/abstract.service";
import { ToastrService } from "ngx-toastr";
import { TableHeader } from "../../../models/utils/tableHeader";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-abstractview",
  templateUrl: "./abstract.component.html",
})

export abstract class AbstractComponent<T> implements OnInit, IAbstractComponent<T> {

  //This is the selected item that is used for editing and deleting.
  selectedItem: T | undefined;

  //These are the object names that can be used dynamically.
  abstract objectSingle: string;
  abstract objectPlural: string;

  get objectSingleLowerCase(): string {
    return this.objectSingle!.toLowerCase();
  }

  get objectPluralLowerCase(): string {
    return this.objectPlural!.toLowerCase();
  }


  //This is the data that is used for the table.
  data: PaginatedResult<T> = {
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
    data: [],
  };

  //this will be the the api calls
  url: string = '';

  searchCriteria: SearchCriteria = {
    searchValue: "",
    orderBy: {
      orderByColumn: 'id',
      orderByDirection: 'desc',
    }
  }

  isCreateModalVisible: boolean = false;
  isEditModalVisible: boolean = false;
  isDeleteModalVisible: boolean = false;
  isViewModalVisible: boolean = false;


  tableData: any[] = [];

  ModalWidth = ModalWidth;

  modalWidth: ModalWidth = ModalWidth.Large;

  //table widths for inline editing and creating
  cellWidths: number[] = [];
  isInlineCreating: boolean = false;


  abstract tableHeaders: TableHeader[];

  constructor(protected toastr: ToastrService, protected abstractService: AbstractService<T>, protected route: ActivatedRoute) {
  }

  abstract mapTableData(data: any[]): any[];

  //cannot be abstract because it is not used in all components
  setEditData(): any {};

  loadDetailData(id : any): void {};

  abstract createUrlParams(): string;

  async checkQueryParams(): Promise<void> {
    this.route.queryParams.subscribe(params => {
      const editId = params['edit'];
  
      if (editId) {
        // Open your modal with the specified ID
        this.openEditModal(editId);
      }

      const page = params['page'];

      if (page) {
        this.data.page = page;
      }
    });
  }

  async ngOnInit(): Promise<void> {
    await this.checkQueryParams();
    await this.loadItems();
  }

  async loadFilteredItems(searchCriteria : SearchCriteria): Promise<void> {
    this.data.page = 1;
    this.searchCriteria.searchValue = searchCriteria.searchValue;
    this.searchCriteria.orderBy = searchCriteria.orderBy;
    // Assuming you want to use the `test` parameter as well, you can do something with it here...
    await this.loadItems();
  }

  async loadItems(searchCriteria?: SearchCriteria): Promise<void> {
    try {

      //allow for optional search criteria
      if(searchCriteria){
        this.searchCriteria = searchCriteria;
      }

      const response = await this.abstractService.get(await this.createUrlParams()).toPromise();
      this.data = response!;
      this.tableData = this.mapTableData(this.data.data);
    } catch (error) {
      this.toastr.error(`Error fetching ${this.objectPluralLowerCase}`, 'Error');
    }
  }

  async delete(input: any): Promise<void> {
    this.abstractService.delete(this.url, input.id).subscribe((response: HttpResponse<any>) => {
      this.loadItems();
      this.closeDeleteModal();
      this.toastr.success(`${this.objectSingle} deleted successfully`, 'Success');
    }, (error) => {
      this.toastr.error(`Error deleting ${this.objectSingleLowerCase}`, 'Error');
      console.log(error);
    });
  }

  async onPaginationChange(result: PaginatedResult<T>): Promise<void> {
    this.data = result;
    await this.loadItems();
    
  }

  async openEditModal(id: number): Promise<void> {
    await this.setSelectedItem(id);
    await this.setEditData();
    this.isEditModalVisible = true;
  }

  closeEditModal(): void {
    this.selectedItem = undefined;
    this.isEditModalVisible = false;
  }

  setSelectedItem(id: number): void {
    this.selectedItem = this.data.data.find((item: any) => item.id === id);
  }

  openDeleteModal(id: number): void {
    this.setSelectedItem(id);
    this.isDeleteModalVisible = true;
  }

  closeDeleteModal(): void {
    this.isDeleteModalVisible = false;
  }

  openCreateModal(): void {
    this.isCreateModalVisible = true;
  }

  closeCreateModal(): void {
    this.isCreateModalVisible = false;
  }

  openViewModal(id: number): void {
    this.setSelectedItem(id);
    this.loadDetailData(id);
    this.isViewModalVisible = true;
  }

  closeViewModal(): void {
    this.isViewModalVisible = false;
  }

  //sets the column widths for the table for inline editing and creating
  setTableWidths(cellWidths: number[]): void {
    console.log(cellWidths)
    this.cellWidths = cellWidths;
  }

  toggleInlineCreating() {
    this.isInlineCreating = !this.isInlineCreating;
  }

}
