import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {AuthService} from './auth.service';
import {ServerService} from './server.service';

@Injectable()
export class LoginGuardService implements CanActivate {
	constructor(private authService: AuthService,
				public serverService: ServerService,
				private router: Router) {
	}

	canActivate(route: ActivatedRouteSnapshot,
				state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
		if (!this.authService.isLoggedIn()) {
			this.router.navigate(['']);
		} else {
			this.router.navigate(['/todos']);
		}
		return true;
	}

	logout(): void {
		this.serverService.logout().subscribe((data) => {
				localStorage.removeItem('userData');
				localStorage.removeItem('authToken');
				this.router.navigate(['/login']);
		});
	}

	// resolve(): void {
	// 	if (this.authService.isLoggedIn()) {
	// 		this.router.navigate(['/todos']);
	// 	}
	// }
}
