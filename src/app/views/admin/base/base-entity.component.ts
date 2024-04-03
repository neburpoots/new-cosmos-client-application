
import { Component, Inject, Injectable, OnInit, SimpleChanges } from "@angular/core";
import { HttpClient, HttpResponse } from "@angular/common/http";

import { ToastrService } from "ngx-toastr";
import { TableHeader } from "../../../models/utils/tableHeader";
import { ActivatedRoute } from "@angular/router";
import { Apollo, Mutation, Query } from "apollo-angular";
import { Observable, Subject, map, startWith, switchMap } from "rxjs";
import { SearchFilters } from "../../../models/utils/searchFilters";
import { TableHead } from "../../../models/utils/tableHead";
import { start } from "@popperjs/core";
import { ModalWidth } from "../../../models/enums/modalWidth.enum";

@Component({
  selector: "app-base-entity",
  templateUrl: "./base-entity.component.html",
})
export abstract class BaseEntity<T> {

  abstract searchCriteria: SearchFilters;

  abstract objectSingle: string;
  abstract objectPlural: string;

  get objectSingleLowerCase(): string {
    return this.objectSingle!.toLowerCase();
  }

  get objectPluralLowerCase(): string {
    return this.objectPlural!.toLowerCase();
  }

  //This is the selected item that is used for editing and deleting.
  selectedItem: T | undefined;

  abstract nodes$: Observable<Array<T>>;



  protected refetchTrigger: Subject<void> = new Subject<void>();


  abstract tableHeaders: TableHead<any>[];

  // abstract orderByEnum: any;

  abstract Key: string;

  abstract mapTableData(data: any[]): any[];

  tableData: any[] = [];

  ModalWidth = ModalWidth;

  modalWidth: ModalWidth = ModalWidth.Large;

  //allmodals
  isCreateModalVisible: boolean = false;
  isEditModalVisible: boolean = false;
  isDeleteModalVisible: boolean = false;
  isViewModalVisible: boolean = false;

  //table widths for inline editing and creating
  cellWidths: number[] = [];
  isInlineCreating: boolean = false;

  //this is the orderby that is used in case of removal of order by in table component
  abstract baseOrderBy: any;


  constructor(protected toastr: ToastrService, protected route: ActivatedRoute, protected http: HttpClient,
    protected getService: Query<any, any>, protected deleteService: Mutation<any, any> | null
  ) { }

  loadData(searchCriteria: SearchFilters) {
    return this.refetchTrigger.pipe(
      startWith(null),
      switchMap(() =>
        this.getService.watch(searchCriteria ? searchCriteria : this.searchCriteria, { fetchPolicy: 'no-cache' }).valueChanges.pipe
          (
            map(({ data }) => {
              let objects = data[this.Key];
              this.searchCriteria.total = objects?.totalCount || 0;
              this.searchCriteria.totalPages = Math.ceil(this.searchCriteria.total / this.searchCriteria.limit);

              this.tableData = this.mapTableData(objects?.nodes);
              return objects?.nodes.filter((object: any) => object) || []
            }
            )
          )));
  }

  async fetch(searchCriteria?: SearchFilters) {
    if (searchCriteria) {
      this.searchCriteria = searchCriteria;
    }
    this.refetchTrigger.next();
  }

  // Call this method whenever you want to trigger a refetch
  refetchData() {
  }

  //cannot be abstract because it is not used in all components
  setEditData(): any { };

  loadDetailData(id: any): void { };

  async openEditModal(id: number): Promise<void> {
    await this.setSelectedItem(id);
    console.log(this.selectedItem)
    this.isEditModalVisible = true;
  }

  closeEditModal(): void {
    this.selectedItem = undefined;
    this.isEditModalVisible = false;
  }

  setSelectedItem(id: number): void {
    this.nodes$.subscribe(value => {
      this.selectedItem = value.find((item: any) => item.id === id);
      this.setEditData();
    });
  }

  openDeleteModal(id: number): void {
    this.setSelectedItem(id);
    this.isDeleteModalVisible = true;
  }

  closeDeleteModal(): void {
    console.log('test')
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


  async delete(id: any): Promise<void> {

    if (this.deleteService == null) {
      return;
    }
    let deleteId = id.id;

    this.deleteService.mutate
      (
        { id: deleteId },
        {
          update: cache => {
            cache.evict({ id: this.objectSingle + ' ' + id });
          }
        }
      ).subscribe(() => {
        this.fetch();
        this.closeDeleteModal();
        this.toastr.success(`${this.objectSingle} deleted successfully`, 'Success');
      });
  }

}
