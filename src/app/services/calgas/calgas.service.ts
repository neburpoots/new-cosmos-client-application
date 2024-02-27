
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { PaginatedResult } from '../../models/utils/pagination';
import { SearchCriteria } from '../../models/utils/searchCriteria';
import { CalGas } from '../../models/entities/calgas';

@Injectable({
  providedIn: 'root',
})
export class CalGasService {
  private apiUrl = 'http://localhost:8080'; // Replace with your actual API URL

  constructor(private http: HttpClient) {}

  handleError(operation = 'operation') {
    return (error: any) => {
      console.error(error);
      return [];
    };
  }
  
  createCalGas(calgasData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/api/calgas`, calgasData);
  }

  getCalGasses(page: number = 1, searchCriteria : SearchCriteria): Observable<PaginatedResult<CalGas>> {
    console.log('Fetching calgases');
    console.log(`${this.apiUrl}/api/calgas?page=${page}&searchQuery=${searchCriteria.searchValue}`)
    return this.http.get<PaginatedResult<CalGas>>(`${this.apiUrl}/api/calgas?page=${page}&searchQuery=${searchCriteria.searchValue}`);
  }
}
