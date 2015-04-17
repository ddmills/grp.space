<?php
class ChannelLoadResource extends Rest_Resource {

  public function resource_get($request) {
    $response = array();
    $channel_name = $request->inputs->uri('channel_name');

    $con = new mywrap_con();
    $channel = DJ::get_channel_by_name($con, $channel_name);

    if ($channel) {
      $channel_id = $channel['id'];
      $response['poll'] = DJ::get_poll($con, $channel_id);
      $response['tracks'] = DJ::get_tracks($con, $channel_id);
      $response['channel'] = $channel;
    } else {
      $response = false;
    }

    $con->close();
    return $response;
  }

} ?>