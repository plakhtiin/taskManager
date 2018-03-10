"use strict";
exports.__esModule = true;
var db_1 = require("../db");
var jsonwebtoken = require("jsonwebtoken");
var LoginService = /** @class */ (function () {
    function LoginService() {
        this.db = new db_1.DataBaseConection();
    }
    LoginService.prototype.getUser = function (username, password, cb) {
        this.db.getAdminUser(username, password, function (err, result) {
            if (err) {
                cb(err, null);
            }
            else {
                if (result) {
                    var adminInfo = result;
                    adminInfo.id = result._id.toString();
                    adminInfo.token = jsonwebtoken.sign({
                        username: username,
                        password: password
                    }, 'plakhtii');
                    cb(null, adminInfo);
                }
            }
        });
    };
    LoginService.prototype.isValidToken = function (token, cb) {
        var _this = this;
        if (!token) {
            cb(false);
        }
        jsonwebtoken.verify(token, 'plakhtii', function (err, decoded) {
            if (err) {
                cb(false);
            }
            else if (!decoded.username || !decoded.password) {
                cb(false);
            }
            else {
                _this.db.getAdminUser(decoded.username, decoded.password, function (error, result) {
                    if (error) {
                        cb(false);
                    }
                    if (result) {
                        cb(true);
                    }
                });
            }
        });
    };
    return LoginService;
}());
exports.LoginService = LoginService;
