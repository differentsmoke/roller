import io from "socket.io-client";

export const connection = io();

connection.on("connect_error", () => console.error("Connection lost..."));
