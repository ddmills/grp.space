      </div><!-- /page -->
    </div><!-- /page-content -->
    <div class='page-footer'>
      <div class='page'>
        ~ ~
      </div>
    </div>
    <link href='http://fonts.googleapis.com/css?family=Source+Code+Pro:400,600' rel='stylesheet' type='text/css'>

    <?php if (isset($page)) : ?>
      <!-- common scripts -->
      <script src='<?php echo $root; ?>src/js/vendor/whale.js'></script>
      <script src='<?php echo $root; ?>src/js/grp.api.js'></script>
      <script src='<?php echo $root; ?>src/js/grp.channel.js'></script>
      <script src='<?php echo $root; ?>src/js/grp.channel.track.js'></script>
      <script src='<?php echo $root; ?>src/js/grp.view.common.js'></script>

      <?php if ($page == 'not-found') : ?>
        <!-- channel not found scripts -->
        <script src='<?php echo $root; ?>src/js/grp.view.page.not-found.js'></script>
      <?php else : ?>
        <!-- listener/owner scripts -->
        <script src='<?php echo $root; ?>src/js/grp.stream.js'></script>
        <script src='<?php echo $root; ?>src/js/grp.stream.youtube.js'></script>
        <script src='https://www.youtube.com/iframe_api'></script>
        <script src='<?php echo $root; ?>src/js/grp.control.js'></script>
        <script src='<?php echo $root; ?>src/js/grp.view.player.js'></script>

        <?php if ($page == 'owner') : ?>
          <!-- owner scripts -->
          <script src='<?php echo $root; ?>src/js/grp.view.page.owner.js'></script>

        <?php elseif ($page == 'listener') : ?>
          <!-- listener scripts -->
          <script src='<?php echo $root; ?>src/js/grp.view.page.listener.js'></script>
        <?php endif; ?>
      <?php endif; ?>
    <?php endif; ?>

  </body>
</html>