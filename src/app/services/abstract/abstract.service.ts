// assembly.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PaginatedResult } from '../../models/utils/pagination';
import { SearchCriteria } from '../../models/utils/searchCriteria';
import AssemblyType from '../../models/entities/assemblyType';

@Injectable({
  providedIn: 'root',
})
export abstract class AbstractService<T> {

  private readonly url;

  constructor(private http: HttpClient) {
    this.url = 'http://localhost:8080';
  }

  get(prefix: string): Observable<PaginatedResult<T>> {
    return this.http.get<PaginatedResult<T>>(`${this.url}/${prefix}`);
  }

  delete(prefix : string, id: number): Observable<any> {
    return this.http.delete<any>(`${this.url}/${prefix}/${id}`);
  }
  
}
