import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-card-table",
  templateUrl: "./card-table.component.html",
})
export class CardTableComponent implements OnInit {
  @Input() columns: string[] = [];
  @Input() data: any[] = [];
  @Input() title: string = "";
  @Input() paginationInfo: any = {};
  @Input() color: string = "light";

  

  constructor() {}

  ngOnInit(): void {}

  isObject(value: any): boolean {
    return typeof value === 'object' && value !== null;
  }
}