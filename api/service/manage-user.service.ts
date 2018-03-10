import {DataBaseConnection} from '../db';

export class ManageUserService {
	db: DataBaseConnection = new DataBaseConnection();

	constructor() {}

	getUserData(userId, cb) {
		this.db.getUserById(userId, (err, user) => {
			if (err) {
				cb(err, null);
			} else {
				cb(null, user);
			}

		});
	}
	updateUser(data, cb) {
		this.db.updateUser(data, (err, result) => {
			if (err) {
				cb(err, null);
			} else {
				cb(null, result);
			}
		});
	}
	createUser(data, cb) {
		this.db.createUser(data, (err, result) => {
			if (err) {
				cb(err, null);
			} else {
				cb(null, result);
			}
		});
	}
	getUsers(cb) {
		this.db.getUsers((err, result) => {
			if (err) {
				cb(err, null);
			} else {
				cb(null, result);
			}
		});
	}
	removeUser(user, cb) {
		this.db.removeUser(user, (err, result) => {
			if (err) {
				cb(err, null);
			} else {
				cb(null, result);
			}
		});
	}
}
