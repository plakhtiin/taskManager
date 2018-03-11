import {Component} from '@angular/core';
import {TodoService} from './services/todo.service';
import {Router} from '@angular/router';
import {AuthService} from './services/auth.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {
	public isLoggined: any;

	constructor(private todoService: TodoService,
				private router: Router,
				public authService: AuthService) {
		this.isLoggined = this.authService.isLoggedIn;
		if (!this.isLoggined()) {
			this.router.navigate(['/login']);
		}
	}

	logout(): void {
		localStorage.removeItem('userData');
		localStorage.removeItem('authToken');
		this.router.navigate(['/login']);
	}
}
