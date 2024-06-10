
import { Component, Inject, Injectable, OnInit, SimpleChanges } from "@angular/core";
import { HttpClient, HttpResponse } from "@angular/common/http";

import { ToastrService } from "ngx-toastr";
import { TableHeader } from "../../../models/utils/tableHeader";
import { ActivatedRoute } from "@angular/router";
import { Apollo, Mutation, Query } from "apollo-angular";
import { Observable, Subject, catchError, map, of, startWith, switchMap } from "rxjs";
import { SearchFilters } from "../../../models/utils/searchFilters";
import { TableHead } from "../../../models/utils/tableHead";
import { start } from "@popperjs/core";
import { ModalWidth } from "../../../models/enums/modalWidth.enum";
import { Router } from '@angular/router';
import { ExportOptions } from "../../../models/utils/export";
import { FileService } from "../../../services/file/file.service";
import { AuthService } from "../../../services/authentication/auth.service";
import { ApolloError } from "@apollo/client/errors";

@Component({
  selector: "app-base-entity",
  templateUrl: "./base-entity.component.html",
})
export abstract class BaseEntity<T> {

  abstract searchCriteria: any;

  abstract objectSingle: string;
  abstract objectPlural: string;

  //override this to the route of the pdf
  pdfPrefix: string = 'api/'

  totalResults: number = 0;
  data: any[] = [];

  get objectSingleLowerCase(): string {
    return this.objectSingle!.toLowerCase();
  }

  get objectPluralLowerCase(): string {
    return this.objectPlural!.toLowerCase();
  }

  //This is the selected item that is used for editing and deleting.
  selectedItem: T | undefined;

  protected refetchTrigger: Subject<void> = new Subject<void>();

  abstract tableHeaders: TableHead<any>[];

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
  isExportExcelModalVisible: boolean = false;

  //table widths for inline editing and creating
  cellWidths: number[] = [];
  isInlineCreating: boolean = false;

  //this is the orderby that is used in case of removal of order by in table component
  abstract baseOrderBy: any;

  hasWritePermission: boolean = false;

  constructor(
    protected authService: AuthService,
    protected fileService: FileService, protected router: Router, protected toastr: ToastrService, protected route: ActivatedRoute, protected http: HttpClient,
    protected getService: Query<any, any>, protected deleteService: Mutation<any, any> | null,
  ) {
    this.route.url.subscribe(urlSegments => {
      const currentUrl = urlSegments.map(segment => segment.path).join('/');
      this.authService.checkWritePermission(currentUrl).subscribe(value => {
        this.hasWritePermission = value;
      });
    });


  }

  checkQueryParams(): void {
    this.route.queryParams.subscribe(params => {
      const editId = params['edit'];

      if (editId) {
        // Open your modal with the specified ID
        this.openEditModal(editId);
      }

      // const page = params['page'];
      const search = params['search'];

      const offset = params['offset'];
      if(offset) this.searchCriteria.offset = +offset;

      const first = params['first'];

      console.log(params)
      if(first) this.searchCriteria.first = +first;

      console.log(search)

    });
  }

  // Your setQueryParams method
  async setQueryParams(): Promise<void> {
    // Get the current query parameters
    const queryParams = { ...this.route.snapshot.queryParams };


    console.log(this.searchCriteria)
    // Update the query parameters with new values
    queryParams['offset'] = this.searchCriteria.offset;
    queryParams['first'] = this.searchCriteria.first;

    // Navigate to the same route with updated query parameters
    this.router.navigate([], { queryParams: queryParams });
  }

  loadData(searchCriteria: any): void {
    this.getService.fetch(searchCriteria ? searchCriteria : this.searchCriteria, { fetchPolicy: 'no-cache' }).subscribe(result => {
      console.log(result?.data[this.Key]?.nodes)
      this.data = result?.data[this.Key]?.nodes || [];
      this.totalResults = result?.data[this.Key]?.totalCount || 0;
      console.log(this.searchCriteria);
      this.tableData = this.mapTableData(result?.data[this.Key]?.nodes);
      console.log(this.tableData)
    });
  }

