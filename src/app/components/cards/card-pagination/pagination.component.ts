import { Component, Input, Output, EventEmitter } from '@angular/core';
import { PaginatedResult } from '../../../models/utils/pagination';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
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
