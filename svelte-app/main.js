import App from "./App.svelte";
import { connection } from "./socket/socket.js";

var app = new App({
    target: document.body,
    props: { connection },
});

export default app;
