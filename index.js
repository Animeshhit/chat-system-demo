const express = require("express");
const http = require("http");
const path = require("path");
const socketio = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

// Set up the Handlebars engine
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));

// Serve static files
app.use(express.static(path.join(__dirname, "public")));

// Render the main page
app.get("/", (req, res) => {
  res.render("index");
});

// Handle socket connection
io.on("connection", (socket) => {
  console.log("New WebSocket connection");

  // Broadcast a message to all clients
  socket.on("sendMessage", (message) => {
    io.emit("message", message);
  });

  // Handle disconnection
  socket.on("disconnect", () => {
    console.log("WebSocket disconnected");
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
