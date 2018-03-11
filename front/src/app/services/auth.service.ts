import {Injectable} from '@angular/core';
import {Router} from '@angular/router';

@Injectable()
export class AuthService {
	constructor(private router: Router) {
	}

	isLoggedIn(): boolean {
		// if (!!localStorage.authToken) {
		// 	this.router.navigate(['/todos']);
		// }
		return !!localStorage.authToken;
	}
}
