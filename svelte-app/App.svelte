<script>
  import Roller from "./components/Roller.svelte";
  import SignIn from "./components/SignIn.svelte";
  export let connection;

  let users = [];

  let name,
    error = "";

  connection.on("set-name", function(newName) {
    name = newName;
  });

  connection.on("list-users", function(data) {
    users = data;
  });

  connection.on("reconnecting", function() {
    error = "Reconnecting...";
  });

  connection.on("error", function() {
    error = "Disconnected!";
  });

  connection.on("reconnect", function() {
    error = "";
    connection.emit("set-name", name);
  });
</script>

<style>
  div {
    margin: 0;
    padding: 0;
  }

  .app {
    width: 100%;
    height: 100%;
    background-color: #999;
    color: black;
  }

  .main {
    float: left;
    width: calc(100% - 200px);
    height: 100%;
  }

  .users {
    float: left;
    background-color: lightgrey;
    color: slateblue;
    width: 200px;
    height: 100%;
  }

  .users p {
    margin: 2px;
    padding: 2px;
    border-bottom: 1px solid slateblue;
  }
</style>

<div class="app">
  <div class="main">
    {#if name}
      <Roller {connection} {name} />
    {:else if error}
      <div>
        <h1>Reconnecting...</h1>
      </div>
    {:else}
      <SignIn {connection} />
    {/if}
  </div>
  <div class="users">
    {#each users as user}
      <p>{user}</p>
    {/each}
  </div>
</div>
