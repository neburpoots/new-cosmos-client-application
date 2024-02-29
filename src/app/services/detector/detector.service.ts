// assembly.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { PaginatedResult } from '../../models/utils/pagination';
import { SearchCriteria } from '../../models/utils/searchCriteria';

import { DetectorDto } from '../../models/dto/detectorDto';

@Injectable({
  providedIn: 'root',
})
export class DetectorService {
  private apiUrl = 'http://localhost:8080'; // Replace with your actual API URL

  constructor(private http: HttpClient) {}

  createDetector(detectorData: DetectorDto): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/api/detectors`, detectorData);
  }

//   updateAssembly(id: number, assemblyData: AssemblyDto): Observable<any> {
//     return this.http.put<any>(`${this.apiUrl}/api/assemblies/${id}`, assemblyData);
//   }

//   getAssemblies(page: number = 1, searchCriteria : SearchCriteria): Observable<PaginatedResult<Assembly>> {
//     console.log('Fetching assemblies');
//     console.log(`${this.apiUrl}/api/assemblies?page=${page}&searchQuery=${searchCriteria.searchValue}`)
//     return this.http.get<PaginatedResult<Assembly>>(`${this.apiUrl}/api/assemblies?page=${page}&searchQuery=${searchCriteria.searchValue}`);
//   }
}
