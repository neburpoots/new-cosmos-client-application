// assembly.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PaginatedResult } from '../../models/utils/pagination';

@Injectable({
  providedIn: 'root',
})
export class AssemblyService {
  private apiUrl = 'http://localhost:8080'; // Replace with your actual API URL

  constructor(private http: HttpClient) {}

  createAssembly(assemblyData: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, assemblyData);
  }

  getAssemblies(page: number = 1): Observable<PaginatedResult<any>> {
    console.log('Fetching assemblies');
    console.log(`${this.apiUrl}/api/assemblies?page=${page}`)
    return this.http.get<PaginatedResult<any>>(`${this.apiUrl}/api/assemblies?page=${page}`);
  }
}
