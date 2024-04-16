
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
import { Router } from '@angular/router';
import { exportOptions } from "../../../models/utils/export";
import { FileService } from "../../../services/file/file.service";

@Component({
  selector: "app-base-entity",
  templateUrl: "./base-entity.component.html",
})
export abstract class BaseEntity<T> {

  abstract searchCriteria: any;

  abstract objectSingle: string;
  abstract objectPlural: string;

  totalResults: number = 0;

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
  isExportModalVisible: boolean = false;

  //table widths for inline editing and creating
  cellWidths: number[] = [];
  isInlineCreating: boolean = false;

  //This row is used by the filters incase of the filter not having any results 
  //this causes the filtering on the table to not work
  //at the first get this baseTableRow is set an can then be referenced even on a null value.
  baseTableRow: any = {};

  //this is the orderby that is used in case of removal of order by in table component
  abstract baseOrderBy: any;

  constructor(protected fileService: FileService, protected router: Router, protected toastr: ToastrService, protected route: ActivatedRoute, protected http: HttpClient,
    protected getService: Query<any, any>, protected deleteService: Mutation<any, any> | null,
  ) { }

  checkQueryParams(): void {
    this.route.queryParams.subscribe(params => {
      const editId = params['edit'];

      if (editId) {
        // Open your modal with the specified ID
        this.openEditModal(editId);
      }

      // const page = params['page'];
      const search = params['search'];

      // if (page) {
      //   this.searchCriteria.offset = (page - 1) * this.searchCriteria.limit;
      //   this.searchCriteria.page = page;
      // }

      console.log(search)
      if (search) {
        this.searchCriteria.search = search;
      }
    });
  }

  // Your setQueryParams method
  async setQueryParams(): Promise<void> {
    // Get the current query parameters
    const queryParams = { ...this.route.snapshot.queryParams };

    // Update the query parameters with new values
    queryParams['page'] = this.searchCriteria.page;
    queryParams['search'] = this.searchCriteria.search;

    // Navigate to the same route with updated query parameters
    this.router.navigate([], { queryParams: queryParams });
  }


  loadData(searchCriteria: any) {
    console.log(searchCriteria)
    return this.refetchTrigger.pipe(
      startWith(null),
      switchMap(() =>
        this.getService.watch(searchCriteria ? searchCriteria : this.searchCriteria, { fetchPolicy: 'no-cache' }).valueChanges.pipe
          (
            map(({ data }) => {
              console.log(data)
              let objects = data[this.Key];
              // this.searchCriteria.total = objects?.totalCount || 0;
              // this.searchCriteria.totalPage  s = Math.ceil(this.searchCriteria.total / this.searchCriteria.limit);
              this.totalResults = objects?.totalCount || 0;

              this.tableData = this.mapTableData(objects?.nodes);
              return objects?.nodes.filter((object: any) => object) || [];
            }
            )
          )));
  }

  async fetch(searchCriteria?: any) {
    console.log(searchCriteria)
    if (searchCriteria) {
      this.searchCriteria = searchCriteria;
    }
    this.setQueryParams();
    this.refetchTrigger.next();
  }

  // Call this method whenever you want to trigger a refetch
  refetchData() {
  }

  //cannot be abstract because it is not used in all components
  //sets the edit data for the form
  setEditData(): any { };

  //loads data for popover on assembly multivers
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

  exportData(exportOptions: exportOptions) {

    let query = this.searchCriteria;

    if (exportOptions.records === 'all') {
      query.first = this.totalResults;
      query.filters = { and: [] }
      query.offset = 0;
    }

    if (exportOptions.records === 'filtered') {
      query.first = this.totalResults;
      query.offset = 0;
    }

    this.getService.fetch(query).subscribe((response) => {
      let objects = response.data[this.Key];

      exportOptions.data = objects.nodes.map((object: any) => {
        let data: any = {};
        exportOptions.exportHeaders.forEach((header: any) => {
          data[header] = object[header];
        });
        return data;
      });

    });

  }

  setSelectedItem(id: number): void {
    this.nodes$.subscribe(value => {
      this.selectedItem = value.find((item: any) => item.id === id);

      this.setEditData();
    });
  }

  openExportModal(): void {
    this.isExportModalVisible = true;
  }

  closeExportModal(): void {
    this.isExportModalVisible = false;
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
    console.log(id)
    // this.setSelectedItem(id);

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
