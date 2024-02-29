// assembly.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PaginatedResult } from '../../models/utils/pagination';
import { SearchCriteria } from '../../models/utils/searchCriteria';
import AssemblyType from '../../models/entities/assemblyType';
import DetectorType from '../../models/entities/detectorType';

@Injectable({
  providedIn: 'root',
})
export class DetectorTypeService {
  private apiUrl = 'http://localhost:8080'; // Replace with your actual API URL

  constructor(private http: HttpClient) {}

  //used for post and edit assembly
  getDetectorTypes(): Observable<any> {
    return this.http.get<DetectorType[]>(`${this.apiUrl}/api/detector-types`);
  }
}
