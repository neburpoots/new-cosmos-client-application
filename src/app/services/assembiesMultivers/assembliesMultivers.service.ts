// assembly.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { PaginatedResult } from '../../models/utils/pagination';
import { SearchCriteria } from '../../models/utils/searchCriteria';


@Injectable({
  providedIn: 'root',
})
export class AssembliesMultivers {
  private apiUrl = 'http://localhost:8080'; // Replace with your actual API URL

  constructor(private http: HttpClient) {}

  getAssemblyLinesForOrder(id: number): Observable<AssembliesMultivers[]> {
    return this.http.get<AssembliesMultivers[]>(`${this.apiUrl}/api/assembliesmultivers/${id}`);
  }
}
