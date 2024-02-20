import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { trigger, state, style, animate, transition } from "@angular/animations";
import { SearchCriteria } from "../../../models/utils/searchCriteria";

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
  @Input() paginationInfo: any = {};
  @Input() color: string = "light";
  @Input() searchCriteria: SearchCriteria =
    {
      searchValue: "",
      orderBy: { orderByColumn: null, orderByDirection: null }
    };
  // @Input() criteriaChangeFunction: Function = () => { console.log("test")};
  @Output() searchCriteriaChange: EventEmitter<string> = new EventEmitter<string>();
  @Output() create = new EventEmitter<void>();
  @Output() edit = new EventEmitter<number>();
  @Output() delete = new EventEmitter<number>();

  constructor() { }
  
  loadData(searchString : string) : any {
    console.log(searchString);
    this.searchCriteriaChange.emit(searchString);
  }

  openCreateModal(): void {
    this.create.emit();
  }

  ngOnInit(): void { }

  isObject(value: any): boolean {
    return typeof value === 'object' && value !== null;
  }
}