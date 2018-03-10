import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { TodoService } from '../../services/todo.service';
import { errorMessages } from '../../errors';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.scss']
})
export class CreateTaskComponent implements OnInit {

  formCreate: FormGroup;
  errors = errorMessages;
  PRIORITYS = [
    'High',
    'Middle',
    'Low'
  ];
  constructor(
    private todoService: TodoService,
    private dialogRef: MatDialogRef<CreateTaskComponent>,
    private builder: FormBuilder
  ) { }

  ngOnInit() {
    this.formCreate = this.builder.group({
      name: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(32)]],
      startDate: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(128)]],
      finishDate: ['', Validators.required],
      description: ['', Validators.required],
      priorityId: ['', Validators.required]
    })
  }

  onSubmit(form) {
    this.dialogRef.close(form.value);
  }
}
