// assembly.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PaginatedResult } from '../../models/utils/pagination';
import { SearchCriteria } from '../../models/utils/searchCriteria';

@Injectable({
  providedIn: 'root',
})
export class AssemblyTypeService {
  private apiUrl = 'http://localhost:8080'; // Replace with your actual API URL

  constructor(private http: HttpClient) {}

  getAssemblyTypes(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/api/assembly-types`);
  }
}
