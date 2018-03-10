import {Component} from '@angular/core';
import {Router} from '@angular/router';

@Component({
	selector: 'app-login',
	templateUrl: './app-login.component.html',
	styleUrls: ['./app-login.component.scss']
})
export class AppLoginComponent {

	public loginStatus: boolean;

	constructor(private router: Router) {
	}

	public onLoginClick(): void {
		// FB.getLoginStatus((response) => {
		// 	if (response.status === 'connected') {
		// 		this.router.navigate(['./todos']);
		// 	}
		// 	else {
		// 		FB.login((loginResponse) => {
		// 			this.router.navigate(['./todos']);
		// 		});
		// 	}
		// });
	}

}
