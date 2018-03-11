import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

import {TodoService} from '../../services/todo.service';

@Component({
	selector: 'app-edit-task',
	templateUrl: './edit-task.component.html',
	styleUrls: ['./edit-task.component.scss']
})
export class EditTaskComponent implements OnInit {

	formEdit: FormGroup;

	PRIORITIES = [
		'High',
		'Middle',
		'Low'
	];

	constructor(private todoService: TodoService,
				private dialogRef: MatDialogRef<EditTaskComponent>,
				private builder: FormBuilder,
				@Inject(MAT_DIALOG_DATA) private data: any) {
	}

	ngOnInit(): void {
		this.formEdit = this.builder.group({
			name: this.data.name,
			startDate: this.data.startDate,
			finishDate: this.data.finishDate,
			description: this.data.description,
			priorityId: this.data.priority.id
		});
	}

	onSubmit(form: any): void {
		this.data.name = form.value.name;
		this.data.startDate = form.value.startDate;
		this.data.finishDate = form.value.finishDate;
		this.data.description = form.value.description;
		this.data.priority.id = form.value.id;
		this.dialogRef.close(this.data);
	}


}
