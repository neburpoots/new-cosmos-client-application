import { Component, Input, Output, EventEmitter } from '@angular/core';
import { PaginatedResult } from '../../../models/utils/pagination';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css'],
  animations: [
    trigger("fadeInOut", [
      state("void", style({
        opacity: 0,
        transform: "translateX(-20px)",
      })),
      transition("void <=> *", animate(400)),
    ]),
  ],
})
export class PaginationComponent {

  @Input() paginatedResult: PaginatedResult<any> = {
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
    data: [],
  }

  @Output() pageChanged: EventEmitter<number> = new EventEmitter();

  constructor() {}

  onPageChange(pageNumber: number): void {
    this.pageChanged.emit(pageNumber);
  }

  getPages(): number[] {
    return Array(this.paginatedResult.totalPages).fill(0).map((_, index) => index + 1);
  }
}
