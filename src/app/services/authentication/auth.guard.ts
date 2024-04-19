import { Injectable, inject } from "@angular/core";
import { AuthService } from "./auth.service";
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from "@angular/router";
import { Observable, map } from "rxjs";

@Injectable({ providedIn: 'root' })
export class AuthGuard {

    authService: AuthService;

    constructor(authService: AuthService, private router: Router) {
        this.authService = authService;
    }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot, permission_id: any): Observable<boolean> {
        //your logic goes here
        return this.authService.currentReadPermissions$.pipe
            (
                map
                    (
                        (permissions) => {
                            let ids = permissions.map(permission => permission.id);

                            console.log(permissions);
                            //if no permission redirect to login
                            if (permissions.length === 0) {
                                this.router.navigate(['/auth/login']);
                            }

                            //exclude dashboard
                            if (permission_id === 5) {
                                return true;
                            }

                            // Compare permissions with permission_id
                            const hasPermission = ids.includes(permission_id);

                            //if not correct permission return to dashboard
                            if (!hasPermission) {
                                this.router.navigate(['']);
                            }

                            return hasPermission;
                        }
                    )
                );
    }
}