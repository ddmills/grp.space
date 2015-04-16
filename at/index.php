<?php $_r = preg_replace(':/[^/]+:', '../', dirname($_SERVER['SCRIPT_NAME'])); ?>
<?php $root = $_r == '/' || $_r == '\\' ? '' : $_r; ?>
<?php include $root . 'serve/parts/header.php'; ?>
<?php

$channel_name = ltrim($_GET['_url'], '/');
$con          = new mywrap_con();
$channel      = DJ::get_channel_by_name($con, $channel_name);

if (!$channel) {
  $page = 'not-found';
  include $root . 'serve/parts/channel/not-found.php';
} else {
  if ($channel['owner']) {
    $page = 'owner';
    include $root . 'serve/parts/channel/owner.php';
  } else {
    $page = 'listener';
    include $root . 'serve/parts/channel/listener.php';
  }
}

echo "\n<script> var CHANNEL_EXISTS = " . json_encode(!!$channel) . "; </script>\n";
echo "\n<script> var CHANNEL_NAME = " . json_encode($channel_name) . "; </script>\n";
echo "\n<script> var ROOT = " . json_encode($root) . "; </script>\n";
include $root . 'serve/parts/footer.php';
?>