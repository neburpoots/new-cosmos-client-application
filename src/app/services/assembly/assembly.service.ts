// assembly.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { PaginatedResult } from '../../models/utils/pagination';
import { SearchCriteria } from '../../models/utils/searchCriteria';
import { Assembly } from '../../models/entities/assembly';

@Injectable({
  providedIn: 'root',
})
export class AssemblyService {
  private apiUrl = 'http://localhost:8080'; // Replace with your actual API URL

  constructor(private http: HttpClient) {}

  handleError(operation = 'operation') {
    return (error: any) => {
      console.error(error);
      return [];
    };
  }
  
  createAssembly(assemblyData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/api/assemblies`, assemblyData);
  }

  getAssemblies(page: number = 1, searchCriteria : SearchCriteria): Observable<PaginatedResult<Assembly>> {
    console.log('Fetching assemblies');
    console.log(`${this.apiUrl}/api/assemblies?page=${page}&searchQuery=${searchCriteria.searchValue}`)
    return this.http.get<PaginatedResult<Assembly>>(`${this.apiUrl}/api/assemblies?page=${page}&searchQuery=${searchCriteria.searchValue}`);
  }
}
