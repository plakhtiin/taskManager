import {AbstractControl, FormArray, FormGroup, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';

export class CustomAccountsValidators extends Validators {
	static matchPasswordValidator(newPassword: string, confirmPassword: string): ValidatorFn {
		return (AC: AbstractControl): ValidationErrors | null => {
			const newPw: AbstractControl = AC.get(newPassword);
			const confirmPw: AbstractControl = AC.get(confirmPassword);
			if (newPw.value !== confirmPw.value) {
				confirmPw.setErrors({matchPassword: true});
			} else {
				if (confirmPw.hasError('matchPassword') && confirmPw.errors !== null) {
					delete confirmPw.errors['matchPassword'];
					if (!Object.keys(confirmPw.errors).length) {
						confirmPw.setErrors(null);
					}
				}
				return null;
			}
		};
	}

	static notEqualTo(controlTo: string): ValidatorFn {
		return (control: AbstractControl): ValidationErrors | null => {
			const r: FormGroup | FormArray = control.parent;
			if (!r) {
				return;
			}
			if (r && r.controls[controlTo].value === control.value) {
				return {notEqual: true};
			} else {
				if (r.controls[controlTo].hasError('notEqual')) {
					delete r.controls[controlTo].errors['notEqual'];
					if (!Object.keys(r.controls[controlTo].errors).length) {
						r.controls[controlTo].setErrors(null);
					}
				}
				if (control.hasError('notEqual')) {
					delete control.errors['notEqual'];
					if (!Object.keys(control.errors).length) {
						control.setErrors(null);
					}
				}
			}
		};
	}

	constructor(validators: Validators) {
		super();
	}
}
