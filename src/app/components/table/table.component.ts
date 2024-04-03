import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from "@angular/core";
import { trigger, state, style, animate, transition } from "@angular/animations";
import { faCoffee, faFilePdf, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { SatPopover } from "@ncstate/sat-popover";
import dayjs from "dayjs";
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { ToastrService } from "ngx-toastr";
import { TableHeader } from "../../models/utils/tableHeader";
import { TableHead } from "../../models/utils/tableHead";
import { SearchFilters } from "../../models/utils/searchFilters";
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
export class TableComponent {
  @Input() columns: TableHead<any>[] = [];
  @Input() data: any[] = [];
  @Input() title: string = "";
  @Input() object: string = "";
  @Input() inline_selector: string = "";
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
  @Input() searchCriteria: SearchFilters = {
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

  //totalwidth of all columns used for inline editing
  totalWidth: number = 0;

  constructor(private toastr: ToastrService) { }

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

    if(this.isInlineCreating) {
      this.toastr.error('Please finish creating the new item before sorting', 'Error');
      return;
    }

    this.searchCriteria.orderBy = this.baseOrderBy;

    this.searchCriteriaChange.emit(this.searchCriteria);
    event.stopPropagation();
  }


  async loadData(searchString: string): Promise<any> {
    this.searchCriteria.search = searchString;

    this.searchCriteriaChange.emit(this.searchCriteria);
  }

  openCreateModal(): void {
    this.create.emit();
  }

  openEditModal(id: number): void {
    this.edit.emit(id);
  }

  openDeleteModal(id: number): void {
    this.delete.emit(id);
  }


  openViewModal(id: number): void {
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

    if(this.isInlineCreating) {
      this.toastr.error('Please finish creating the new item before sorting', 'Error');
      return;
    }

		this.searchCriteria.offset = 0;
		console.log(header.asc)
		console.log(this.searchCriteria.orderBy)
		if (this.searchCriteria.orderBy.includes(header.asc)) {
			this.searchCriteria.orderBy = [header.desc];
		}
		else {
			this.searchCriteria.orderBy = [header.asc];
		}
		this.searchCriteriaChange.emit(this.searchCriteria);

		console.log(this.searchCriteria)

	}

  // orderByColumn(column: string): void {

  //   //Disable sorting on inline editing since this will change the column sizing
  //   //Future fix would have to rescale the columns after the data is received 
  //   if(this.isInlineCreating) {
  //     this.toastr.error('Please finish creating the new item before sorting', 'Error');
  //     return;
  //   }

  //   //toggles the order by direction onclick of the same column
  //   if (this.searchCriteria.orderBy.orderByColumn === column) {
  //     this.searchCriteria.orderBy.orderByDirection = this.searchCriteria.orderBy.orderByDirection === "asc" ? "desc" : "asc";
  //   } else {
  //     this.searchCriteria.orderBy.orderByColumn = column;
  //     this.searchCriteria.orderBy.orderByDirection = "asc";
  //   }

  //   this.searchCriteriaChange.emit(this.searchCriteria);
  // }

  downloadPdf(id: number): void {
    this.pdf.emit(id);
  }


  // //function to calculate table width is needed for inline editing.
  async setInlineCreating() : Promise<void> {

    this.toggleInlineCreating.emit();

    // Assuming you have a table element with an id 'myTable'
    const table = document.getElementById('myTable');

    if (table) {

      // Assuming the first row contains the headers and the actual data starts from the second row
      const rows = table.getElementsByTagName('tr');

      if(rows.length < 2) return;

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
      if(this.totalWidth == 0)  this.totalWidth = cellWidths.reduce((a, b) => a + b, 0);
     
      this.setTableWidths.emit(cellWidths);
    }
  }
}