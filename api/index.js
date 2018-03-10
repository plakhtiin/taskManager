"use strict";
exports.__esModule = true;
var db_1 = require("./db");
var App_1 = require("./App");
var port = process.env.PORT || 3000;
var dataBaseConection = new db_1.DataBaseConection();
App_1["default"].listen(port, function (err) {
    if (err) {
        return console.log(err);
    }
    return console.log("server is listening on " + port);
});
dataBaseConection.connectToServer(function (success, err) {
    if (err) {
        console.log(err);
    }
    else if (success) {
        console.log('Successful connection to DB');
    }
});
