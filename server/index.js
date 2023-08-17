const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("chat message", (message) => {
    io.emit("chat message", message);
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

const PORT = 3001;
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
