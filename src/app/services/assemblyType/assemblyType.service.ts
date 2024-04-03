// assembly.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, switchMap, tap } from 'rxjs';
import { PaginatedResult } from '../../models/utils/pagination';
import { SearchCriteria } from '../../models/utils/searchCriteria';
import AssemblyType from '../../models/entities/assemblyType';
import { AssemblyEntitiesOrderBy, AssemblyTypeEntitiesGQL, AssemblyTypesEntitiesOrderBy, AssemblyTypesOrderBy } from '../../../generated/graphql';
import { SearchFilters } from '../../models/utils/searchFilters';

@Injectable({
  providedIn: 'root',
})
export class AssemblyTypeService {
  private apiUrl = 'http://localhost:8080'; // Replace with your actual API URL

  constructor(private http: HttpClient, private assemblyTypeService: AssemblyTypeEntitiesGQL) {}

  async test(searchCriteria: SearchFilters) {
		return this.assemblyTypeService.fetch(searchCriteria, {fetchPolicy: 'network-only'}).pipe
		(
            switchMap
            (
                ({data: {assemblyTypes}}) => 
                {
                    const nodes = assemblyTypes?.nodes || [];
                    console.log(nodes);
                    return of
                    (
                        {
                            title: 'Assembly Types',
                            nodes: nodes,
                        }
                    );				
                }
            )
    );
  }

  //used for post and edit assembly
  getAssemblyTypes(): Observable<any> {
    return this.http.get<AssemblyType[]>(`${this.apiUrl}/api/assembly-types/all`);
  }
}
