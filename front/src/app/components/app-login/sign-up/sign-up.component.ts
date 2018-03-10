import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CreateTaskComponent} from '../../create-task/create-task.component';
import {MatDialogRef} from '@angular/material/dialog';

import {of as observableOf} from 'rxjs/observable/of';
import {map} from 'rxjs/operators/map';
import {CustomAccountsValidators} from '../../equals.validators';


@Component({
	selector: 'sign-up',
	templateUrl: 'sign-up.component.html',
	styleUrls: ['sign-up.component.scss']
})
export class SignUpComponent {

	public formCreate: FormGroup;

	constructor(private router: Router,
				private dialogRef: MatDialogRef<CreateTaskComponent>,
				private builder: FormBuilder) {
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
			this.dialogRef.close(form.value);
		}
	}
}
