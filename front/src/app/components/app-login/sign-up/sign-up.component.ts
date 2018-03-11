import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CustomAccountsValidators} from '../../equals.validators';
import {ServerService} from '../../../services/server.service';
import {MatSnackBar} from '@angular/material';

@Component({
	selector: 'sign-up',
	templateUrl: 'sign-up.component.html',
	styleUrls: ['sign-up.component.scss']
})
export class SignUpComponent {

	public formCreate: FormGroup;

	constructor(private router: Router,
				private builder: FormBuilder,
				private serverService: ServerService,
				public snackBar: MatSnackBar) {
		this.initForm();
	}
	initForm(): void {
		this.formCreate = this.builder.group({
				email: ['', Validators.compose([Validators.required, Validators.email])],
				password: ['', Validators.compose([Validators.minLength(6), Validators.maxLength(100)])],
				repeatPassword: ['']
			},
			{
				validator: CustomAccountsValidators.matchPasswordValidator('password', 'repeatPassword')
			});
	}

	onSubmit(form: any): void {
		if (this.formCreate.value.password === this.formCreate.value.repeatPassword) {
			this.serverService.signUp(this.formCreate.value.email, this.formCreate.value.password).subscribe((data) => {
				this.snackBar.open('Welcome! You are registered!', '', { duration: 500 });
				this.initForm();
			});
		}
	}
}
