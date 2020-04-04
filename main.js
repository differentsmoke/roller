const express = require("express");
const app = express();

let rollRegistry = [];

const io = require("socket.io")(
    app.listen(3000, console.log("listening on port 3000..."))
);

app.use(express.static("public"));

io.on("connection", function (socket) {
    io.emit("update", rollRegistry);
    socket.on("request-roll", function () {
        const roll = Math.ceil(Math.random() * 20);
        rollRegistry = [...rollRegistry.slice(-5), roll];
        io.emit("update", rollRegistry);
    });
});
