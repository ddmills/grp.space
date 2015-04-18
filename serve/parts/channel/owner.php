<div id='owner-container'>
  <h4>
    <span class='channel-title'>
      <i class='fa fa-fw fa-anchor'></i> grp.space/at/<?php echo htmlspecialchars($channel_name); ?>
    </span>
  </h4>

  <?php include 'player.php'; ?>

  <div class='tracklist-container' style='display: none'>
    <div class='tracklist-add'>
      <input type='text' class='tracklist-add-name' placeholder='track name'><!--[newline]
      --><input type='text' class='tracklist-add-url' placeholder='url'><!--[newline]
      --><button type='button' class='tracklist-add-btn'>add +</button>
    </div>
    <ul class='tracklist'>
    </ul>
  </div>

  <div class='loader-container'></div>

</div>