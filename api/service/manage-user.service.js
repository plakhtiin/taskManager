"use strict";
exports.__esModule = true;
var db_1 = require("../db");
var ManageUserService = /** @class */ (function () {
    function ManageUserService() {
        this.db = new db_1.DataBaseConection();
    }
    ManageUserService.prototype.getUserData = function (userId, cb) {
        this.db.getUserById(userId, function (err, user) {
            if (err) {
                cb(err, null);
            }
            else {
                cb(null, user);
            }
        });
    };
    ManageUserService.prototype.updateUser = function (data, cb) {
        this.db.updateUser(data, function (err, result) {
            if (err) {
                cb(err, null);
            }
            else {
                cb(null, result);
            }
        });
    };
    ManageUserService.prototype.createUser = function (data, cb) {
        this.db.createUser(data, function (err, result) {
            if (err) {
                cb(err, null);
            }
            else {
                cb(null, result);
            }
        });
    };
    ManageUserService.prototype.getUsers = function (cb) {
        this.db.getUsers(function (err, result) {
            if (err) {
                cb(err, null);
            }
            else {
                cb(null, result);
            }
        });
    };
    ManageUserService.prototype.removeUser = function (user, cb) {
        this.db.removeUser(user, function (err, result) {
            if (err) {
                cb(err, null);
            }
            else {
                cb(null, result);
            }
        });
    };
    return ManageUserService;
}());
exports.ManageUserService = ManageUserService;
