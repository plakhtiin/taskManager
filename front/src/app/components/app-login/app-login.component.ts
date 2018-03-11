import {Component} from '@angular/core';
import {AuthService} from '../../services/auth.service';

@Component({
	selector: 'app-login',
	templateUrl: './app-login.component.html',
	styleUrls: ['./app-login.component.scss']
})
export class AppLoginComponent {
	public isLoggined: any;

	constructor(public authService: AuthService) {
		this.isLoggined = this.authService.isLoggedIn;
	}

}
