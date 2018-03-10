import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CreateTaskComponent} from '../../create-task/create-task.component';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
	selector: 'sign-in',
	templateUrl: 'sign-in.component.html',
	styleUrls: ['sign-in.component.scss']
})
export class SignInComponent {
	public formCreate: FormGroup;

	constructor(private router: Router,
				private dialogRef: MatDialogRef<CreateTaskComponent>,
				private builder: FormBuilder) {
		this.formCreate = this.builder.group({
			email: ['', Validators.compose([Validators.required, Validators.email])],
			password: ['', Validators.compose([Validators.minLength(6), Validators.maxLength(100)])],
		});
	}

	onSubmit(form: any): void {
		this.dialogRef.close(form.value);
	}

}
