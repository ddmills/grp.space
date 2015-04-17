<?php
class ChannelResource extends Rest_Resource {

  public function resource_get($request) {
    $channel_name = $request->inputs->uri('channel_name');
    $con = new mywrap_con();
    $channel = DJ::get_channel_by_name($con, $channel_name);
    $con->close();
    return $channel;
  }

  public function resource_post($request) {
    $channel_name = $request->inputs->get('channel_name');
    $con = new mywrap_con();
    $channel = DJ::create_channel($con, $channel_name);
    $con->close();
    return $channel;
  }

} ?>