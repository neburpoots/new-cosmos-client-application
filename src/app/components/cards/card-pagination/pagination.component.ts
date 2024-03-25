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

  @Output() paginationChange: EventEmitter<PaginatedResult<any>> = new EventEmitter();

  constructor() {}

  onPageChange(pageNumber: number): void {
    this.paginatedResult.page = pageNumber;
    this.paginationChange.emit(this.paginatedResult);
  }

  limitChange(limit: number) {
    this.paginatedResult.limit = limit;
    this.paginationChange.emit(this.paginatedResult);
	}

  getPages(): number[] {
    return Array(this.paginatedResult.totalPages).fill(0).map((_, index) => index + 1);
  }
}
