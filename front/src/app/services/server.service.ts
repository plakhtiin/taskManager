import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import {MatSnackBar} from '@angular/material';
import {Task} from '../classes/task';


const SERVER_URL: string = 'http://localhost';
const SERVER_PORT: number = 3000;
const durationSnackBar: number = 1000;

@Injectable()
export class ServerService {
	path: string = SERVER_URL + ':' + SERVER_PORT;

	constructor(private http: HttpClient,
				public snackBar: MatSnackBar) {
	}

	login(username: string, password: string): Observable<any> {
		const params: object = {
			username: username,
			password: password
		};
		const sub: Observable<any> = this.http.post(this.path + '/api/login', params, {observe: 'response'});
		return sub;
	}

	signUp(email: string, pass: string): Observable<any> {
		const params: object = {
			email: email,
			password: pass
		};
		const sub: Observable<any> = this.http.post(this.path + '/api/createuser', params, {observe: 'response'});
		return sub;
	}

	getTasks(): Observable<any> {
		const userId: string = JSON.parse(localStorage.getItem('userData'))._id;
		const authToken: string = localStorage.getItem('authToken');
		const sub: Observable<any> = this.http.get(this.path + '/api/getTasks/' + authToken + '/' + userId, {observe: 'response'});
		return sub;
	}

	addTask(task: Task): Observable<Task> {
		const authToken: string = localStorage.getItem('authToken');
		const sub: Observable<any> = this.http.put(this.path + '/api/createTask/' + authToken, task, {observe: 'response'});
		return sub;
	}

	removeTask(taskId: string): Observable<any> {
		const authToken: string = localStorage.getItem('authToken');
		const sub: Observable<any> = this.http.post(this.path + '/api/deleteTask/' + authToken, { _id: taskId}, {observe: 'response'});
		return sub;
	}

	updateTask(task: Task): Observable<any> {
		const authToken: string = localStorage.getItem('authToken');
		const sub: Observable<any> = this.http.post(this.path + '/api/updateTask/' + authToken, task, {observe: 'response'});
		return sub;
	}

}
