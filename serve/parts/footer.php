      </div><!-- /page -->
    </div><!-- /page-content -->
    <div class='page-footer'>
      <div class='page'>
        ~ ~
      </div>
    </div>
    <link href='http://fonts.googleapis.com/css?family=Source+Code+Pro:400,600' rel='stylesheet' type='text/css'>

    <!-- common scripts -->
    <script src='<?php echo $root; ?>src/js/vendor/whale.js'></script>
    <script src='<?php echo $root; ?>src/js/grp.api.js'></script>
    <script src='<?php echo $root; ?>src/js/grp.Views.common.js'></script>

    <?php if ($page == 'notfound') : ?>
      <!-- channel not found scripts -->
      <script src='<?php echo $root; ?>src/js/grp.page.not-found.js'></script>
    <?php else : ?>
      <!-- listener/owner scripts -->
      <script src='<?php echo $root; ?>src/js/grp.stream.js'></script>
      <script src='<?php echo $root; ?>src/js/grp.stream.youtube.js'></script>
      <?php if ($page == 'owner') : ?>
        <!-- owner scripts -->

      <?php elseif ($page == 'listener') : ?>
        <!-- listener scripts -->

      <?php endif; ?>
    <?php endif; ?>
  </body>
</html>