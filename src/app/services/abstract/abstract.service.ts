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

  create(prefix : string, data: T): Observable<any> {
    return this.http.post<any>(`${this.url}/${prefix}`, data);
  }

  update(prefix : string, id: number, data: T): Observable<any> {
    return this.http.put<any>(`${this.url}/${prefix}/${id}`, data);
  }

  detail(prefix : string, id: string): Observable<T> {
    return this.http.get<T>(`${this.url}/${prefix}/${id}`);
  }

  get(prefix: string): Observable<PaginatedResult<T>> {
    return this.http.get<PaginatedResult<T>>(`${this.url}/${prefix}`);
  }

  getDependentData(prefix: string): Observable<any> {
    return this.http.get<any>(`${this.url}/${prefix}`);
  }

  delete(prefix : string, id: number): Observable<any> {
    return this.http.delete<any>(`${this.url}/${prefix}/${id}`);
  }

  getFile(prefix : string, id: number): Observable<Blob> {
    return this.http.get<any>(`${this.url}/${prefix}/${id}`, { responseType: 'blob' as 'json' });
  }
  
}
