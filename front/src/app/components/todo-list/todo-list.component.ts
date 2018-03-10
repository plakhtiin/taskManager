import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource, MatSort } from '@angular/material';
import { filter } from 'rxjs/operators';
import { TodoService } from '../../services/todo.service';
import { Task } from '../../classes/task';
import { EditTaskComponent } from '../edit-task/edit-task.component';
import { Priority } from '../../classes/priority';
import { CreateTaskComponent } from '../create-task/create-task.component';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {

  form: FormGroup;
  editTaskDialogRef: MatDialogRef<EditTaskComponent>;
  createTaskDialogRef: MatDialogRef<CreateTaskComponent>;

  PRIORITYS = [
    'High',
    'Middle',
    'Low'
  ];

  constructor(
    private todoService: TodoService,
    public editDialog: MatDialog,
    public createDialog: MatDialog
  ) { }

  ngOnInit() {
    this.createForm();
  }
  public addTask(values): void {
  	this.todoService.addTask(values, values.priorityId);
    this.form.reset();
  }
  public updateTask(task: Task): void {
    task.priority = new Priority(task.priority.id);
  	this.todoService.updateTaskById(task.id, task);
  }
  public deleteTask(task: Task): void {
    this.todoService.deleteTaskById(task.id);
  }

  public completeTask(task: Task): void {
    this.todoService.completeTaskById(task.id);
  }

  public sortTasksByName(): void {
    this.todoService.sortTasksByName();
  }

  public sortTasksByDate(): void {
    this.todoService.sortTasksByDate();
  }

  public sortTasksByPriority(): void {
    this.todoService.sortTasksByPriority();
  }

  public sortTasksByCompleted(): void {
    this.todoService.sortTasksByCompleted();
  }

  public taskIsOverdue(task: Task): string {
    if (!task.completed) {
      let now = new Date;
      let finish = new Date(task.finishDate);
      if (finish.valueOf() - now.valueOf() < 0) {
        return '#FA9A9A';
      }
    }
    return ''
  }

  get tasks(): Array<Task> {
    return this.todoService.getTasks();
  }

  private createForm(): void {
    this.form = new FormGroup({
      name: new FormControl(null),
      date: new FormControl(null),
      priority: new FormControl(null),
      completed: new FormControl(null)
    });
  }
  openEditTaskDialog(task): void {
    this.editTaskDialogRef = this.editDialog.open(EditTaskComponent, {
      width: '400px',
      data: {
        id: task ? task.id : '',
        name: task ? task.name : '',
        startDate: task ? task.startDate : '',
        finishDate: task ? task.finishDate : '',
        description: task ? task.description : '',
        priority: task ? task.priority : '',
        completed: task ? task.completed : '',
      }
    })

    this.editTaskDialogRef.afterClosed()
    .pipe(filter(values => values))
    .subscribe(values => {
      this.updateTask(values);
    })
  }
  openCreateTaskDialog(): void {
    this.createTaskDialogRef = this.createDialog.open(CreateTaskComponent, {
      width: '400px',
    })

    this.createTaskDialogRef.afterClosed()
    .pipe(filter(values => values))
    .subscribe(values => {
      this.addTask(values);
    })
  }

}
