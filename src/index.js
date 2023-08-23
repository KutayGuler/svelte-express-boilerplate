const express = require("express");
const socket = require("socket.io");

// App setup
const PORT = 3000;
const app = express();
const server = app.listen(PORT, function () {
  console.log(`Listening on port ${PORT}`);
  console.log(`http://localhost:${PORT}`);
});

// Static files
app.use(express.static("public"));

// Socket setup
const io = socket(server);

let clicks = 0;
let updating = false;

io.on("connection", function (socket) {
  console.log("Made socket connection");

  socket.emit("get_clicks", { clicks });

  socket.on("click", () => {
    if (updating) return;
    updating = true;
    clicks += 1;
    console.log("user clicked", clicks);
    io.emit("click", { clicks });
    updating = false;
  });
});
