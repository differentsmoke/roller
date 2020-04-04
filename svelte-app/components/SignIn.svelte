<script>
  export let connection;
  let name;

  function setName(event) {
    event.preventDefault();
    connection.emit("set-name", name);
    sessionStorage.setItem("name", name);
  }
</script>

<style>
  form {
    padding: 2em;
  }
</style>

<form on:submit={setName}>
  <input placeholder="What is your name?" bind:value={name} />
  <button>Sign in</button>
</form>
