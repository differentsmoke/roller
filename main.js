const express = require("express");
const app = express();

let rollRegistry = [];
let userRegistry = {};

const io = require("socket.io")(
    app.listen(3000, console.log("listening on port 3000..."))
);

app.use(express.static("public"));

io.on("connection", function (socket) {
    socket.on("set-name", function (name) {
        userRegistry = { ...userRegistry, [socket.id]: name };
        const names = Object.values(userRegistry);
        console.log(names);
        socket.emit("set-name", name);
        socket.emit("update", rollRegistry);
        io.emit("list-users", names);
    });

    socket.on("request-roll", function () {
        const name = userRegistry[socket.id];
        const roll = Math.ceil(Math.random() * 20);
        rollRegistry = [...rollRegistry.slice(-5), { name, roll }];
        io.emit("update", rollRegistry);
    });

    socket.on("disconnect", function () {
        userRegistry = Object.keys(userRegistry).reduce(function (
            newRegistry,
            key
        ) {
            if (key === socket.id) {
                return newRegistry;
            }
            newRegistry[key] = userRegistry[key];
            return newRegistry;
        },
        {});
        io.emit("list-users", Object.values(userRegistry));
    });
});
