import { Component, Input, Output, EventEmitter } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { SearchFilters } from '../../models/utils/searchFilters';

@Component({
  selector: 'app-pagination-component',
  templateUrl: './pagination.component.html',
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
export class PaginationTableComponent {

  @Input() searchCriteria: SearchFilters = {
    orderBy: [],
    search: '',
    limit: 10,
    offset: 0,
    totalPages: 0,
    total: 0,
    page: 1
  }

  @Output() paginationChange: EventEmitter<SearchFilters> = new EventEmitter();

  constructor() {}

  onPageChange(pageNumber: number): void {
    this.searchCriteria.page = pageNumber;
    this.searchCriteria.offset = (pageNumber - 1) * this.searchCriteria.limit;
    this.paginationChange.emit(this.searchCriteria);
  }

  limitChange(limit: number) {
    this.searchCriteria.offset = 0;
    this.searchCriteria.page = 1;
    this.searchCriteria.limit = limit;
    this.paginationChange.emit(this.searchCriteria);
	}

  getPages(): number[] {
    return Array(this.searchCriteria.totalPages).fill(0).map((_, index) => index + 1);
  }
}
