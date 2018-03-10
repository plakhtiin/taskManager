import {Injectable} from '@angular/core';
import {Task} from '../classes/task';

@Injectable()
export class TodoService {

	private nextId: number;

	constructor() {
		const tasks: Task[] = this.getTasks();

		if (tasks.length === 0) {
			this.nextId = 0;
		} else {
			this.nextId = tasks[tasks.length - 1].id + 1;
		}
	}

	public addTask(values: Object, priority: number): void {
		const tasks: Task[] = this.getTasks();
		const task: Task = new Task(this.nextId, values, priority);
		tasks.push(task);
		this.setLocalStorageTasks(tasks);
		this.nextId++;
	}

	public getTasks(): Task[] {
		const item: any = JSON.parse(localStorage.getItem('tasks'));
		if (item != null) {
			item.tasks.forEach(task => {
				task.startDate = new Date(task.startDate);
				task.finishDate = new Date(task.finishDate);
			});
		}
		return item == null ? [] : item.tasks;
	}

	public getTaskById(id: number): Task {
		const tasks: Task[] = this.getTasks();
		return tasks.filter(task => task.id === id).pop();
	}

	public deleteTaskById(id: number): void {
		let tasks: Task[] = this.getTasks();
		tasks = tasks.filter(task => task.id !== id);
		this.setLocalStorageTasks(tasks);
	}

	public updateTaskById(id: number, updTask: Task): void {
		const tasks: Task[] = this.getTasks();
		const task: Task = tasks.filter(taskItem => taskItem.id === id).pop();
		Object.assign(task, updTask);
		this.setLocalStorageTasks(tasks);
	}

	public completeTaskById(id: number): void {
		const tasks: Task[] = this.getTasks();
		const task: Task = tasks.filter(taskItem => taskItem.id === id).pop();
		task.completed = !task.completed;
		this.setLocalStorageTasks(tasks);
	}

	public sortTasksByName(): void {
		const tasks: Task[] = this.getTasks();
		tasks.sort((taskA: Task, taskB: Task) => +(taskA.name.toLowerCase() > taskB.name.toLowerCase()));
		this.setLocalStorageTasks(tasks);
	}

	public sortTasksByDate(): void {
		const tasks: Task[] = this.getTasks();
		tasks.sort((taskA: Task, taskB: Task) => +(taskA.startDate > taskB.startDate));
		this.setLocalStorageTasks(tasks);
	}

	public sortTasksByPriority(): void {
		const tasks: Task[] = this.getTasks();
		tasks.sort((taskA: Task, taskB: Task) => taskA.priority.id - taskB.priority.id);
		this.setLocalStorageTasks(tasks);
	}

	public sortTasksByCompleted(): void {
		const tasks: Task[] = this.getTasks();
		tasks.sort((taskA: Task, taskB: Task) => +(taskA.completed > taskB.completed));
		this.setLocalStorageTasks(tasks);
	}

	private setLocalStorageTasks(tasks: Task[]): void {
		localStorage.setItem('tasks', JSON.stringify({tasks: tasks}));
	}
}
