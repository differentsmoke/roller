import App from "./App.svelte";
import { connection } from "./socket/socket.js";

const name = sessionStorage.getItem("name");
if (name) {
    connection.emit("set-name", name);
}

var app = new App({
    target: document.body,
    props: { connection },
});

export default app;
