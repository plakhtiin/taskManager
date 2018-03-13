import {Component} from '@angular/core';
import {TodoService} from './services/todo.service';
import {Router} from '@angular/router';
import {AuthService} from './services/auth.service';
import {ServerService} from './services/server.service';
import {MatSnackBar} from '@angular/material';
import {LoginGuardService} from './services/loginGuard.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {
	public isLoggined: any;

	constructor(private todoService: TodoService,
				private router: Router,
				public authService: AuthService,
				public loginService: LoginGuardService,
				public snackBar: MatSnackBar,
	) {
		this.isLoggined = this.authService.isLoggedIn;
		if (!this.isLoggined()) {
			this.router.navigate(['/login']);
		}
	}

	logout(): void {
		this.loginService.logout();
	}
}
