import { Injectable } from '@angular/core';

import { ReplaySubject, Observable, of, from, combineLatest } from 'rxjs';
import { switchMap, map, tap } from 'rxjs/operators';
import { Apollo } from 'apollo-angular';
//import { ApolloCache } from '@apollo/client/core';
import { AuthenticateGQL, CurrentReadPermissionsGQL, CurrentReadPermissionsQuery, CurrentUsernameGQL, CurrentWritePermissionsGQL, CurrentWritePermissionsQuery, JwtTokenDocument } from '../../../generated/graphql';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';

//------------------------------------------------------------------------------
type CurrentReadPermissions = Exclude<CurrentReadPermissionsQuery['currentReadPermissions'], null | undefined>;
type CurrentWritePermissions = Exclude<CurrentWritePermissionsQuery['currentWritePermissions'], null | undefined>;

//------------------------------------------------------------------------------
@Injectable
(
	{
  		providedIn: 'root'
	}
)
export class AuthService 
{
	//cache: ApolloCache<any>;	
	currentUsername$ = new ReplaySubject<string|null|undefined>(1);
	currentReadPermissions$ = new ReplaySubject<CurrentReadPermissions['nodes']>(1);	  
	currentWritePermissions$ = new ReplaySubject<CurrentWritePermissions['nodes']>(1);	

	constructor(private authenticateService: AuthenticateGQL, 
		private currentUsernameService: CurrentUsernameGQL, 
		private currentReadPermissionsService: CurrentReadPermissionsGQL, 
		private currentWritePermissionsService: CurrentWritePermissionsGQL, 
		private apollo: Apollo, private toastrService: ToastrService,
		private router: Router
		) 
	{ 
		//this.cache = this.apollo.client.cache;		

		this.currentUsernameService.fetch({}, {fetchPolicy: 'cache-only'}).pipe
		(
			tap(({data: {currentUsername}}) => this.currentUsername$.next(currentUsername)),			
			switchMap
			(
				() => this.currentReadPermissionsService.fetch({}, {fetchPolicy: 'network-only'}).pipe
				(
					tap(({data: {currentReadPermissions}}) => this.currentReadPermissions$.next(currentReadPermissions?.nodes || []))
				)
			),
			switchMap
			(
				() => this.currentWritePermissionsService.fetch({}, {fetchPolicy: 'network-only'}).pipe
				(
					tap(({data: {currentWritePermissions}}) => this.currentWritePermissions$.next(currentWritePermissions?.nodes || []))
				)
			),			
		).subscribe();	
	}

	async clearCache()
	{			
		return caches.keys().then
		(
			keys => Promise.all
			(
				keys.filter(key => key.includes(':data')).map
				(
					(key) => 
					{
						//console.log(key);
						caches.open(key).then
						(
							(eachCache) => 
							{
								eachCache.keys().then
								(
									(requests) => 
									{														
										requests.forEach
										(
											(eachRequest) => 
											{ 
												//console.log(eachRequest); 
												return eachCache.delete(eachRequest); 
											}
										);
									}														
								)
							}
						)										
					}
				)
			)
		);
	}

	login(username: string, password: string): Observable<boolean>
	{			
	    localStorage.removeItem('jwtToken');
		
		this.apollo.client.cache.writeQuery({query: JwtTokenDocument, data: {jwtToken: null}});	
	
		return this.authenticateService.mutate({username: username, password: password}).pipe
		(
			switchMap
			(				
				({data}) =>
				{ 			
	
					if (!data?.authenticate?.jwtToken)				
					{
						// this.toastService.add({type: ToastType.Danger, message: 'Invalid username or password!', delay: 15});
						this.toastrService.error('Invalid username or password!', 'Error');

						return of(false);
					}

					// this.toastService.add({type: ToastType.Success, message: 'Logged in successfully!', delay: 2});
					
					// write jwtToken
					this.apollo.client.cache.writeQuery({query: JwtTokenDocument, data: {jwtToken: data?.authenticate?.jwtToken}});	
															
					localStorage.setItem('jwtToken', data?.authenticate?.jwtToken);
					// this.router.navigate(['/admin/dashboard']);

					// currentUsername
					return combineLatest
					(
						[
							this.currentUsernameService.fetch({}, {fetchPolicy: 'network-only'}).pipe(map(({data}) => data.currentUsername)),
							this.currentReadPermissionsService.fetch({}, {fetchPolicy: 'network-only'}).pipe(map(({data: {currentReadPermissions}}) => currentReadPermissions?.nodes || [])),
							this.currentWritePermissionsService.fetch({}, {fetchPolicy: 'network-only'}).pipe(map(({data: {currentWritePermissions}}) => currentWritePermissions?.nodes || [])),
						]
					).pipe
					(
						tap
						(
							([currentUsername, currentReadPermissions, currentWritePermissions]) => 
							{
								this.currentUsername$.next(currentUsername);
								this.currentReadPermissions$.next(currentReadPermissions);
								this.currentWritePermissions$.next(currentWritePermissions);
							}
						),
						map(() => true)
					)
				}				
			)		
		);		
	}
	
	logout(): Observable<boolean>
	{	
		this.currentUsername$.next(null);
		//this.currentReadPermissions$.next(null);
		
		// clear jwtToken
		this.apollo.client.cache.writeQuery({query: JwtTokenDocument, data: {jwtToken: null}});
		
		localStorage.removeItem('jwtToken');
		
		this.router.navigate(['/auth/login']);

		// clear cache
		return from(this.apollo.client.clearStore()).pipe
		(
			switchMap(() => from(this.clearCache())),
			map(_ => true)			
		);						
	}
}
