import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from "@angular/core";
import { trigger, state, style, animate, transition } from "@angular/animations";
import { SearchCriteria } from "../../../models/utils/searchCriteria";
import { faCoffee, faFilePdf, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { SatPopover } from "@ncstate/sat-popover";
import dayjs from "dayjs";
import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(customParseFormat);

@Component({
  selector: "app-card-table",
  templateUrl: "./card-table.component.html",
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
export class CardTableComponent implements OnInit {
  @Input() columns: string[] = [];
  @Input() data: any[] = [];
  @Input() title: string = "";
  @Input() object: string = "";
  @Input() paginationInfo: any = {};
  @Input() isEditable: boolean = false;
  @Input() isDeletable: boolean = false;
  @Input() isCreatable: boolean = true;
  @Input() isViewable: boolean = false;
  @Input() isPdf: boolean = false;
  @Input() detailPagePrefix: string = "";
  @Input() color: string = "light";
  @Input() searchCriteria: SearchCriteria =
    {
      searchValue: "",
      orderBy: { orderByColumn: null, orderByDirection: null }
    };
  @Input() popoverComponent: any; // 'any' is used for flexibility; you can use a more specific type if needed
  @Output() pdf = new EventEmitter<number>();
  // @Input() criteriaChangeFunction: Function = () => { console.log("test")};
  @Output() searchCriteriaChange: EventEmitter<any> = new EventEmitter<any>();
  @Output() 
  @Output() create = new EventEmitter<void>();
  @Output() edit = new EventEmitter<number>();
  @Output() delete = new EventEmitter<number>();
  @Output() view = new EventEmitter<number>();
  @Output() closeView = new EventEmitter<void>();

  @ViewChild('popover') popover: SatPopover | undefined;

  faMagnifyingGlass = faMagnifyingGlass;
  faFilePdf = faFilePdf;


  constructor() { }

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
  
  loadData(searchString : string) : any {
    this.searchCriteria.searchValue = searchString;

    this.searchCriteriaChange.emit(this.searchCriteria);
  }

  removeOrderBy(event : any): void {
    console.log('test')
    this.searchCriteria.orderBy.orderByColumn = 'id';

    this.searchCriteriaChange.emit(this.searchCriteria);
    event.stopPropagation();

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

  isDate(value: any): boolean {
    return false;

  }
  ngOnInit(): void { }

  isObject(value: any): boolean {
    return typeof value === 'object' && value !== null;
  }

  orderByColumn(column: string): void {
    if (this.searchCriteria.orderBy.orderByColumn === column) {
      this.searchCriteria.orderBy.orderByDirection = this.searchCriteria.orderBy.orderByDirection === "asc" ? "desc" : "asc";
    } else {
      this.searchCriteria.orderBy.orderByColumn = column;
      this.searchCriteria.orderBy.orderByDirection = "asc";
    }
    this.searchCriteriaChange.emit(this.searchCriteria);
  }

  downloadPdf(id: number): void {
    this.pdf.emit(id);
  }
}