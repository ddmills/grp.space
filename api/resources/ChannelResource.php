<?php
class ChannelResource extends Rest_Resource {

  public function resource_get($request) {
    $channel_name = $request->inputs->uri('channel_name');
    $con = new mywrap_con();

    if (isset($channel_id)) {
      return DJ::get_channel_by_name($con, $channel_name);
    }

    $con->close();
  }

  public function resource_post($request) {
    $channel_name = $request->inputs->get('name');
    $con = new mywrap_con();

    if (isset($channel_id)) {
      return DJ::create_channel($con, $channel_name);
    }

    $con->close();
  }

} ?>