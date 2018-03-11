import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import {MatSnackBar} from '@angular/material';


const SERVER_URL: string = 'http://localhost';
const SERVER_PORT: number = 3000;
const durationSnackBar: number = 1000;

@Injectable()
export class ServerService {
	path: string = SERVER_URL + ':' + SERVER_PORT;

	constructor(private http: HttpClient,
				public snackBar: MatSnackBar) {
	}

	login(username: string, password: string): any {
		const params: object = {
			username: username,
			password: password
		};
		const sub: Observable<any> = this.http.post(this.path + '/api/login', params, {observe: 'response'});

		sub.subscribe(data => {
				if (data.body.error) {
					this.snackBar.open(data.body.error, '', {duration: durationSnackBar});
				}
			}
		);

		return sub;
	}

	signUp(email: string, pass: string): any {
		const params: object = {
			email: email,
			password: pass
		};
		const sub: Observable<any> = this.http.post(this.path + '/api/createuser', params, {observe: 'response'});

		sub.subscribe(data => {
				if (data.body.error) {
					this.snackBar.open(data.body.error, '', {duration: durationSnackBar});
					return false;
				}
			}
		);

		return sub;
	}

}
