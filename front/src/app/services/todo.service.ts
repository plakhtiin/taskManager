import { Injectable } from '@angular/core';
import { Task } from '../classes/task';

@Injectable()
export class TodoService {

  private nextId: number;

  constructor() {
    let tasks = this.getTasks();

    if(tasks.length == 0) {
      this.nextId = 0
    } else {
      this.nextId = tasks[tasks.length - 1].id + 1;
    }
  }

  public addTask(values: Object, priority: number): void {
  	let tasks = this.getTasks();
  	let task = new Task(this.nextId, values, priority);
  	tasks.push(task);
  	this.setLocalStorageTasks(tasks);
  	this.nextId++;
  }

  public getTasks(): Task[] {
    let item = JSON.parse(localStorage.getItem('tasks'));
    if(item != null) { 
      item.tasks.forEach(task => {
        task.startDate = new Date(task.startDate);
        task.finishDate = new Date(task.finishDate);
      });
    }
  	return item == null ? [] : item.tasks;
  }

  public getTaskById(id: number): Task {
  	let tasks = this.getTasks();
  	return tasks.filter(task => task.id === id).pop();
  }
  
  public deleteTaskById(id: number): void {
  	let tasks = this.getTasks();
  	tasks = tasks.filter(task => task.id !== id);
  	this.setLocalStorageTasks(tasks);
  }

  public updateTaskById(id: number, updTask): void {
  	let tasks = this.getTasks();
    let task = tasks.filter(task => task.id === id).pop();
    Object.assign(task, updTask);
  	this.setLocalStorageTasks(tasks);
  }

  public completeTaskById(id: number): void {
    let tasks = this.getTasks();
    let task = tasks.filter(task => task.id === id).pop();
    task.completed = !task.completed;
    this.setLocalStorageTasks(tasks);
  }

  public sortTasksByName(): void {
    let tasks = this.getTasks();
    tasks.sort((taskA: Task, taskB: Task) => +(taskA.name.toLowerCase() > taskB.name.toLowerCase()));
    this.setLocalStorageTasks(tasks);
  }

  public sortTasksByDate(): void {
    let tasks = this.getTasks();
    tasks.sort((taskA: Task, taskB: Task) => +(taskA.startDate > taskB.startDate));
    this.setLocalStorageTasks(tasks);
  }

  public sortTasksByPriority(): void {
    let tasks = this.getTasks();
    tasks.sort((taskA: Task, taskB: Task) => taskA.priority.id - taskB.priority.id);
    this.setLocalStorageTasks(tasks);
  }

  public sortTasksByCompleted(): void {
    let tasks = this.getTasks();
    tasks.sort((taskA: Task, taskB: Task) => +(taskA.completed > taskB.completed));
    this.setLocalStorageTasks(tasks);
  }

  private setLocalStorageTasks(tasks: Task[]): void {
  	localStorage.setItem('tasks', JSON.stringify({ tasks: tasks }));
  }
}
