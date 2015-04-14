<?php
session_start();
require_once '../serve/lib/mysqli-wrapper/mywrap.php';
require_once '../serve/lib/lightweight-rest/Rest_Api.php';
require_once '../serve/lib/dj.php';

$api = new Rest_Api('resources/');

$api->cors_enabled(false);
$api->format_output(false);
$api->pretty_print(true);

$api->map('channel/', 'ChannelResource.php');
$api->map('channel/{str:channel_name}/', 'ChannelResource.php');
$api->map('tracks/{num:track_id}/', 'TrackResource.php');
$api->map('poll/{num:channel_id}/', 'PollResource.php');

$api->process();
?>