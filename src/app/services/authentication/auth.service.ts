import { Injectable } from '@angular/core';

import { ReplaySubject, Observable, of, from, combineLatest } from 'rxjs';
import { switchMap, map, tap } from 'rxjs/operators';
import { Apollo } from 'apollo-angular';
//import { ApolloCache } from '@apollo/client/core';
import { AuthenticateGQL, CurrentReadPermissionsGQL, CurrentReadPermissionsQuery, CurrentUserInfoGQL, CurrentUsernameGQL, CurrentWritePermissionsGQL, CurrentWritePermissionsQuery, JwtTokenDocument, User } from '../../../generated/graphql';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';
import { allAuthenticatedRoutes } from '../../app-routing.module';

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
	currentUsername: string|null|undefined;
	currentUserInfo: User|null|undefined;
	currentUsername$ = new ReplaySubject<string|null|undefined>(1);
	currentReadPermissions$ = new ReplaySubject<CurrentReadPermissions['nodes']>(1);	  
	currentWritePermissions$ = new ReplaySubject<CurrentWritePermissions['nodes']>(1);	

	constructor(private authenticateService: AuthenticateGQL, 
		private currentUsernameService: CurrentUsernameGQL, 
		private currentUserInfoService : CurrentUserInfoGQL,
		private currentReadPermissionsService: CurrentReadPermissionsGQL, 
		private currentWritePermissionsService: CurrentWritePermissionsGQL, 
		private apollo: Apollo, private toastrService: ToastrService,
		private router: Router
		) 
	{ 
		//this.cache = this.apollo.client.cache;
		
		this.currentUserInfoService.fetch({}, {fetchPolicy: 'no-cache'}).pipe
		(
			tap(({data}) => this.currentUserInfo = data.currentUserInfo as User)
		).subscribe();

		this.currentUsernameService.fetch({}, {fetchPolicy: 'no-cache'}).pipe
		(
			tap(({data: {currentUsername}}) => this.currentUsername = currentUsername),			
			switchMap
			(
				() => this.currentReadPermissionsService.fetch({}, {fetchPolicy: 'no-cache'}).pipe
				(
					tap(({data: {currentReadPermissions}}) => this.currentReadPermissions$.next(currentReadPermissions?.nodes || []))
				)
			),
			switchMap
			(
				() => this.currentWritePermissionsService.fetch({}, {fetchPolicy: 'no-cache'}).pipe
				(
					tap(({data: {currentWritePermissions}}) => this.currentWritePermissions$.next(currentWritePermissions?.nodes || []))
				)
			),			
		).subscribe();	
	}

	login(username: string, password: string): Observable<boolean>
	{			
	    localStorage.removeItem('jwtToken');
		
	
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

					
					localStorage.setItem('jwtToken', data?.authenticate?.jwtToken);

					// currentUsername
					return this.getPermissions();
				}			
			)		
		);		
	}

	refreshPermissions(): Observable<boolean> {
		return this.getPermissions().pipe(
		  tap(() => {
			// Optionally add any logic here that you want to execute after refreshing permissions
			console.log('Permissions refreshed');
		  }),
		  map(() => true)
		);
	  }

	getPermissions(): Observable<boolean> {
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
					this.currentUsername = currentUsername;
					this.currentUsername$.next(currentUsername);
					this.currentReadPermissions$.next(currentReadPermissions);
					this.currentWritePermissions$.next(currentWritePermissions);
				}
			),
			map(() => true)
		)
	}
	
	logout(): void
	{	
		this.currentUsername$.next(null);
		//this.currentReadPermissions$.next(null);
		
		// clear jwtToken
		// this.apollo.client.cache.writeQuery({query: JwtTokenDocument, data: {jwtToken: null}});
		
		localStorage.removeItem('jwtToken');
		
		this.router.navigate(['/auth/login']);
					
	}

	checkPermission(permission_id: number): Observable<boolean>
	{

		return this.currentReadPermissions$.pipe
		(
			map
			(
				(permissions) => 
				{
					let ids = permissions.map(permission => permission.id);

					//exclude dashboard
					if(permission_id === 5) 
					{
						return true;
					}

					// Compare permissions with permission_id
					const hasPermission = ids.includes(permission_id);
					return hasPermission;
				}
			)
		);
	}

	checkWritePermission(url: string): Observable<boolean>
	{
		return this.currentWritePermissions$.pipe
		(
			map
			(
				(permissions) => 
				{
					let route = allAuthenticatedRoutes.find(route => route.path === url);
					console.log(route);
					if(!route)
					{
						return false;
					}
					
					if(permissions.map((item) => item.id).includes(route.permission_id)) {
						return true;
					}
					
					return false;
					
				}
			)
		);
	}
}
