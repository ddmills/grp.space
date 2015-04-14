<?php session_start(); ?>
<?php require_once 'serve/lib/mysqli-wrapper/mywrap.php'; ?>
<?php $_r = preg_replace(':/[^/]+:', '../', dirname($_SERVER['SCRIPT_NAME'])); ?>
<?php $root = $_r == '/' || $_r == '\\' ? '' : $_r; ?>
<!doctype html>
<html lang='en'>
  <head>
    <meta charset='utf-8'></meta>
    <title>~ grp.space ~</title>
    <link type='text/css' rel='stylesheet' href='<?php echo $root; ?>src/css/main.css'></link>
    <link type='text/css' rel='stylesheet' href='<?php echo $root; ?>src/css/font-awesome.min.css'></link>
  </head>
  <body>
    <div class='grp-stripe'></div>
    <div class='page-content'>
      <div class='page'>