  async fetch(searchCriteria?: any) {
    if (searchCriteria) {
      this.searchCriteria = searchCriteria;
    }
    this.setQueryParams();
    this.loadData(searchCriteria);
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

  exportName(input: string) {
    // Replace spaces with underscores and convert to lowercase
    return input.replace(/\s+/g, '_').toLowerCase() + '_export';
  }

  downloadExcelFile(exportOptions: ExportOptions) {
    this.fileService.downloadExcel(exportOptions).subscribe(response => {
      // Initiate download
      const blob = new Blob([response], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${exportOptions.exportName}.xlsx`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    });
  }

  downloadCSVFile(exportOptions: ExportOptions) {
    this.fileService.downloadCSV(exportOptions).subscribe(response => {
      // Initiate download
      const blob = new Blob([response], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${exportOptions.exportName}.csv`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    });
  }

  //
  downloadPdf(id: number): void {
    this.fileService.downloadPdf(this.pdfPrefix, id).subscribe((data: Blob) => {
      // Create a Blob URL for the downloaded file
      const file = new Blob([data], { type: 'application/pdf' }); // Adjust the MIME type accordingly
      const fileUrl = URL.createObjectURL(file);

      // Create a download link and trigger a click event to download the file
      const link = document.createElement('a');
      link.href = fileUrl;
      link.download = `assembliesmultivers_${id}.pdf`; // Specify the desired file name
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  }


  async exportData(exportOptions: ExportOptions) {

    let query = { ...this.searchCriteria };

    //dynamically set the export name
    exportOptions.exportName = this.exportName(this.objectPluralLowerCase);
    console.log(exportOptions)
    //if all records then no offset no filter and first is total results
    if (exportOptions.records === 'all') {
      query.first = null;
      query.filter = { and: [] }
      query.offset = 0;
    }

    //if filtered result then no offset and first is total results
    if (exportOptions.records === 'filtered') {
      query.first = null;
      query.offset = 0;
    }

    console.log(query)

    this.getService.fetch(query).subscribe((response) => {
      let objects = response.data[this.Key];
      console.log(this.tableHeaders)
      exportOptions.data = objects.nodes.map((object: any) => {
        let data: any = {};
        this.tableHeaders.map(t => t.key).forEach((header: any) => {

          //This code looks at the table header key
          //it splits this on the $. This is also used for filtering
          //It loops over the object so that the correct embedded object can be found.
          //For instance {userByOwnerId$initials} will look for object.userByOwnerId.initials
          const dynamicObjectEmbedding: Record<string, any> = {};

          const embedding = header.split('$');

          let returnValue: any = {};
          for (let i = 0; i < embedding.length; i++) {
            if (i === 0) {
              returnValue = object[embedding[i]];
            } else {
              if (returnValue == null) {
                returnValue = null;
                break;
              }

              //if many to many relation then just stringify the array
              //The some is a filter type for many to many.
              //used for users table where groups is an array
              if (embedding[i] === 'some') {
                returnValue = JSON.stringify(returnValue['nodes']);
                break;
              }

              returnValue = returnValue[embedding[i]];
            }
          }
          // console.log(returnValue)

          data[header] = returnValue;
        });
        return data;
      });

      console.log(exportOptions)

      if (exportOptions.type === 'csv') {
        this.downloadCSVFile(exportOptions);
      } else if (exportOptions.type === 'excel') {
        this.downloadExcelFile(exportOptions);
      }
    });
  }


  setSelectedItem(id: number): void {

    this.selectedItem = this.data.find((item: any) => item.id === id);

    this.setEditData();
  }

  openExportModal(): void {
    this.isExportModalVisible = true;
  }

  openExportExcelModal(): void {
    this.isExportExcelModalVisible = true;
  }

  closeExcelExportModal(): void {
    this.isExportExcelModalVisible = false;
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


    this.deleteService.mutate(
      { id: deleteId },
      {
        update: cache => {
          cache.evict({ id: this.objectSingle + ' ' + id });
        }
      }
    ).pipe(
      catchError(error => {
        if (error instanceof ApolloError) {
          // Log the detailed error information
          console.error('ApolloError:', error);
    
          // Extract and handle specific error details
          const graphQLErrors = error.graphQLErrors;
          const networkError = error.networkError;
          const message = error.message;
    
          // Display error messages
          if (graphQLErrors && graphQLErrors.length > 0) {
            graphQLErrors.forEach(err => {
              this.toastr.error(err.message, 'GraphQL Error');
            });
          } else if (networkError) {
            this.toastr.error(networkError.message, 'Network Error');
          } else {
            this.toastr.error(message, 'Error');
          }
        } else {
          // Handle other types of errors
          this.toastr.error('An unexpected error occurred', 'Error');
          console.error('Unexpected Error:', error);
        }
        
        return of(null); // Return a fallback value or observable
      })
    ).subscribe((result) => {
      if(result) {
        this.fetch();
        this.closeDeleteModal();
        this.toastr.success(`${this.objectSingle} deleted successfully`, 'Success');
      }
    });


  }

}
