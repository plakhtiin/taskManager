"use strict";
exports.__esModule = true;
var express = require("express");
var db_1 = require("./db");
var login_service_1 = require("./service/login.service");
var manage_user_service_1 = require("./service/manage-user.service");
var Token = /** @class */ (function () {
    function Token() {
        this.dataBaseConection = new db_1.DataBaseConection();
        this.loginService = new login_service_1.LoginService();
        this.manageUserService = new manage_user_service_1.ManageUserService();
    }
    Token.prototype.setToken = function (userData, cb) {
        this.dataBaseConection.setToken(userData.id, userData.token, function (err, res) {
            if (err) {
                cb(err, null);
            }
            else if (res) {
                cb(null, res);
            }
        });
    };
    return Token;
}());
var App = /** @class */ (function () {
    function App() {
        this.tokenClass = new Token();
        this.express = express();
        this.mountRoutes();
    }
    App.prototype.mountRoutes = function () {
        var router = express.Router();
        router.get('/', function (req, res) {
            res.json({
                message: 'Hello World!'
            });
        });
        this.express.use('/', router);
        router.get('/api/user/data/:userId/:token', function (req, res) {
        });
        router.post('/api/login', function (req, res) {
            var _this = this;
            this.loginService.getUser(req.body.username, req.body.password, function (err, adminUser) {
                if (err) {
                    res.send(err);
                }
                else {
                    _this.tokenClass.setToken(adminUser, function (error, result) {
                        if (error) {
                            res.send(error);
                        }
                        else if (result) {
                            var obj = {
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
            var _this = this;
            this.loginService.isValidToken(req.params.token, function (isValid) {
                if (isValid) {
                    _this.manageUserService.getUserData(req.params.userId, function (err, usersDays) {
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
            var _this = this;
            this.loginService.isValidToken(req.params.token, function (isValid) {
                if (isValid) {
                    _this.manageUserService.getUsers(function (err, users) {
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
            var _this = this;
            this.loginService.isValidToken(req.params.token, function (isValid) {
                if (isValid) {
                    _this.manageUserService.updateUser(req.body, function (err, user) {
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
            var _this = this;
            this.loginService.isValidToken(req.params.token, function (isValid) {
                if (isValid) {
                    _this.manageUserService.createUser(req.body, function (err, user) {
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
            var _this = this;
            this.loginService.isValidToken(req.params.token, function (isValid) {
                if (isValid) {
                    _this.manageUserService.removeUser(req.body, function (err, user) {
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
    };
    return App;
}());
exports["default"] = new App().express;
