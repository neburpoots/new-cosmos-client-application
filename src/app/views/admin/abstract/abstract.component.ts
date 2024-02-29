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
      orderByDirection: 'asc',
    }
  }

  isCreateModalVisible: boolean = false;
  isEditModalVisible: boolean = false;
  isDeleteModalVisible: boolean = false;
  isViewModalVisible: boolean = false;


  tableData: any[] = [];

  ModalWidth = ModalWidth;

  modalWidth: ModalWidth = ModalWidth.Large;

  abstract tableHeaders: string[];

  constructor(protected toastr: ToastrService, protected abstractService: AbstractService<T>) {
  }

  abstract mapTableData(data: any[]): any[];

  //cannot be abstract because it is not used in all components
  setEditData(): any {};

  loadDetailData(id : any): void {};

  abstract createUrlParams(): string;

  async ngOnInit(): Promise<void> {
    await this.loadItems();
  }

  async loadFilteredItems(searchCriteria : SearchCriteria): Promise<void> {
    this.data.page = 1;
    this.searchCriteria.searchValue = searchCriteria.searchValue;
    this.searchCriteria.orderBy = searchCriteria.orderBy;
    // Assuming you want to use the `test` parameter as well, you can do something with it here...
    await this.loadItems();
  }

  async loadItems(): Promise<void> {
    try {
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

  async onPageChanged(page: number): Promise<void> {
    this.data.page = page;
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
}
