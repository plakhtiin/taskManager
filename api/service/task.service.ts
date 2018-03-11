import {DataBaseConnection} from '../db';
import {Task} from '../classes/task';

export class TaskService {
	db: DataBaseConnection = new DataBaseConnection();

	constructor() {}

	getTasks(userId, cb) {
		this.db.getTasks(userId, (err, user) => {
			if (err) {
				cb(err, null);
			} else {
				cb(null, user);
			}

		});
	}
	updateTask(data: Task, cb) {
		this.db.updateTask(data, (err, result) => {
			if (err) {
				cb(err, null);
			} else {
				cb(null, result);
			}
		});
	}
	createTask(data: Task, cb) {
		this.db.createTask(data, (err, result) => {
			if (err) {
				cb(err, null);
			} else {
				cb(null, result);
			}
		});
	}
	removeTask(data, cb) {
		this.db.removeTask(data, (err, result) => {
			if (err) {
				cb(err, null);
			} else {
				cb(null, result);
			}
		});
	}
}
