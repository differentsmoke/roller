<script>
  export let connection, name;
  let allRolls = [];

  function requestRoll() {
    connection.emit("request-roll");
  }

  connection.on("update", function(registry) {
    allRolls = registry;
  });
</script>

<style>
  h1 {
    color: darkred;
    font-family: "Georgia", Serif;
  }

  .roller {
    padding: 2em;
  }
</style>

<div class="roller">
  <h1>RocanRoller!</h1>
  <button on:click={requestRoll}>Test Your Luck, {name}</button>
  <div class="registry">
    {#each allRolls as { name, roll }}
      <p>
        <b>{name}</b>
        got a
        <i>{roll}</i>
      </p>
    {/each}
  </div>
</div>
