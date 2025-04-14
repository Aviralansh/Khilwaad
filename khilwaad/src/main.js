const urlParams = new URLSearchParams(window.location.search);
const instanceId = urlParams.get("instance_id");
const frameId = urlParams.get("frame_id");
const platform = urlParams.get("platform");

if (instanceId && frameId && platform) {
  const discordSdk = new DiscordSDK({
    clientId: "1360914250566074398"
  });

  discordSdk.initialize()
    .then(() => {
      console.log("Discord SDK initialized!");
      document.body.innerHTML += "<p>App Initialized ✅</p>";
    })
    .catch((err) => {
      console.error("Initialization failed: ", err);
      document.body.innerHTML += "<p style='color: red;'>Init failed ❌</p>";
    });
} else {
  console.error("Missing required URL parameters");
  document.body.innerHTML += "<p style='color: red;'>Missing required URL parameters</p>";
}
