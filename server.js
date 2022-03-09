/////////////variables/////////////

const express = require("express");

//a function handeler can supply to a HTTP server (next line)
const app = express();
const server = require("http").createServer(app);

//initialize a instance of socket.io by passing the created server
const io = require("socket.io")(server);

/////////////variables/////////////

/////////////socket events/////////////

//listen on the connection event for incoming sockets
io.on("connection", (socket) => {
  //event when a newuser join room
  socket.on("newuser", (username) => {
    socket.broadcast.emit("update", username + " joined the conversation");
  });

  //event when a user exit room
  socket.on("exituser", (username) => {
    socket.broadcast.emit("update", username + " left the conversation");
  });

  //event when a message comes
  socket.on("chat", (message) => {
    socket.broadcast.emit("chat", message);
  });
});

/////////////socket events/////////////

const path = require("path");

//the directory we want to serve
app.use(express.static(path.join(__dirname, "public")));

//define the port we want to use
let port = 5000;

//start the server on port 5000
server.listen(port, () => {
  console.log("server is running on port 5000");
});

/*
 to run the program type following address in your browser:
 localhist:{port}

 in this code the port is 5000 so it will we:
 localhost:5000

 also you can change the port on your own
*/
