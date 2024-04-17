// assembly.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  downloadCSV(options: exportOptions): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'text/csv', // Specify that we expect a CSV file in response
    });
    return this.http.post(`${this.url}/generateCSV`, options, { headers: headers, responseType: 'text' });
  }

  downloadExcel(options: exportOptions): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // Specify that we expect an Excel file in response
    });
    return this.http.post(`${this.url}/generateExcel`, options, { headers: headers, responseType: 'blob' });
  }
    
}