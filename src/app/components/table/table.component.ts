import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from "@angular/core";
import { trigger, state, style, animate, transition } from "@angular/animations";
import { faCoffee, faDeleteLeft, faFilePdf, faFilter, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { SatPopover } from "@ncstate/sat-popover";
import dayjs from "dayjs";
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { ToastrService } from "ngx-toastr";
import { TableHeader } from "../../models/utils/tableHeader";
import { TableHead } from "../../models/utils/tableHead";
import { SearchFilters } from "../../models/utils/searchFilters";
import { FilterBuilder, filterInput, filterTypes } from "../../models/filters/filterBuilder";
dayjs.extend(customParseFormat);

@Component({
  selector: "table-component",
  templateUrl: "./table.component.html",
  animations: [
    trigger("fadeInOut", [
      state("void", style({
        opacity: 0,
        transform: "translateX(-20px)",
      })),
      transition("void <=> *", animate(300)),
    ]),
  ],
})
export class TableComponent implements OnInit {
  @Input() columns: TableHead<any>[] = [];
  @Input() data: any[] = [];
  @Input() title: string = "";
  @Input() object: string = "";
  @Input() inline_selector: string = "";

  //basetablerow used by filtering
  //The filtering looks at this row for the types of filters.
  @Input() baseTableRow: any = {};

  // @Input() paginationInfo: any = {};
  @Input() isEditable: boolean = false;
  @Input() isDeletable: boolean = false;
  @Input() isCreatable: boolean = true;
  @Input() isViewable: boolean = false;
  @Input() baseOrderBy: any;
  @Input() isPdf: boolean = false;
  @Input() detailPagePrefix: string = "";
  @Input() isInlineCreating: boolean = false;
  @Input() color: string = "light";
  @Input() searchCriteria: any = {
    orderBy: [],
    search: "",
    limit: 10,
    offset: 0,
    totalPages: 0,
    total: 0,
    page: 0,
  };
  @Input() popoverComponent: any; // 'any' is used for flexibility; you can use a more specific type if needed
  @Output() pdf = new EventEmitter<number>();
  // // @Input() criteriaChangeFunction: Function = () => { console.log("test")};
  @Output() searchCriteriaChange: EventEmitter<any> = new EventEmitter<any>();
  // @Output()
  @Output() create = new EventEmitter<void>();
  @Output() edit = new EventEmitter<number>();
  @Output() delete = new EventEmitter<number>();
  @Output() view = new EventEmitter<number>();
  @Output() closeView = new EventEmitter<void>();

  @Output() toggleInlineCreating = new EventEmitter<void>();

  @Output() setTableWidths = new EventEmitter<number[]>();

  // @ViewChild('popover') popover: SatPopover | undefined;

  faMagnifyingGlass = faMagnifyingGlass;
  faFilePdf = faFilePdf;
  faFilter = faFilter;
  faDeleteLeft = faDeleteLeft

  filterBuilder = new FilterBuilder();

  //totalwidth of all columns used for inline editing
  totalWidth: number = 0;

  rangeInput: string = '';

  constructor(private toastr: ToastrService) { }

  ngOnInit(): void {
    console.log(this.columns);
    console.log(this.baseTableRow);
  }


  formattedDate(date: string): string {
    const hasTime = date.includes('00:00'); // Check if the date string includes a time component
    const isTime = date.includes('T'); // Check if the date string includes a time component

    if (!hasTime && isTime) {
      return dayjs(date).format('DD-MM-YYYY HH:mm:ss'); // Include time in the format
    }
    return dayjs(date).format('DD-MM-YYYY'); // Format without time
  }

  isValidDate(date: string): boolean {
    const validFormats = ['YYYY-MM-DD HH:mm:ss', 'YYYY-MM-DDTHH:mm:ss.SSSZ'];
    return dayjs(date, validFormats, false).isValid();
  }

  removeOrderBy(event: any): void {

    if (this.isInlineCreating) {
      this.toastr.error('Please finish creating the new item before sorting', 'Error');
      return;
    }

    this.searchCriteria.orderBy = this.baseOrderBy;

    this.searchCriteriaChange.emit(this.searchCriteria);
    event.stopPropagation();
  }

  openCreateModal(): void {
    this.create.emit();
  }

  openEditModal(id: number): void {
    if (this.isInlineCreating) {
      this.toastr.error('Please finish creating the new item before sorting', 'Error');
      return;
    }
    this.edit.emit(id);
  }

  openDeleteModal(id: number): void {
    this.delete.emit(id);
  }


  openViewModal(id: number): void {
    console.log('test')
    this.view.emit(id);
  }


  closeViewModal(): void {
    this.closeView.emit();
  }

  isBoolean(value: any): boolean {
    return typeof value === 'boolean';
  }

  isObject(value: any): boolean {
    return typeof value === 'object' && value !== null;
  }


  orderBy(header: any) {

    if (this.isInlineCreating) {
      this.toastr.error('Please finish creating the new item before sorting', 'Error');
      return;
    }

    this.searchCriteria.offset = 0;
    this.searchCriteria.page = 1;

    if (this.searchCriteria.orderBy.includes(header.asc)) {
      this.searchCriteria.orderBy = [header.desc];
    }
    else {
      this.searchCriteria.orderBy = [header.asc];
    }
    this.searchCriteriaChange.emit(this.searchCriteria);

    console.log(this.searchCriteria)

  }


  downloadPdf(id: number): void {
    this.pdf.emit(id);
  }
  
  //called on search
  async loadData(searchString: string): Promise<any> {

    if(this.filterBuilder.columns.length === 0) {
      await this.filterBuilder.setUpColumnTypes(this.columns, this.baseTableRow, this.isValidDate);	
    }

    this.filterBuilder.globalSearch = searchString;

    this.applyFilters();
  }

  // //function to calculate table width is needed for inline editing.
  async setInlineCreating(): Promise<void> {

    this.toggleInlineCreating.emit();

    // Assuming you have a table element with an id 'myTable'
    const table = document.getElementById('myTable');

    if (table) {

      // Assuming the first row contains the headers and the actual data starts from the second row
      const rows = table.getElementsByTagName('tr');

      if (rows.length < 2) return;

      //first row header second row edit third row data... I think
      const firstRow = rows[2];
      const cells = firstRow.getElementsByTagName('td');

      // Array to store the width of each td
      const cellWidths = [];

      for (let i = 0; i < cells.length; i++) {
        // Get the width of each td and push it to the array
        const width = cells[i].offsetWidth;
        cellWidths.push(width);
      }
      if (this.totalWidth == 0) this.totalWidth = cellWidths.reduce((a, b) => a + b, 0);

      this.setTableWidths.emit(cellWidths);
    }
  }

  //Runs when column is selected in filter
  async selectColumnFilter(columnName: any, filterIndex: number): Promise<void> {

    //checks if the column types are already set
    if(this.filterBuilder.columns.length === 0) {
      await this.filterBuilder.setUpColumnTypes(this.columns, this.baseTableRow, this.isValidDate);	
    }

    //Onchange set to null for the type of filter and the value
    this.filterBuilder.filterInputs[filterIndex].filterTypes = null;
    this.filterBuilder.filterInputs[filterIndex].selectedFilterType = null;
    this.filterBuilder.filterInputs[filterIndex].value = '';
    this.filterBuilder.filterInputs[filterIndex].column = null;
    this.filterBuilder.filterInputs[filterIndex].range = [];

    //find the column that is selected from the tableheaders
    let selectedColumn = await this.filterBuilder.columns.find((column) => column.key === columnName);

    let options = await this.filterBuilder.getFilterOptionsForType(selectedColumn?.type as string);

    this.filterBuilder.filterInputs[filterIndex].column = columnName;
    this.filterBuilder.filterInputs[filterIndex].filterTypes = options;
  }

  async selectTypeFilter(selectTypeFilter: number, filterInput: filterInput): Promise<void> {
    
    let selectedFilterType = filterTypes.find((filterType) => filterType.id === selectTypeFilter);

    //if filter type is changed then remove the current range
    filterInput.range = [];


    filterInput.selectedFilterType = selectedFilterType;
  }

  //adds a new filter
  async addInputFilter(): Promise<void> {
    this.filterBuilder.addFilterInput();
  }

  //removes a single filter
  async deleteFilterInput(id: number): Promise<void> {
    this.filterBuilder.deleteFilterInput(id);
  }

  //removes all filters
  async removeFilters(): Promise<void> {
    this.filterBuilder.filterInputs = [];
    this.filterBuilder.currentFilters = [];
    this.filterBuilder.currentFilterInputs = [];

    this.searchCriteria.filter = { and: []};

    this.searchCriteriaChange.emit(this.searchCriteria);

  }

  async applyFilters(): Promise<void> {
    try {

      let filters = await this.filterBuilder.getFilters();

      //global search is done outside of standard filtering
      let globalSearch = await this.filterBuilder.handleGlobalSearch();

      let searchObject = {
        and: [...filters]
      }

      //global search is not null otherwise it should be ignored
      if(globalSearch) {
        searchObject.and.push(globalSearch);
      }

      this.searchCriteria.filter = searchObject;

      console.log(this.searchCriteria.filter)

      this.searchCriteriaChange.emit(this.searchCriteria);

    } catch (error : any) {
      this.toastr.error(error?.message ? error?.message : 'Filters are incorrect', 'Error');
    }

  }

  //adds and item to the range of items
  async addtoFilterInputRange(filterInput: filterInput, value: string): Promise<void> {

    if(value === '') {
      this.toastr.error('Please enter a value', 'Error');
      return;
    }

    this.rangeInput = '';

    filterInput.range.push(value);
  }

  //deletes an item from the range of items
  async deleteFilterInputRange(filterInput: filterInput, index: number): Promise<void> {
    filterInput.range.splice(index, 1);
  }

  async recoverSavedFilters(): Promise<void> {
    this.filterBuilder.filterInputs = this.filterBuilder.currentFilterInputs;
  }

}