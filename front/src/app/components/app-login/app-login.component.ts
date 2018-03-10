import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {CreateTaskComponent} from '../create-task/create-task.component';
import {filter} from 'rxjs/operators';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {SignInComponent} from './sign-in/sign-in.component';
import {SignUpComponent} from './sign-up/sign-up.component';
import {LoginGuardService} from '../../services/loginGuard.service';
import {AuthService} from '../../services/auth.service';

@Component({
	selector: 'app-login',
	templateUrl: './app-login.component.html',
	styleUrls: ['./app-login.component.scss']
})
export class AppLoginComponent {
	private signInDialogRef: MatDialogRef<SignInComponent>;
	private signUpDialogRef: MatDialogRef<SignUpComponent>;
	public isLoggined: any;

	constructor(private router: Router,
				public dialog: MatDialog,
				public authService: AuthService) {
		this.isLoggined = this.authService.isLoggedIn;
	}

	public onLoginClick(): void {
		this.signInDialogRef = this.dialog.open(SignInComponent, {
			width: '400px',
		});

		this.signInDialogRef.afterClosed()
			.pipe(filter(values => values))
			.subscribe(values => {
				console.log(values);
			});
	}
	public onRegisterClick(): void {
		this.signUpDialogRef = this.dialog.open(SignUpComponent, {
			width: '400px',
		});

		this.signUpDialogRef.afterClosed()
			.pipe(filter(values => values))
			.subscribe(values => {
				console.log(values);
			});
	}

}
