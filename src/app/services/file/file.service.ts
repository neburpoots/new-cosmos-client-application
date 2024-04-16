// assembly.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PaginatedResult } from '../../models/utils/pagination';
import { SearchCriteria } from '../../models/utils/searchCriteria';
import AssemblyType from '../../models/entities/assemblyType';
import { exportOptions } from '../../models/utils/export';

@Injectable({
  providedIn: 'root',
})
export abstract class FileService {

  private readonly url;

  constructor(private http: HttpClient) {
    this.url = 'http://localhost:8080';
  }

  getCSV(options: exportOptions): Observable<Blob> {
    return this.http.post<any>(`${this.url}/generateCSV`, { responseType: 'blob' as 'json' });
  }

  
  
}