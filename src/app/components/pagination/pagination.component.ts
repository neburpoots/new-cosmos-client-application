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

  @Input() searchCriteria: any = {
    orderBy: [],
    first: 10,
    offset: 0,
  }

  @Input() totalResults: number = 0;

  @Output() paginationChange: EventEmitter<any> = new EventEmitter();

  constructor() {}

  onPageChange(pageNumber: number): void {
    // this.searchCriteria.page = pageNumber;
    this.searchCriteria.offset = (pageNumber - 1) * this.searchCriteria.first;
    console.log(this.searchCriteria)
    this.paginationChange.emit(this.searchCriteria);
  }

  limitChange(limit: number) {
    this.searchCriteria.offset = 0;
    this.searchCriteria.first = limit;
    this.paginationChange.emit(this.searchCriteria);
	}

  get pages(): number {
    return Math.ceil(this.totalResults / this.searchCriteria.first);
  }

  get currentPage(): number {
    return this.searchCriteria.offset === 0 ? 1 : Math.ceil((this.searchCriteria.offset + 1) / this.searchCriteria.first);
  }
  

  getPages(): number[] {
    return Array(this.searchCriteria.totalPages).fill(0).map((_, index) => index + 1);
  }
}
