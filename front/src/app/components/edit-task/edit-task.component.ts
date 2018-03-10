import { Component, OnInit, Input, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { TodoService } from '../../services/todo.service';
import { Task } from '../../classes/task';
import { Priority } from '../../classes/priority';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.scss']
})
export class EditTaskComponent implements OnInit {
  
  formEdit: FormGroup;

  PRIORITYS = [
    'High',
    'Middle',
    'Low'
  ];
  constructor(
  	private todoService: TodoService,
    private dialogRef: MatDialogRef<EditTaskComponent>,
    private builder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) private data
  ) { }

  ngOnInit(): void {
    this.formEdit = this.builder.group({
      name: this.data.name,
      startDate: this.data.startDate,
      finishDate: this.data.finishDate,
      description: this.data.description,
      priorityId: this.data.priority.id
    })
  }
  
  onSubmit(form) {
    this.dialogRef.close(new Task(this.data.id, form.value, form.value.priorityId));
  }


}
