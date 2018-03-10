import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {AuthService} from './auth.service';

@Injectable()
export class LoginGuardService implements CanActivate {
	constructor(private authService: AuthService, private router: Router) {}
	canActivate(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	): Observable<boolean>|Promise<boolean>|boolean {
		if (!this.authService.isLoggedIn()) {
			this.router.navigate(['']);
		}
		return true;
	}
	resolve(): void {
		if (this.authService.isLoggedIn()) {
			this.router.navigate(['/todos']);
		}
	}
}
