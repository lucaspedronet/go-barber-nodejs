"use strict";
var app = require('./app');
var port = 3000;
app.listen(port, function () {
    console.log("Server node start in --> " + port);
});
