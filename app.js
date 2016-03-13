"use strict";

var mongo = require("mongodb"),
    fs = require("fs"),         // to read static files from directory
    io = require("socket.io"),  // for socket server
    http = require("http"),
    dbConfig = require("./config/database"),
    serverConfig = require("./config/server"),
    dbQueries = require('./database/db_queries');

var mongodbUri = "mongodb://"+dbConfig.dbAddress+"/"+dbConfig.dbName;

var app = http.createServer(handler);
io = io.listen(app);
app.listen(serverConfig.port);
console.log("Notification http server listening on port ", serverConfig.port);

function handler(req, res){
  fs.readFile(__dirname + "/index.html",
  function (err, data) {
    res.writeHead(200);
    res.end(data);
  });
}

mongo.MongoClient.connect (mongodbUri, function (err, db) {
  db.collection('notifications', function(err, collection) {
    // open socket
    io.sockets.on("connection", function (socket) {
      socket.on("changeGroup", function (group) {
        console.log( "Changing Group to "+ group +"for socket "+ socket.id );
        if (group == "all") {
          group = undefined;
        }
        socket.group = group;
      });
      dbQueries.openNotificationTailableCursor(socket, collection);
    });
    // calling insertRandomEntries every 2 second
    setInterval(function(){dbQueries.insertRandomEntries(collection)}, 2000);
  });
});
