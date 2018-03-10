import * as express from 'express';
import {DataBaseConnection} from './db';
import {LoginService} from './service/login.service';
import {ManageUserService} from './service/manage-user.service';

class Token {
	private dataBaseConnection: DataBaseConnection = new DataBaseConnection();

	constructor() {}

	setToken(userData, cb) {
		this.dataBaseConnection.setToken(userData.id, userData.token, function (err, res) {
			if (err) {
				cb(err, null);
			} else if (res) {
				cb(null, res);
			}
		});
	}
}

class App {
	public express;
	public tokenClass: Token = new Token();
	private loginService: LoginService = new LoginService();
	private manageUserService: ManageUserService = new ManageUserService();

	constructor() {
		this.express = express();
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
		router.get('/api/user/data/:userId/:token', function (req, res) {
		});
		router.post('/api/login', function (req, res) {
			this.loginService.getUser(req.body.username, req.body.password, (err, adminUser) => {
				if (err) {
					res.send(err);
				}
				else {
					this.tokenClass.setToken(adminUser, (error, result) => {
						if (error) {
							res.send(error);
						} else if (result) {
							const obj = {
								userData: adminUser,
								result: result
							};
							res.send(obj);
						}
					});
				}
			});
		});
		router.get('/api/user/data/:userId/:token', function (req, res) {
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
		router.get('/api/users/data/:token', function (req, res) {
			this.loginService.isValidToken(req.params.token, (isValid) => {
				if (isValid) {
					this.manageUserService.getUsers((err, users) => {
						if (err) {
							res.send(err);
						}
						else {
							res.send(users);
						}
					});
				}
				else {
					res.status(403).send('Error');
				}
			});
		});
		router.post('/api/updateuser/data/:token', function (req, res) {
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
		router.post('/api/createuser/data/:token', function (req, res) {
			this.loginService.isValidToken(req.params.token, (isValid: boolean) => {
				if (isValid) {
					this.manageUserService.createUser(req.body, (err, user) => {
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
		router.post('/api/removeuser/data/:token', function (req, res) {
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

export default new App().express;
