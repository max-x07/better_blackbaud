const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

let chatHistory = [];

io.on("connection", (socket) => {
    console.log("A user connected");

    // Send chat history when a user connects
    socket.emit("history", chatHistory);

    socket.on("message", (msg) => {
        chatHistory.push(msg);
        io.emit("message", msg); // Broadcast message to all users
    });

    socket.on("disconnect", () => {
        console.log("A user disconnected");
    });
});

server.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});
