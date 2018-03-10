import {DataBaseConection} from '../db';
import * as jsonwebtoken from 'jsonwebtoken';

export class LoginService {
	db: DataBaseConection = new DataBaseConection();

	constructor() {
	}

	getUser(username, password, cb) {
		this.db.getAdminUser(username, password, (err, result) => {
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
				this.db.getAdminUser(decoded.username, decoded.password, (error, result) => {
					if (error) {
						cb(false);
					}
					if (result) {
						cb(true);
					}
				});
			}
		});
	}
}
