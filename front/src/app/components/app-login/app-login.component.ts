import {Component} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';

@Component({
	selector: 'app-login',
	templateUrl: './app-login.component.html',
	styleUrls: ['./app-login.component.scss']
})
export class AppLoginComponent {
	public isLoggined: any;

	constructor(private router: Router, public authService: AuthService) {
		this.isLoggined = this.authService.isLoggedIn;
		if (this.isLoggined()) {
			this.router.navigate(['/todos']);
		}
	}

}
