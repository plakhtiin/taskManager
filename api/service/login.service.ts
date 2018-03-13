import {DataBaseConnection} from '../db';
import * as jsonwebtoken from 'jsonwebtoken';
import * as moment from 'moment';

export class LoginService {
	db: DataBaseConnection = new DataBaseConnection();

	constructor() {
	}

	getUser(username, password, cb) {
		this.db.getUser(username, password, (err, result) => {
			if (err) {
				cb(err, null);
			} else {
				if (result) {
					const adminInfo = result;
					adminInfo.id = result._id.toString();
					adminInfo.token = jsonwebtoken.sign({
						username: username,
						password: password
					}, 'plakhtii');

					cb(null, adminInfo);
				}

			}

		});
	}
	isValidToken(token, cb) {
		if (!token) {
			cb(false);
		}
		jsonwebtoken.verify(token, 'plakhtii', (err, decoded) => {
			if (err) {
				cb(false);
			} else if (!decoded.username || !decoded.password) {
				cb(false);
			} else {
				this.db.getUser(decoded.username, decoded.password, (error, result) => {
					if (error) {
						cb(false);
					}
					if (result) {
						this.db.findToken(token, (errorToken, resultToken) => {
							if (errorToken) {
								cb(false);
							} else if (resultToken) {
								const isValid: boolean = moment(resultToken.time, 'HH:mm:ss DD/MM/YYYY').isAfter(moment().format());
								cb(isValid);
							}
						});
					}
				});
			}
		});
	}
}
