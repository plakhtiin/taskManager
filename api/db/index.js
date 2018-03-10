"use strict";
exports.__esModule = true;
var mongodb_1 = require("mongodb");
var moment = require("moment");
var DB_URL = 'mongodb://admin:root@ds261088.mlab.com:61088/taskmanager';
var DataBaseConection = /** @class */ (function () {
    function DataBaseConection() {
    }
    DataBaseConection.prototype.connectToServer = function (callback) {
        var _this = this;
        mongodb_1.MongoClient.connect(DB_URL, function (err, db) {
            if (db) {
                _this._db = db;
                console.log('db connected');
                return callback(db, null);
            }
            else if (err) {
                return callback(null, err);
            }
        });
    };
    DataBaseConection.prototype.getUsers = function (cb) {
        this._db.collection('users').find({}, function (err, result) {
            if (err) {
                cb(err, null);
            }
            else {
                result.toArray(function (error, users) {
                    cb(null, users);
                });
            }
        });
    };
    DataBaseConection.prototype.getAdminUser = function (username, password, cb) {
        this._db.collection('users').findOne({
            username: username,
            password: password
        }, function (err, result) {
            if (err) {
                cb(err, null);
            }
            else {
                cb(null, result);
            }
        });
    };
    DataBaseConection.prototype.getAdminUsers = function (cb) {
        this._db.collection('users').find(function (err, result) {
            if (err) {
                cb(err, null);
            }
            else {
                result.toArray(function (error, users) {
                    cb(null, users);
                });
            }
        });
    };
    DataBaseConection.prototype.getUserById = function (userId, cb) {
        this._db.collection('users').findOne({
            _id: new mongodb_1.ObjectID(userId)
        }, function (err, result) {
            if (err) {
                cb(err, null);
            }
            else {
                cb(null, result);
            }
        });
    };
    DataBaseConection.prototype.createUser = function (data, cb) {
        this._db.collection('users').insertOne({
            username: data.username,
            firstName: data.firstName,
            lastName: data.lastName,
            role: data.role,
            password: data.password,
            email: data.email
        }, function (err, result) {
            if (err) {
                cb(err, null);
            }
            else {
                cb(null, result);
            }
        });
    };
    DataBaseConection.prototype.removeUser = function (data, cb) {
        this._db.collection('users').remove({
            _id: new mongodb_1.ObjectID(data._id)
        }, {
            justOne: true
        }, function (err, result) {
            if (err) {
                cb(err, null);
            }
            else {
                cb(null, result);
            }
        });
    };
    DataBaseConection.prototype.updateUser = function (data, cb) {
        this._db.collection('users').update({
            _id: new mongodb_1.ObjectID(data._id)
        }, {
            $set: {
                username: data.username,
                firstName: data.firstName,
                lastName: data.lastName,
                role: data.role,
                password: data.password,
                email: data.email
            }
        }, function (err, result) {
            if (err) {
                cb(err, null);
            }
            else {
                cb(null, result);
            }
        });
    };
    DataBaseConection.prototype.setToken = function (userId, token, cb) {
        this._db.collection('tokens').insert({
            userId: userId.toString(),
            token: token,
            time: moment().add(1, 'day').format('hh:mm:ss DD/MM/YYYY')
        }, function (err, result) {
            if (err) {
                cb(err, null);
            }
            else {
                var obj = {
                    id: userId.toString(),
                    token: token,
                    time: moment().add(1, 'day').format('hh:mm:ss DD/MM/YYYY')
                };
                cb(null, obj);
            }
        });
    };
    return DataBaseConection;
}());
exports.DataBaseConection = DataBaseConection;
