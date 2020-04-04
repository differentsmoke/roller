<script>
  export let connection;
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
    color: red;
    font-family: "Georgia", Serif;
  }
</style>

<div>
  <h1>Roller!</h1>
  <button on:click={requestRoll}>Test Your Luck</button>
  <div class="registry">
    {#each allRolls as roll}
      <p>{roll}</p>
    {/each}
  </div>
</div>
