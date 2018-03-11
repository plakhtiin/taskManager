import * as express from 'express';
import {DataBaseConnection} from './db';
import {LoginService} from './service/login.service';
import {ManageUserService} from './service/manage-user.service';
import * as bodyParser from 'body-parser';

class Token {
	private dataBaseConnection: DataBaseConnection = new DataBaseConnection();

	constructor() {}

	setToken(userData, cb) {
		this.dataBaseConnection.setToken(userData.id, userData.token, (err, res) => {
			if (err) {
				cb(err, null);
			} else if (res) {
				cb(null, res);
			}
		});
	}
}

export class App {
	public express;
	public tokenClass: Token = new Token();
	private loginService: LoginService = new LoginService();
	private manageUserService: ManageUserService = new ManageUserService();

	constructor() {
		this.express = express();
		this.express.use(bodyParser.json());
		this.mountRoutes();
	}

	private mountRoutes(): void {
		const router = express.Router();
		router.get('/', (req, res) => {
			res.json({
				message: 'Hello World!'
			});
		});
		this.express.use('/', router);
		router.get('/api/user/data/:userId/:token', (req, res) => {
		});
		router.post('/api/login', (req, res) => {
			this.loginService.getUser(req.body.username, req.body.password, (err, adminUser) => {
				if (err) {
					res.send({error: err});
				}
				else {
					this.tokenClass.setToken(adminUser, (error, result) => {
						if (error) {
							res.send({error: error});
						} else if (result) {
							const obj = {
								userData: adminUser,
								token: result.token
							};
							res.send(obj);
						}
					});
				}
			});
		});
		router.get('/api/user/data/:userId/:token', (req, res) => {
			this.loginService.isValidToken(req.params.token, (isValid: boolean) => {
				if (isValid) {
					this.manageUserService.getUserData(req.params.userId, (err, usersDays) => {
						if (err) {
							res.send(err);
						}
						else {
							res.send(usersDays);
						}
					});
				}
				else {
					res.status(403).send('Error');
				}
			});
		});
		router.post('/api/updateuser/data/:token', (req, res) => {
			this.loginService.isValidToken(req.params.token, (isValid: boolean) => {
				if (isValid) {
					this.manageUserService.updateUser(req.body, (err, user) => {
						if (err) {
							res.send(err);
						}
						else {
							res.send(user);
						}
					});
				}
				else {
					res.status(403).send('Error');
				}
			});
		});
		router.post('/api/createuser', (req, res) => {
			this.manageUserService.createUser(req.body, (err, user) => {
				if (err) {
					res.send({error: err});
				}
				else {
					res.send(user);
				}
			});
		});
		router.post('/api/removeuser/data/:token', (req, res) => {
			this.loginService.isValidToken(req.params.token, (isValid: boolean) => {
				if (isValid) {
					this.manageUserService.removeUser(req.body, (err, user) => {
						if (err) {
							res.send(err);
						}
						else {
							res.send(user);
						}
					});
				}
				else {
					res.status(403).send('Error');
				}
			});
		});
	}
}
