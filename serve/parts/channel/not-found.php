<div id='not-found-container'>
  <h4>
    <span class='channel-title'>
      <i class='fa fa-fw fa-eye-slash'></i> Channel not found
    </span>
  </h4>

  <div class='create-channel-container'>
    <p>
      The channel `<?php echo htmlspecialchars($channel_name); ?>` does not exist yet.
      <input type='hidden' id='create-channel-name' value='<?php echo $channel_name; ?>'>
      <br />
      <br />
      <button type='button' class='btn-pink btn-create-channel'>Create it +</button>
    </p>
  </div>

  <div class='loader-container'></div>

</div>