import {Injectable} from '@angular/core';
import {Task} from '../classes/task';
import {ServerService} from './server.service';
import {Observable} from 'rxjs/Observable';
import {MatSnackBar} from '@angular/material';

const durationSnackBar: number = 1000;

@Injectable()
export class TodoService {

	private userId: string = JSON.parse(localStorage.userData)._id;

	constructor(private serverService: ServerService,
				public snackBar: MatSnackBar) {
	}

	public addTask(values: Object, priority: number): Observable<any>{
		const task: Task = new Task(this.userId, values, priority);
		return this.serverService.addTask(task);
	}

	public getTasks(): Observable<any> {
		return this.serverService.getTasks();
	}

	public getTaskById(id: number, tasks: Array<Task>): Task {
		return tasks.filter(task => task._id === id).pop();
	}

	public deleteTaskById(taskId: string): Observable<any> {
		return this.serverService.removeTask(taskId);
	}

	public updateTaskById(updTask: Task): Observable<any> {
		return this.serverService.updateTask(updTask);
	}

	public completeTaskById(task: Task): void {
		task.completed = !task.completed;
		this.updateTaskById(task);
	}

	public sortTasksByName(tasks: Task[]): Task[] {
		return tasks.sort((taskA: Task, taskB: Task) => +(taskA.name.toLowerCase() > taskB.name.toLowerCase()));
	}

	public sortTasksByDate(tasks: Task[]): Task[] {
		return tasks.sort((taskA: Task, taskB: Task) => +(taskA.startDate > taskB.startDate));
	}

	public sortTasksByPriority(tasks: Task[]): Task[] {
		return tasks.sort((taskA: Task, taskB: Task) => taskA.priority.id - taskB.priority.id);
	}

	public sortTasksByCompleted(tasks: Task[]): Task[] {
		return tasks.sort((taskA: Task, taskB: Task) => +(taskA.completed > taskB.completed));
	}
}
