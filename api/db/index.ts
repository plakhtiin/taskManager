import {Db, MongoClient, ObjectID, Server} from 'mongodb';
import * as moment from 'moment';
import {Task} from '../classes/task';

const DB_URL: string = 'mongodb://localhost';
const PORT: number = 27017;
const DB_NAME: string = 'taskManager';
let db: Db;
const errorMsg: string = 'Incorrect password or email address code entered. Please try again.';

export class DataBaseConnection {

	connectToServer(callback) {
		MongoClient.connect(DB_URL + ':' + PORT + '/' + DB_NAME, (err, client) => {
			if (client) {
				db = client.db(DB_NAME);
				console.log('db connected', db);
				return callback(client, null);
			} else if (err) {
				return callback(null, err);
			}
		});
	}

	getUser(username, password, cb) {
		db.collection('users').findOne({
			email: username,
			password: password
		}, (err, result) => {
			if (err) {
				cb(err, null);
			} else if (result) {
				cb(null, result);
			} else {
				cb(errorMsg, null);
			}
		});
	}

	getUserById(userId, cb) {
		db.collection('users').findOne({
			_id: new ObjectID(userId)
		}, (err, result) => {
			if (err) {
				cb(err, null);
			} else if (result) {
				cb(null, result);
			} else {
				cb(errorMsg, null);
			}
		});
	}

	createUser(data, cb) {
		db.collection('users').insertOne({
			username: data.username || '',
			firstName: data.firstName || '',
			lastName: data.lastName || '',
			password: data.password,
			email: data.email
		}, null, (err, result) => {
			if (err) {
				cb(err, null);
			} else if (result) {
				cb(null, result);
			} else {
				cb(errorMsg, null);
			}
		});
	}

	removeUser(data, cb) {
		db.collection('users').remove({
			_id: new ObjectID(data._id)
		}, {
			single: true
		}, (err, result) => {
			if (err) {
				cb(err, null);
			} else if (result) {
				cb(null, result);
			} else {
				cb(errorMsg, null);
			}
		});
	}

	updateUser(data, cb) {
		db.collection('users').update({
			_id: new ObjectID(data._id)
		}, {
			$set: {
				username: data.username,
				firstName: data.firstName,
				lastName: data.lastName,
				password: data.password,
				email: data.email
			}
		}, (err, result) => {
			if (err) {
				cb(err, null);
			} else if (result) {
				cb(null, result);
			} else {
				cb(errorMsg, null);
			}
		});
	}

	setToken(userId, token, cb) {
		db.collection('tokens').insert({
			userId: userId.toString(),
			token: token,
			time: moment().add(1, 'day').format('hh:mm:ss DD/MM/YYYY')
		}, (err, result) => {
			if (err) {
				cb(err, null);
			} else if (result) {
				const obj = {
					id: userId.toString(),
					token: token,
					time: moment().add(0.5, 'h').format('hh:mm:ss DD/MM/YYYY')
				};
				cb(null, obj);
			} else {
				cb(errorMsg, null);
			}
		});
	}

	getTasks(userId: string, cb): void {
		db.collection('tasks').find({userId: userId}).toArray(cb);
	}

	createTask(data: Task, cb) {
		db.collection('tasks').insertOne(data, null, (err, result) => {
			if (err) {
				cb(err, null);
			} else if (result) {
				cb(null, result);
			} else {
				cb(errorMsg, null);
			}
		});
	}

	removeTask(data, cb) {
		db.collection('tasks').findOneAndDelete({
			_id: new ObjectID(data._id)
		}, (err, result) => {
			if (err) {
				cb(err, null);
			} else if (result) {
				cb(null, result);
			} else {
				cb(errorMsg, null);
			}
		});
	}

	updateTask(data: Task, cb) {
		const ID: string = data._id;
		const taskObj: any = data;
		delete taskObj._id;
		console.log(data._id);
		console.log(ID);
		db.collection('tasks').update({
			_id: new ObjectID(ID)
		},  taskObj, (err, result) => {
			if (err) {
				cb(err, null);
			} else if (result) {
				cb(null, result);
			} else {
				cb(errorMsg, null);
			}
		});
	}

}
