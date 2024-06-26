import { Injectable } from '@angular/core';

import { ReplaySubject, Observable, of, from, combineLatest, throwError } from 'rxjs';
import { switchMap, map, tap, catchError } from 'rxjs/operators';
import { Apollo } from 'apollo-angular';
//import { ApolloCache } from '@apollo/client/core';
import { AuthenticateGQL, CurrentReadPermissionsGQL, CurrentReadPermissionsQuery, CurrentUserInfoGQL, CurrentUsernameGQL, CurrentWritePermissionsGQL, CurrentWritePermissionsQuery, JwtTokenDocument, User } from '../../../generated/graphql';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';
import { allAuthenticatedRoutes } from '../../app-routing.module';
import axios from 'axios';
import { query } from 'express';

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
export class AuthService {
	//cache: ApolloCache<any>;	
	currentUsername: string | null | undefined;
	currentUserInfo: User | null | undefined;
	currentUsername$ = new ReplaySubject<string | null | undefined>(1);
	currentReadPermissions$ = new ReplaySubject<CurrentReadPermissions['nodes']>(1);
	currentWritePermissions$ = new ReplaySubject<CurrentWritePermissions['nodes']>(1);

	constructor(private authenticateService: AuthenticateGQL,
		private currentUsernameService: CurrentUsernameGQL,
		private currentUserInfoService: CurrentUserInfoGQL,
		private currentReadPermissionsService: CurrentReadPermissionsGQL,
		private currentWritePermissionsService: CurrentWritePermissionsGQL,
		private apollo: Apollo, private toastrService: ToastrService,
		private router: Router,
		private toastr: ToastrService
	) {
		//this.cache = this.apollo.client.cache;

		this.currentUserInfoService.fetch({}, { fetchPolicy: 'no-cache' }).pipe
			(
				tap(({ data }) => this.currentUserInfo = data.currentUserInfo as User),
				catchError((error: any) => {
					this.router.navigate(['/auth/login']);
					return throwError(error);
				})
			).subscribe();

		this.currentUsernameService.fetch({}, { fetchPolicy: 'no-cache' }).pipe
			(
				tap(({ data: { currentUsername } }) => this.currentUsername = currentUsername),
				switchMap
					(
						() => this.currentReadPermissionsService.fetch({}, { fetchPolicy: 'no-cache' }).pipe
							(
								tap(({ data: { currentReadPermissions } }) => this.currentReadPermissions$.next(currentReadPermissions?.nodes || []))
							)
					),
				switchMap
					(
						() => this.currentWritePermissionsService.fetch({}, { fetchPolicy: 'no-cache' }).pipe
							(
								tap(({ data: { currentWritePermissions } }) => this.currentWritePermissions$.next(currentWritePermissions?.nodes || []))
							)
					),
			).subscribe();
	}

	login(username: string, password: string) {
		
		localStorage.removeItem('jwtToken');

		this.authenticateService.mutate({ username, password }).pipe(
			switchMap((response) => {
				const token = response.data?.authenticate?.jwtToken;

				if (!token) {
					this.toastrService.error('Invalid username or password!', 'Error');
					return of(false);
				}

				localStorage.setItem('jwtToken', token);
				return this.getPermissions(token); // This should return an Observable<boolean>
			}),
			tap((permissions) => {
				if (permissions) {
					console.log("permissions", permissions);
					this.toastrService.success('Logged in successfully!', 'Success');
					this.router.navigate(['/']);
				}
			}),
			catchError((error) => {
				this.toastrService.error('Login failed!', 'Error');
				return throwError(error);
			})
		).subscribe();
	}

	

	//This method had to be with axios because once in a while the test failed with apollo returning an empty array
	async getPermissions(token?: string): Promise<boolean> {
		try {
			// Create a config object for the headers
			const config = {
				headers: {
					'Authorization': `Bearer ${token}`
				}
			};

			const currentReadBody = {
				query: `
					query {
						currentReadPermissions {
							nodes {
								id
							}
						}
					}
				`
			};

			const currentWriteBody = {
				query: `
					query {
						currentWritePermissions {
							nodes {
								id
							}
						}
					}
				`
			};

			const currentUserInfoBody = {
				query: `
					query CurrentUserInfo
					{
						currentUserInfo {
								id,
								username,
								created,
								fullname
								modified,
								initials,
								usersGroupsByUserId {
									nodes {
										id
										groupByGroupId {
											id
											name
										}
									}
								}
						}
					}`
			}

			// Perform the simultaneous requests using Promise.all
			const [readPermissionsResponse, writePermissionsResponse, currenUserInfoResponse] = await Promise.all([
				axios.post('http://localhost:8080/graphql', currentReadBody, config),
				axios.post('http://localhost:8080/graphql', currentWriteBody, config),
				axios.post('http://localhost:8080/graphql', currentUserInfoBody, config)

			]);

			console.log('readPermissionsResponse', readPermissionsResponse);
			console.log('writePermissionsResponse', writePermissionsResponse);

			const currentReadPermissions = readPermissionsResponse.data?.data?.currentReadPermissions?.nodes || [];
			const currentWritePermissions = readPermissionsResponse.data?.data?.currentReadPermissions?.nodes || [];
			this.currentUserInfo = currenUserInfoResponse.data?.data?.currentUserInfo;


			console.log('currentReadPermissions', currentReadPermissions);

			this.currentReadPermissions$.next(currentReadPermissions);
			this.currentWritePermissions$.next(currentWritePermissions);

			return true;
		} catch (error) {
			console.error('Error fetching permissions:', error);
			return false;
		}
	}

	logout(): void {
		this.currentUsername$.next(null);
		//this.currentReadPermissions$.next(null);

		// clear jwtToken
		// this.apollo.client.cache.writeQuery({query: JwtTokenDocument, data: {jwtToken: null}});

		localStorage.removeItem('jwtToken');

		this.router.navigate(['/auth/login']);

	}

	checkPermission(permission_id: number): Observable<boolean> {

		return this.currentReadPermissions$.pipe
			(
				map
					(
						(permissions) => {
							let ids = permissions.map(permission => permission.id);

							//exclude dashboard
							if (permission_id === 5) {
								return true;
							}

							// Compare permissions with permission_id
							const hasPermission = ids.includes(permission_id);
							return hasPermission;
						}
					)
			);
	}

	checkWritePermission(url: string): Observable<boolean> {
		return this.currentWritePermissions$.pipe
			(
				map
					(
						(permissions) => {
							let route = allAuthenticatedRoutes.find(route => route.path === url);
							console.log(route);
							if (!route) {
								return false;
							}

							if (permissions.map((item) => item.id).includes(route.permission_id)) {
								return true;
							}

							return false;

						}
					)
			);
	}
}
