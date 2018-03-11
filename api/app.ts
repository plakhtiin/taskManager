import * as express from 'express';
import {DataBaseConnection} from './db';
import {LoginService} from './service/login.service';
import {ManageUserService} from './service/manage-user.service';
import * as bodyParser from 'body-parser';
import {TaskService} from './service/task.service';
import * as cors from 'cors';

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
	private taskService: TaskService = new TaskService();

	constructor() {
		this.express = express();
		this.express.use(bodyParser.json());
		this.express.use((req, res, next) => {
			res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');

			// Request methods you wish to allow
			res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

			// Request headers you wish to allow
			res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

			// Set to true if you need the website to include cookies in the requests sent
			// to the API (e.g. in case you use sessions)
			res.setHeader('Access-Control-Allow-Credentials', true);
			res.header('access-control-max-age', 86400);
			res.header('Content-Type', 'application/json');
			res.header('Access-Control-Allow-Credentials', true);
			res.header('Access-Control-Allow-Headers', 'Authorization,Content-Type,Accept,Origin,User-Agent,DNT,Cache-Control,X-Mx-ReqToken,Keep-Alive,X-Requested-With,If-Modified-Since,X-CSRF-Token');
			res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
			res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
			res.header('Cache-Control', 'no-cache, must-revalidate');
			res.header('Connection', 'keep-alive');
			next();
		});
		this.express.use(cors());
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
		// tasks
		router.get('/api/getTasks/:token/:userId', (req, res) => {
			this.loginService.isValidToken(req.params.token, (isValid: boolean) => {
				if (isValid) {
					this.taskService.getTasks(req.params.userId, (err, tasks) => {
						if (err) {
							res.send({error: err});
						}
						else {
							res.send({tasks: tasks});
						}
					});
				} else {
					res.status(403).send('Error');
				}
			});
		});
		router.post('/api/updateTask/:token', (req, res) => {
			this.loginService.isValidToken(req.params.token, (isValid: boolean) => {
				if (isValid) {
					this.taskService.updateTask(req.body, (err, user) => {
						if (err) {
							res.send({error: err});
						}
						else {
							res.send(user);
						}
					});
				} else {
					res.status(403).send('Error');
				}
			});
		});
		router.post('/api/deleteTask/:token', (req, res) => {
			this.loginService.isValidToken(req.params.token, (isValid: boolean) => {
				if (isValid) {
					this.taskService.removeTask(req.body, (err, user) => {
						if (err) {
							res.send({error: err});
						}
						else {
							res.send(user);
						}
					});
				} else {
					res.status(403).send('Error');
				}
			});
		});
		router.put('/api/createTask/:token', (req, res) => {
			this.loginService.isValidToken(req.params.token, (isValid: boolean) => {
				if (isValid) {
					this.taskService.createTask(req.body, (err, user) => {
						if (err) {
							res.send({error: err});
						}
						else {
							res.send(user);
						}
					});
				} else {
					res.status(403).send('Error');
				}
			});
		});
	}
}
