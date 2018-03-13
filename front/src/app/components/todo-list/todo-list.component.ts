import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {filter} from 'rxjs/operators';
import {TodoService} from '../../services/todo.service';
import {Task} from '../../classes/task';
import {EditTaskComponent} from '../edit-task/edit-task.component';
import {Priority} from '../../classes/priority';
import {CreateTaskComponent} from '../create-task/create-task.component';
import {MatSnackBar} from '@angular/material';
import {LoginGuardService} from '../../services/loginGuard.service';

@Component({
	selector: 'app-todo-list',
	templateUrl: './todo-list.component.html',
	styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {

	form: FormGroup;
	editTaskDialogRef: MatDialogRef<EditTaskComponent>;
	createTaskDialogRef: MatDialogRef<CreateTaskComponent>;
	tasks: Task[];

	PRIORITIES = [
		'High',
		'Middle',
		'Low'
	];

	constructor(private todoService: TodoService,
				public editDialog: MatDialog,
				public loginService: LoginGuardService,
				public snackBar: MatSnackBar,
				public createDialog: MatDialog) {
	}

	ngOnInit(): void {
		this.createForm();
		this.getAllTasks();
	}

	public addTask(values: any): void {
		this.todoService.addTask(values, values.priorityId).subscribe((data) => {
				if (data.body.error) {
					this.snackBar.open(typeof data.body.error === 'string' ? data.body.error : data.body.error.message, '', {duration: 1500});
				}
				if (!data.body.error) {
					this.getAllTasks();
				}
			},
			(error) => {
				if (error.status === 403) {
					this.loginService.logout();
				}
			});
		this.form.reset();
	}

	public updateTask(task: Task): void {
		task.priority = new Priority(task.priority.id);
		this.todoService.updateTaskById(task).subscribe((data) => {
				if (data.body.error) {
					this.snackBar.open(typeof data.body.error === 'string' ? data.body.error : data.body.error.message, '', {duration: 1500});
				}
				if (!data.body.error) {
					this.getAllTasks();
				}
			},
			(error) => {
				if (error.status === 403) {
					this.loginService.logout();
				}
			});
	}

	public deleteTask(task: Task): void {
		this.todoService.deleteTaskById(task._id).subscribe((data) => {
				if (data.body.error) {
					this.snackBar.open(typeof data.body.error === 'string' ? data.body.error : data.body.error.message, '', {duration: 1500});
				}
				if (!data.body.error) {
					this.snackBar.open('Task was successfully removed', '', {duration: 1000});
					this.getAllTasks();
				}
			},
			(error) => {
				if (error.status === 403) {
					this.loginService.logout();
				}
			});
	}

	public completeTask(task: Task): void {
		this.todoService.completeTaskById(task).subscribe((data) => {
				if (data.body.error) {
					this.snackBar.open(typeof data.body.error === 'string' ? data.body.error : data.body.error.message, '', {duration: 1500});
				}
				if (!data.body.error) {
					this.snackBar.open('Task was successfully completed', '', {duration: 1000});
					this.getAllTasks();
				}
			},
			(error) => {
				if (error.status === 403) {
					this.loginService.logout();
				}
			});
	}

	public sortTasksByName(): void {
		this.tasks = this.todoService.sortTasksByName(this.tasks);
	}

	public sortTasksByDate(): void {
		this.tasks = this.todoService.sortTasksByDate(this.tasks);
	}

	public sortTasksByPriority(): void {
		this.tasks = this.todoService.sortTasksByPriority(this.tasks);
	}

	public sortTasksByCompleted(): void {
		this.tasks = this.todoService.sortTasksByCompleted(this.tasks);
	}

	private createForm(): void {
		this.form = new FormGroup({
			name: new FormControl(null),
			date: new FormControl(null),
			priority: new FormControl(null),
			completed: new FormControl(null)
		});
	}

	openEditTaskDialog(task: Task): void {
		this.editTaskDialogRef = this.editDialog.open(EditTaskComponent, {
			width: '400px',
			data: task
		});

		this.editTaskDialogRef.afterClosed()
			.pipe(filter(values => values))
			.subscribe(values => {
				this.updateTask(values);
			});
	}

	openCreateTaskDialog(): void {
		this.createTaskDialogRef = this.createDialog.open(CreateTaskComponent, {
			width: '400px',
		});

		this.createTaskDialogRef.afterClosed()
			.pipe(filter(values => values))
			.subscribe(values => {
				this.addTask(values);
			});
	}

	getAllTasks(): void {
		this.todoService.getTasks().subscribe((data) => {
				if (data.body.error) {
					this.snackBar.open(typeof data.body.error === 'string' ? data.body.error : data.body.error.message, '', {duration: 1500});
				}
				if (!data.body.error) {
					this.tasks = data.body.tasks;
				}
			},
			(error) => {
				if (error.status === 403) {
					this.loginService.logout();
				}
			});
	}

}
