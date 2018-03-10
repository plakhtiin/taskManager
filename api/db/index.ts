import {MongoClient, ObjectID} from 'mongodb';
import * as moment from 'moment';

const DB_URL: string = 'mongodb://admin:root@ds261088.mlab.com:61088/taskmanager';

export class DataBaseConnection {
	_db: any;

	connectToServer(callback) {
		MongoClient.connect(DB_URL, (err, db) => {
			if (db) {
				this._db = db;
				console.log('db connected');
				return callback(db, null);
			} else if (err) {
				return callback(null, err);
			}
		});
	}
	getUsers(cb) {
		this._db.collection('users').find({}, (err, result) => {
			if (err) {
				cb(err, null);
			} else {
				result.toArray((error, users) => {
					cb(null, users);
				});
			}
		});
	}
	getAdminUser(username, password, cb) {
		this._db.collection('users').findOne({
			username: username,
			password: password
		}, (err, result) => {
			if (err) {
				cb(err, null);
			} else {
				cb(null, result);
			}
		});
	}

	getAdminUsers(cb) {
		this._db.collection('users').find((err, result) => {
			if (err) {
				cb(err, null);
			} else {
				result.toArray((error, users) => {
					cb(null, users);
				});
			}
		});
	}

	getUserById(userId, cb) {
		this._db.collection('users').findOne({
			_id: new ObjectID(userId)
		}, (err, result) => {
			if (err) {
				cb(err, null);
			} else {
				cb(null, result);
			}
		});
	}

	createUser(data, cb) {
		this._db.collection('users').insertOne({
			username: data.username,
			firstName: data.firstName,
			lastName: data.lastName,
			role: data.role,
			password: data.password,
			email: data.email
		}, (err, result) => {
			if (err) {
				cb(err, null);
			} else {
				cb(null, result);
			}
		});
	}

	removeUser(data, cb) {
		this._db.collection('users').remove({
			_id: new ObjectID(data._id)
		}, {
			justOne: true
		}, (err, result) => {
			if (err) {
				cb(err, null);
			} else {
				cb(null, result);
			}
		});
	}

	updateUser(data, cb) {
		this._db.collection('users').update({
			_id: new ObjectID(data._id)
		}, {
			$set: {
				username: data.username,
				firstName: data.firstName,
				lastName: data.lastName,
				role: data.role,
				password: data.password,
				email: data.email
			}
		}, (err, result) => {
			if (err) {
				cb(err, null);
			} else {
				cb(null, result);
			}
		});
	}
	setToken(userId, token, cb) {
		this._db.collection('tokens').insert({
			userId: userId.toString(),
			token: token,
			time: moment().add(1, 'day').format('hh:mm:ss DD/MM/YYYY')
		}, (err, result) => {
			if (err) {
				cb(err, null);
			} else {
				const obj = {
					id: userId.toString(),
					token: token,
					time: moment().add(1, 'day').format('hh:mm:ss DD/MM/YYYY')
				};
				cb(null, obj);
			}
		});
	}
}
