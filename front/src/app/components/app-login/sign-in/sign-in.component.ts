import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ServerService} from '../../../services/server.service';
import {MatSnackBar} from '@angular/material';

const durationSnackBar: number = 1000;

@Component({
	selector: 'sign-in',
	templateUrl: 'sign-in.component.html',
	styleUrls: ['sign-in.component.scss']
})
export class SignInComponent {
	public formCreate: FormGroup;

	constructor(private router: Router,
				private builder: FormBuilder,
				private serverService: ServerService,
				public snackBar: MatSnackBar) {
		this.formCreate = this.builder.group({
			email: ['', Validators.compose([Validators.required, Validators.email])],
			password: ['', Validators.compose([Validators.minLength(6), Validators.maxLength(100)])],
		});
	}

	onSubmit(form: any): void {
		this.serverService.login(this.formCreate.value.email, this.formCreate.value.password).subscribe((data) => {
			if (!data.body.error) {
				localStorage.userData = JSON.stringify(data.body.userData);
				localStorage.authToken = data.body.token;
				this.router.navigate(['/todos']);
			}
			if (data.body.error) {
				this.snackBar.open(typeof data.body.error === 'string' ? data.body.error : data.body.error.message, '', {duration: durationSnackBar});
			}
		});
	}

}
