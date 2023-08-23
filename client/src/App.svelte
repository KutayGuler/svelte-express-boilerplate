<script>
  import { io } from "socket.io-client";
  const socket = io("http://localhost:3000");

  let count = "loading...";

  function incrementClick() {
    socket.emit("click");
  }

  socket.on("click", (e) => {
    if (!e) return;
    count = e.clicks;
  });

  socket.on("get_clicks", (e) => {
    if (!e) return;
    count = e.clicks;
  });
</script>

<main>
  <button on:click={incrementClick}>CLICK</button>
  {count}
</main>
